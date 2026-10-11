"use client"

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { CameraControls, CameraControlsImpl, Html, PerformanceMonitor, useProgress } from "@react-three/drei"
import { Bloom, EffectComposer, N8AO, ToneMapping, Vignette } from "@react-three/postprocessing"
import { ToneMappingMode } from "postprocessing"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js"
import { heroRack } from "@/lib/dc/devices"
import { FACE_Z, faceSize, mountedDevices } from "@/lib/dc/layout"
import { rackCards } from "@/content/rack-cards"
import { OpenRack } from "./rack-hardware"
import { RackCabling } from "./rack-cabling"
import { Room } from "./room"
import { InfoCard } from "./info-card"

const { ACTION } = CameraControlsImpl
const BG = "#0b0e11"
const AZIMUTH_LIMIT = THREE.MathUtils.degToRad(75)

interface Stop {
  id: string
  label: string
  position: [number, number, number]
  target: [number, number, number]
  cardId?: string
}

function useStops(): Stop[] {
  return useMemo(() => {
    const stops: Stop[] = [{ id: "overview", label: "Overview", position: [0.72, 1.6, 1.7], target: [0, 1.3, -0.1] }]
    mountedDevices().forEach((d, i) => {
      const side = i % 2 === 0 ? 1 : -1
      const dist = 0.42 + d.cfg.rackUnits * 0.1
      stops.push({
        id: d.cfg.id,
        label: d.cfg.name,
        position: [side * 0.12, d.centerY + 0.06, dist],
        target: [0, d.centerY, 0],
        cardId: d.cfg.cardId,
      })
    })
    return stops
  }, [])
}

// ---------------------------------------------------------------------------
// in-canvas pieces

function Environment() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.42
    return () => {
      scene.environment = null
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

let rectLibReady = false
function Lights({ quality }: { quality: "high" | "low" }) {
  if (quality === "high" && !rectLibReady) {
    RectAreaLightUniformsLib.init()
    rectLibReady = true
  }
  return (
    <>
      <hemisphereLight args={["#dfe7ef", "#2c3036", 0.22]} />
      <directionalLight
        position={[1.1, 3.0, 2.3]}
        intensity={1.5}
        color="#f4f7ff"
        castShadow
        shadow-mapSize={quality === "high" ? [2048, 2048] : [1024, 1024]}
        shadow-bias={-0.0002}
        shadow-normalBias={0.015}
        shadow-camera-left={-1.8}
        shadow-camera-right={1.8}
        shadow-camera-top={2.2}
        shadow-camera-bottom={-1.4}
        shadow-camera-near={0.5}
        shadow-camera-far={8}
      />
      {quality === "high" ? (
        [-1.2, 1.2].map((x) => (
          <rectAreaLight key={x} args={["#eef3ff", 9, 1.45, 0.09]} position={[x, 3.02, 1.35]} rotation={[-Math.PI / 2, 0, 0]} />
        ))
      ) : (
        <pointLight position={[0, 2.8, 1.4]} intensity={2.2} distance={6} decay={2} color="#eef3ff" />
      )}
      {/* faint cool bounce from the cabinet LEDs */}
      <pointLight position={[0, 1.2, 2.2]} intensity={0.35} distance={3} decay={2} color="#7fd8ff" />
    </>
  )
}

/**
 * Dev aid (only with ?capture in the URL): lets tooling render frames on demand and grab
 * stills, e.g. to produce the static fallback image. Works even when the tab is hidden.
 */
function CaptureHook({ setStop }: { setStop: (id: string) => void }) {
  const get = useThree((s) => s.get)
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    w.__rack = {
      setStop,
      render(frames = 1) {
        for (let i = 0; i < frames; i++) get().advance(performance.now() + i * 16)
      },
      snapshot(type = "image/webp", q = 0.9) {
        get().advance(performance.now())
        return get().gl.domElement.toDataURL(type, q)
      },
    }
    return () => {
      delete w.__rack
    }
  }, [get, setStop])
  return null
}

// Hidden tabs never deliver ResizeObserver callbacks, which stops R3F from starting.
// Capture mode swaps in one that reports the size straight away.
class ImmediateResizeObserver {
  constructor(private cb: ResizeObserverCallback) {}
  observe(el: Element) {
    setTimeout(() => this.cb([{ target: el, contentRect: el.getBoundingClientRect() } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver), 0)
  }
  unobserve() {}
  disconnect() {}
}

function CameraRig({
  stop,
  autoRotate,
  onInteract,
  instant = false,
}: {
  stop: Stop
  autoRotate: boolean
  onInteract: () => void
  instant?: boolean
}) {
  const ref = useRef<CameraControlsImpl>(null)
  const size = useThree((s) => s.size)
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const aspect = size.width / Math.max(1, size.height)
  // Portrait phones: widen the lens and step back a little to fit the rack width,
  // without backing into the opposite row of cabinets.
  const portrait = aspect < 1
  const pull = portrait ? THREE.MathUtils.clamp(0.85 / Math.sqrt(aspect), 1, 1.3) : 1
  const dir = useRef(1)

  useEffect(() => {
    camera.fov = portrait ? 54 : 40
    camera.updateProjectionMatrix()
  }, [camera, portrait])

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const [tx, ty, tz] = stop.target
    const target = new THREE.Vector3(...stop.target)
    const offset = new THREE.Vector3(...stop.position).sub(target)
    if (stop.cardId) {
      // device close-up: back off just enough that a 19" faceplate (plus a little air) fits the width
      const halfFov = THREE.MathUtils.degToRad(portrait ? 54 : 40) / 2
      // with the desktop card open only ~62% of the width is free
      const free = !portrait && aspect > 1.2 ? 0.62 : 1
      const fit = 0.29 / (aspect * free * Math.tan(halfFov))
      offset.setLength(Math.max(offset.length(), fit))
    } else {
      offset.multiplyScalar(pull)
    }
    const p = target.clone().add(offset)
    c.setLookAt(p.x, p.y, p.z, tx, ty, tz, !instant)
    // phones: the info sheet covers the lower half, so lift the device into the upper half
    const visH = 2 * offset.length() * Math.tan(THREE.MathUtils.degToRad(portrait ? 54 : 40) / 2)
    // desktop: the card sits on the right, so slide the device left
    const visW = visH * aspect
    const ox = !portrait && stop.cardId && aspect > 1.2 ? 0.19 * visW : 0
    c.setFocalOffset(ox, portrait && stop.cardId ? 0.24 * visH : 0, 0, !instant)
  }, [stop, pull, instant, aspect, portrait])

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const start = () => onInteract()
    c.addEventListener("controlstart", start)
    return () => c.removeEventListener("controlstart", start)
  }, [onInteract])

  useFrame((_, dt) => {
    const c = ref.current
    if (!c || !autoRotate) return
    // slow ping-pong sweep inside the allowed arc
    const az = c.azimuthAngle
    if (az > AZIMUTH_LIMIT * 0.55) dir.current = -1
    if (az < -AZIMUTH_LIMIT * 0.55) dir.current = 1
    c.rotate(dir.current * dt * 0.06, 0, false)
  })

  return (
    <CameraControls
      ref={ref}
      makeDefault
      smoothTime={0.55}
      minAzimuthAngle={-AZIMUTH_LIMIT}
      maxAzimuthAngle={AZIMUTH_LIMIT}
      minPolarAngle={THREE.MathUtils.degToRad(58)}
      maxPolarAngle={THREE.MathUtils.degToRad(100)}
      minDistance={0.3}
      maxDistance={2.2}
      dollyToCursor={false}
      mouseButtons={{ left: ACTION.ROTATE, middle: ACTION.DOLLY, right: ACTION.NONE, wheel: ACTION.DOLLY }}
      touches={{ one: ACTION.TOUCH_ROTATE, two: ACTION.TOUCH_DOLLY, three: ACTION.NONE }}
    />
  )
}

function Hotspots({ active, onSelect }: { active: string | null; onSelect: (cardId: string, deviceId: string) => void }) {
  return (
    <>
      {mountedDevices().map((d) => {
        if (!d.cfg.cardId || !d.cfg.hotspot) return null
        const [fw, fh] = faceSize(d.cfg)
        const x = (d.cfg.hotspot.u - 0.5) * fw
        const y = d.centerY + (0.5 - d.cfg.hotspot.v) * fh
        const isActive = active === d.cfg.cardId
        return (
          <Html key={d.cfg.id} position={[x, y, FACE_Z + 0.03]} center zIndexRange={[30, 0]}>
            <button
              type="button"
              onClick={() => onSelect(d.cfg.cardId!, d.cfg.id)}
              aria-label={`About ${d.cfg.name}`}
              className="group relative flex h-11 w-11 items-center justify-center"
            >
              {!isActive && <span className="absolute h-7 w-7 rounded-full bg-[#00ffe7]/30 motion-safe:animate-ping" />}
              <span
                className={`relative flex h-7 w-7 items-center justify-center rounded-full border text-sm font-semibold shadow-lg backdrop-blur transition-colors ${
                  isActive ? "border-white bg-white text-black" : "border-[#00ffe7]/80 bg-black/60 text-[#00ffe7] group-hover:bg-[#00ffe7] group-hover:text-black"
                }`}
              >
                {isActive ? "•" : "+"}
              </span>
            </button>
          </Html>
        )
      })}
    </>
  )
}

function Scene({
  quality,
  reducedMotion,
  stop,
  autoRotate,
  onInteract,
  activeCard,
  onSelect,
  capture,
  setStop,
}: {
  quality: "high" | "low"
  reducedMotion: boolean
  stop: Stop
  autoRotate: boolean
  onInteract: () => void
  activeCard: string | null
  onSelect: (cardId: string, deviceId: string) => void
  capture: boolean
  setStop: (id: string) => void
}) {
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 4.5, 13]} />
      <Environment />
      <Lights quality={quality} />
      <CameraRig stop={stop} autoRotate={autoRotate && !capture} onInteract={onInteract} instant={capture} />
      {capture && <CaptureHook setStop={setStop} />}
      <Suspense fallback={null}>
        <Room quality={quality} />
        <OpenRack slots={heroRack} lowRes={quality === "low"}>
          <RackCabling quality={quality} animate={!reducedMotion} />
        </OpenRack>
        <Hotspots active={activeCard} onSelect={onSelect} />
      </Suspense>
      {quality === "high" ? (
        <EffectComposer multisampling={4} enableNormalPass={false}>
          <N8AO halfRes aoRadius={0.35} distanceFalloff={0.6} intensity={2.2} color="#000000" />
          <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={0.55} />
          <Vignette offset={0.32} darkness={0.55} />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      ) : null}
    </>
  )
}

// ---------------------------------------------------------------------------
// DOM wrapper

function Loader() {
  const { active, progress } = useProgress()
  if (!active) return null
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="font-mono text-[11px] tracking-[0.3em] text-white/60 uppercase">Racking equipment… {Math.round(progress)}%</div>
    </div>
  )
}

export default function RackScene({ quality, reducedMotion }: { quality: "high" | "low"; reducedMotion: boolean }) {
  const stops = useStops()
  const [stopId, setStopId] = useState("overview")
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [interacted, setInteracted] = useState(false)
  const [dpr, setDpr] = useState(quality === "high" ? 1.75 : 1.25)
  const capture = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("capture")

  const stop = stops.find((s) => s.id === stopId) ?? stops[0]
  const onInteract = useCallback(() => setInteracted(true), [])
  const onSelect = useCallback(
    (cardId: string, deviceId: string) => {
      setInteracted(true)
      setActiveCard(cardId)
      setStopId(deviceId)
    },
    []
  )
  const goTo = (s: Stop) => {
    setInteracted(true)
    setStopId(s.id)
    setActiveCard(s.cardId ?? null)
  }
  const close = useCallback(() => {
    setActiveCard(null)
    setStopId("overview")
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close])

  const card = activeCard ? rackCards[activeCard] : null

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: BG }}>
      <Canvas
        dpr={[1, dpr]}
        shadows="percentage"
        camera={{ fov: 40, near: 0.02, far: 40, position: [0.95, 1.62, 2.05] }}
        gl={{
          antialias: quality === "low",
          powerPreference: "high-performance",
          stencil: false,
          preserveDrawingBuffer: capture,
          toneMapping: quality === "high" ? THREE.NoToneMapping : THREE.AgXToneMapping,
        }}
        onCreated={({ gl }) => {
          if (quality === "high") gl.toneMapping = THREE.NoToneMapping
        }}
        style={{ touchAction: "none" }}
        resize={capture ? { polyfill: ImmediateResizeObserver, debounce: 0 } : undefined}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <Scene
          quality={quality}
          reducedMotion={reducedMotion}
          stop={stop}
          autoRotate={!reducedMotion && !interacted && !activeCard}
          onInteract={onInteract}
          activeCard={activeCard}
          onSelect={onSelect}
          capture={capture}
          setStop={setStopId}
        />
      </Canvas>

      <Loader />

      {/* camera stops */}
      <nav
        aria-label="Rack views"
        className={`absolute inset-x-0 bottom-0 z-20 flex justify-center gap-2 overflow-x-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 transition-opacity md:bottom-4 ${
          card ? "max-md:pointer-events-none max-md:opacity-0" : "opacity-100"
        }`}
      >
        {stops.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s)}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase backdrop-blur-md transition-colors ${
              stop.id === s.id ? "border-[#00ffe7] bg-[#00ffe7] text-black" : "border-white/15 bg-black/45 text-white/80 hover:border-white/40"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {!interacted && (
        <p className="pointer-events-none absolute inset-x-0 top-4 z-10 text-center font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
          Drag to look around · tap <span className="text-[#00ffe7]">+</span> for details
        </p>
      )}

      <InfoCard card={card} onClose={close} />
    </div>
  )
}
