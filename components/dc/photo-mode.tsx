"use client"

import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { WebGLPathTracer } from "three-gpu-pathtracer"
import { buildPhotoScene } from "@/lib/dc/photo-scene"

export type PhotoStatus = { state: "idle" } | { state: "building" } | { state: "rendering"; samples: number }

const IDLE_MS = 900
const TARGET_SAMPLES = 400

/**
 * Photo mode: once the camera has been still for a moment, a path tracer renders the scene
 * progressively (real light bounces, soft shadows, reflections) and fades it in over the
 * real-time view. Any camera movement drops straight back to real-time.
 */
export function PhotoMode({ enabled, background, onStatus }: { enabled: boolean; background: string; onStatus: (s: PhotoStatus) => void }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const camera = useThree((s) => s.camera)
  const tracer = useRef<WebGLPathTracer | null>(null)
  const worker = useRef<{ dispose: () => void } | null>(null)
  const ready = useRef(false)
  const building = useRef(false)
  const active = useRef(false)
  const lastMatrix = useRef(new THREE.Matrix4())
  const lastMove = useRef(performance.now())
  const lastReport = useRef(0)

  useEffect(
    () => () => {
      tracer.current?.dispose()
      worker.current?.dispose()
      tracer.current = null
      ready.current = false
    },
    []
  )

  async function build() {
    building.current = true
    onStatus({ state: "building" })
    try {
      const t = new WebGLPathTracer(gl)
      t.renderToCanvas = true
      t.rasterizeScene = false // the real-time frame is already on screen underneath
      t.renderDelay = 0
      t.minSamples = 2
      t.fadeDuration = 700
      t.bounces = 4
      t.filterGlossyFactor = 0.5
      t.renderScale = Math.min(1, 1.2 / gl.getPixelRatio())
      t.tiles.set(2, 2)
      t.textureSize.set(1024, 1024)
      // the composer tone-maps the real-time view, so tone-map the traced image the same way
      t.renderToCanvasCallback = (_target, renderer, quad) => {
        const tm = renderer.toneMapping
        const te = renderer.toneMappingExposure
        const ac = renderer.autoClear
        renderer.toneMapping = THREE.AgXToneMapping
        renderer.toneMappingExposure = 1.35
        renderer.autoClear = false
        quad.render(renderer)
        renderer.autoClear = ac
        renderer.toneMapping = tm
        renderer.toneMappingExposure = te
      }
      try {
        // import the single-worker builder directly: the package's worker index also pulls in the
        // parallel builder, whose nested workers stall Turbopack's production build
        const { GenerateMeshBVHWorker } = await import("three-mesh-bvh/src/workers/GenerateMeshBVHWorker.js")
        const w = new GenerateMeshBVHWorker()
        worker.current = w
        t.setBVHWorker(w)
      } catch {
        // no worker support: BVH builds on the main thread instead
      }
      const photo = buildPhotoScene(scene, background)
      await t.setSceneAsync(photo, camera)
      tracer.current = t
      ready.current = true
    } catch (err) {
      console.warn("Photo mode unavailable:", err)
    } finally {
      building.current = false
      onStatus({ state: "idle" })
    }
  }

  // runs after the post-processing composer (priority 1), drawing on top of its frame
  useFrame(() => {
    const now = performance.now()
    const moved = !lastMatrix.current.equals(camera.matrixWorld)
    if (moved) {
      lastMatrix.current.copy(camera.matrixWorld)
      lastMove.current = now
      if (active.current) {
        active.current = false
        onStatus({ state: "idle" })
      }
    }
    if (!enabled) {
      if (active.current) {
        active.current = false
        onStatus({ state: "idle" })
      }
      return
    }
    if (now - lastMove.current < IDLE_MS) return
    if (!ready.current) {
      if (!building.current) void build()
      return
    }
    const t = tracer.current!
    if (!active.current) {
      active.current = true
      t.setCamera(camera)
    }
    // once converged, stop tracing but keep presenting the finished image
    t.pausePathTracing = t.samples >= TARGET_SAMPLES
    t.renderSample()
    if (now - lastReport.current > 400) {
      lastReport.current = now
      onStatus({ state: "rendering", samples: Math.floor(t.samples) })
    }
  }, 2)

  return null
}
