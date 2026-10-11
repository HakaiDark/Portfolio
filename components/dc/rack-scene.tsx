"use client"

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { CameraControls, CameraControlsImpl, Html, PerformanceMonitor, useProgress } from "@react-three/drei"
import { Bloom, DepthOfField, EffectComposer, N8AO, Noise, ToneMapping, Vignette } from "@react-three/postprocessing"
import { BlendFunction, ToneMappingMode } from "postprocessing"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js"
import { ACCESS_POINT, heroRack } from "@/lib/dc/devices"
import { FACE_Z, facePoint, mountedDevices } from "@/lib/dc/layout"
import { LAPTOP_SCREEN_CENTER } from "@/lib/dc/laptop"
import { rackCards } from "@/content/rack-cards"
import { OpenRack } from "./rack-hardware"
import { RackCabling } from "./rack-cabling"
import { Room } from "./room"
import { InfoCard } from "./info-card"
import { Laptop } from "./laptop"
import { Mug } from "./mug"
import { AccessPoint } from "./access-point"
import { TerminalOverlay } from "./terminal-overlay"

const { ACTION } = CameraControlsImpl
const BG = "#2a3036"
const AZIMUTH_LIMIT = THREE.MathUtils.degToRad(75)
/** limit on the side a desktop framing offset shifts the camera toward */
const SHIFTED_AZIMUTH_LIMIT = THREE.MathUtils.degToRad(48)

interface Stop {
  id: string
  label: string
  position: [number, number, number]
  target: [number, number, number]
  cardId?: string
  /** half-width (m) that must fit on screen when arriving */
  fit?: number
  /** allow looking up (the ceiling AP) */
  lookUp?: boolean
  terminal?: boolean
}

function useStops(): Stop[] {
  return useMemo(() => {
    const stops: Stop[] = [{ id: "overview", label: "Overview", position: [0.78, 1.62, 1.85], target: [0, 1.35, -0.1] }]
    mountedDevices()
      .filter((d) => d.hotspot)
      .forEach((d, i) => {
        const side = i % 2 === 0 ? 1 : -1
        stops.push({
          id: d.key,
          label: d.cfg.short,
          position: [side * 0.12, d.centerY + 0.06, 0.42 + d.cfg.rackUnits * 0.1],
          target: [0, d.centerY, 0],
          cardId: d.cfg.cardId,
          fit: 0.29,
        })
      })
    const [ax, ay, az] = ACCESS_POINT.position
    stops.push({ id: "wireless", label: "Wi-Fi", position: [0.2, 2.42, 1.42], target: [ax, ay - 0.05, az], cardId: ACCESS_POINT.cardId, lookUp: true })
    const [lx, ly, lz] = LAPTOP_SCREEN_CENTER
    stops.push({ id: "terminal", label: "Terminal", position: [lx + 0.12, ly + 0.1, 0.42], target: [lx + 0.06, ly - 0.03, lz], fit: 0.27, terminal: true })
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
    scene.environmentIntensity = 0.55
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
      {/* cool-white data hall: bright overheads, light bounce off the floor */}
      <hemisphereLight args={["#eef3f8", "#5a6068", 0.4]} />
      <directionalLight
        position={[1.1, 3.0, 2.3]}
        intensity={1.45}
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
        [-2.4, 0, 2.4].map((x) => (
          <rectAreaLight key={x} args={["#eef3ff", 10, 1.45, 0.09]} position={[x, 3.02, 1.35]} rotation={[-Math.PI / 2, 0, 0]} />
        ))
      ) : (
        <pointLight position={[0, 2.8, 1.4]} intensity={4} distance={7} decay={2} color="#eef3ff" />
      )}
    </>
  )
}

/**
 * Dev aid (only with ?capture in the URL): lets tooling render frames on demand and grab
 * stills, e.g. to produce the static fallback image. Works even when the tab is hidden.
 */
function CaptureHook({ setStop, setTraffic }: { setStop: (id: string) => void; setTraffic: (on: boolean) => void }) {
  const get = useThree((s) => s.get)
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    w.__rack = {
      setStop,
      setTraffic,
      /** orbit like a user drag (degrees); the controls clamp to their limits */
      orbit(deg: number) {
        const c = get().controls as unknown as CameraControlsImpl | null
        c?.rotate(THREE.MathUtils.degToRad(deg), 0, false)
        c?.update(0)
        return c ? THREE.MathUtils.radToDeg(c.azimuthAngle) : null
      },
      lookAt(px: number, py: number, pz: number, tx: number, ty: number, tz: number) {
        const c = get().controls as unknown as CameraControlsImpl | null
        c?.setFocalOffset(0, 0, 0, false)
        c?.setLookAt(px, py, pz, tx, ty, tz, false)
      },
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
  }, [get, setStop, setTraffic])
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
  cardOpen,
}: {
  stop: Stop
  autoRotate: boolean
  onInteract: () => void
  instant?: boolean
  cardOpen: boolean
}) {
  const ref = useRef<CameraControlsImpl>(null)
  const size = useThree((s) => s.size)
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const aspect = size.width / Math.max(1, size.height)
  // Portrait phones: widen the lens and step back a little to fit the rack width,
  // without backing into the opposite row of cabinets.
  const portrait = aspect < 1
  const fov = portrait ? 54 : 40
  const pull = portrait ? THREE.MathUtils.clamp(0.85 / Math.sqrt(aspect), 1, 1.3) : 1
  const dir = useRef(1)

  useEffect(() => {
    camera.fov = fov
    camera.updateProjectionMatrix()
  }, [camera, fov])

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const [tx, ty, tz] = stop.target
    const target = new THREE.Vector3(...stop.target)
    const offset = new THREE.Vector3(...stop.position).sub(target)
    const sideCard = cardOpen && !portrait && aspect > 1.2 && !!stop.cardId
    if (stop.fit) {
      // back off just enough that the subject (plus a little air) fits the width;
      // with the desktop card open only ~62% of the width is free
      const free = sideCard ? 0.62 : 1
      const fit = stop.fit / (aspect * free * Math.tan(THREE.MathUtils.degToRad(fov) / 2))
      offset.setLength(Math.max(offset.length(), fit))
    } else {
      offset.multiplyScalar(pull)
    }
    const p = target.clone().add(offset)
    c.setLookAt(p.x, p.y, p.z, tx, ty, tz, !instant)
    const visH = 2 * offset.length() * Math.tan(THREE.MathUtils.degToRad(fov) / 2)
    const visW = visH * aspect
    // phones: the info sheet covers the lower half, so lift the subject into the upper half;
    // desktop: the card sits on the right, so slide the subject left
    // phone overview: the compact hero card covers the top, so frame the rack a little lower
    const phoneHero = stop.id === "overview" && portrait
    const oy = portrait && cardOpen && stop.cardId ? (stop.lookUp ? -0.22 : 0.24) * visH : phoneHero ? -0.1 * visH : 0
    // desktop overview: the hero card sits on the left, so push the rack right
    const heroCard = stop.id === "overview" && !portrait && aspect > 1.2
    const ox = sideCard ? 0.19 * visW : heroCard ? -0.14 * visW : 0
    c.setFocalOffset(ox, oy, 0, !instant)
  }, [stop, pull, instant, aspect, portrait, fov, cardOpen])

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const start = () => onInteract()
    c.addEventListener("controlstart", start)
    return () => c.removeEventListener("controlstart", start)
  }, [onInteract])

  // The desktop framing offsets shift the camera sideways. Orbiting toward the side the shift
  // points at would bring the camera ~30 cm closer to the rack row and clip into it, so that
  // side stops earlier (the overview shifts toward the left; an open side card toward the right).
  const wide = !portrait && aspect > 1.2
  const shiftedLeft = wide && stop.id === "overview"
  const shiftedRight = wide && cardOpen && !!stop.cardId
  const minAz = shiftedLeft ? -SHIFTED_AZIMUTH_LIMIT : -AZIMUTH_LIMIT
  const maxAz = shiftedRight ? SHIFTED_AZIMUTH_LIMIT : AZIMUTH_LIMIT

  useFrame((_, dt) => {
    const c = ref.current
    if (!c || !autoRotate) return
    // slow ping-pong sweep inside the allowed arc
    const az = c.azimuthAngle
    if (az > maxAz * 0.55) dir.current = -1
    if (az < minAz * 0.55) dir.current = 1
    // cap dt: after the loop was paused (hero off screen) the first delta can be seconds long
    c.rotate(dir.current * Math.min(dt, 0.05) * 0.06, 0, false)
  })

  return (
    <CameraControls
      ref={ref}
      makeDefault
      smoothTime={0.55}
      minAzimuthAngle={minAz}
      maxAzimuthAngle={maxAz}
      minPolarAngle={THREE.MathUtils.degToRad(58)}
      maxPolarAngle={THREE.MathUtils.degToRad(stop.lookUp ? 150 : 100)}
      minDistance={0.25}
      maxDistance={2.2}
      dollyToCursor={false}
      mouseButtons={{ left: ACTION.ROTATE, middle: ACTION.DOLLY, right: ACTION.NONE, wheel: ACTION.NONE }}
      touches={{ one: ACTION.TOUCH_ROTATE, two: ACTION.TOUCH_DOLLY, three: ACTION.NONE }}
    />
  )
}

/** Mounted once everything inside Suspense has loaded: precompile shaders so the first frame doesn't hitch. */
const yieldToBrowser = () => new Promise<void>((r) => setTimeout(r, 0))

/**
 * Mounted once everything inside Suspense has loaded. While the render loop is still paused it
 * prepares the GPU in small steps (shaders, then textures a few at a time, then one warm-up
 * frame) so the loading screen never stalls on one long block of work.
 */
function SceneReady({ onAssets, onReady }: { onAssets: () => void; onReady: () => void }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const camera = useThree((s) => s.camera)
  const get = useThree((s) => s.get)
  useEffect(() => {
    onAssets()
    let done = false
    const finish = () => {
      if (done) return
      done = true
      onReady()
    }
    ;(async () => {
      const mark = (name: string, start: number) => performance.measure(`dc:${name}`, { start, end: performance.now() })
      let t = performance.now()
      try {
        await gl.compileAsync(scene, camera)
      } catch {
        /* fall through: shaders compile on first render instead */
      }
      mark("compileAsync", t)
      await yieldToBrowser()

      t = performance.now()
      const textures = new Set<THREE.Texture>()
      scene.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined
        for (const mat of Array.isArray(m) ? m : m ? [m] : []) {
          for (const v of Object.values(mat)) if ((v as THREE.Texture)?.isTexture) textures.add(v as THREE.Texture)
        }
      })
      let i = 0
      for (const tex of textures) {
        if (done) return
        gl.initTexture(tex)
        if (++i % 4 === 0) await yieldToBrowser()
      }
      mark("textures", t)
      await yieldToBrowser()

      // warm-up in two halves: first a plain render (uploads geometry, draws the shadow map),
      // then a full frame (post-processing targets and their shaders)
      t = performance.now()
      gl.render(scene, camera)
      mark("warmup:scene", t)
      await yieldToBrowser()
      t = performance.now()
      get().advance(performance.now())
      mark("warmup:frame", t)
      await yieldToBrowser()
      finish()
    })()
    const t = setTimeout(finish, 8000) // never hold the loading screen forever
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

function HotspotButton({ label, active, glyph = "+", onClick }: { label: string; active: boolean; glyph?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="group relative flex h-11 w-11 items-center justify-center">
      {!active && <span className="absolute h-7 w-7 rounded-full bg-[#00ffe7]/30 motion-safe:animate-ping" />}
      <span
        className={`relative flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[12px] font-semibold shadow-lg backdrop-blur transition-colors ${
          active ? "border-white bg-white text-black" : "border-[#00ffe7]/80 bg-black/60 text-[#00ffe7] group-hover:bg-[#00ffe7] group-hover:text-black"
        }`}
      >
        {active ? "•" : glyph}
      </span>
    </button>
  )
}

function Hotspots({ activeStop, onStop }: { activeStop: string; onStop: (id: string) => void }) {
  const [ax, ay, az] = ACCESS_POINT.position
  const [lx, ly, lz] = LAPTOP_SCREEN_CENTER
  return (
    <>
      {mountedDevices()
        .filter((d) => d.hotspot && d.cfg.hotspot)
        .map((d) => {
          const [x, y] = facePoint(d.cfg, d.cfg.hotspot!.u, d.cfg.hotspot!.v)
          return (
            <Html key={d.key} position={[x, d.centerY + y, FACE_Z + 0.03]} center zIndexRange={[30, 0]}>
              <HotspotButton label={`About ${d.cfg.name}`} active={activeStop === d.key} onClick={() => onStop(d.key)} />
            </Html>
          )
        })}
      <Html position={[ax, ay - 0.06, az]} center zIndexRange={[30, 0]}>
        <HotspotButton label="About the Aruba access point" active={activeStop === "wireless"} onClick={() => onStop("wireless")} />
      </Html>
      <Html position={[lx - 0.13, ly + 0.08, lz + 0.03]} center zIndexRange={[30, 0]}>
        <HotspotButton label="Open the console terminal" glyph=">_" active={activeStop === "terminal"} onClick={() => onStop("terminal")} />
      </Html>
    </>
  )
}

function Scene({
  quality,
  reducedMotion,
  stop,
  autoRotate,
  onInteract,
  onStop,
  capture,
  setStop,
  traffic,
  setTraffic,
  cardOpen,
  onAssets,
  onReady,
}: {
  quality: "high" | "low"
  reducedMotion: boolean
  stop: Stop
  autoRotate: boolean
  onInteract: () => void
  onStop: (id: string) => void
  capture: boolean
  setStop: (id: string) => void
  traffic: boolean
  setTraffic: (on: boolean) => void
  cardOpen: boolean
  onAssets: () => void
  onReady: () => void
}) {
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 5, 15]} />
      <Environment />
      <Lights quality={quality} />
      <CameraRig stop={stop} autoRotate={autoRotate && !capture} onInteract={onInteract} instant={capture} cardOpen={cardOpen} />
      {capture && <CaptureHook setStop={setStop} setTraffic={setTraffic} />}
      <Suspense fallback={null}>
        <Room quality={quality} />
        <OpenRack slots={heroRack} lowRes={quality === "low"}>
          <RackCabling quality={quality} animate={!reducedMotion} traffic={traffic} />
          <Laptop animate={!reducedMotion} onOpen={() => onStop("terminal")} highlighted={stop.id === "terminal"} />
          <Mug />
        </OpenRack>
        <AccessPoint lowRes={quality === "low"} />
        <Hotspots activeStop={stop.id} onStop={onStop} />
        <SceneReady onAssets={onAssets} onReady={onReady} />
      </Suspense>
      {quality === "high" ? (
        <EffectComposer multisampling={4} enableNormalPass={false}>
          <N8AO halfRes aoRadius={0.35} distanceFalloff={0.6} intensity={2.2} color="#000000" />
          {/* camera-like focus: sharp around the subject, soft beyond ~0.5 m */}
          <DepthOfField target={stop.target} worldFocusRange={stop.id === "overview" ? 2.5 : 0.55} bokehScale={stop.id === "overview" ? 1 : 2.5} height={540} />
          <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={traffic ? 0.9 : 0.55} />
          <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
          <Vignette offset={0.32} darkness={0.5} />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      ) : null}
    </>
  )
}

// ---------------------------------------------------------------------------
// DOM wrapper


export interface RackSceneSignals {
  onEngine?: () => void
  onProgress?: (progress: number) => void
  onAssets?: () => void
  onReady?: () => void
}

export default function RackScene({
  quality,
  reducedMotion,
  signals,
  active = true,
}: {
  quality: "high" | "low"
  reducedMotion: boolean
  signals?: RackSceneSignals
  /** false while the hero is scrolled out of view: the render loop pauses */
  active?: boolean
}) {
  const { progress } = useProgress()
  const sigRef = useRef(signals)
  sigRef.current = signals
  useEffect(() => sigRef.current?.onEngine?.(), [])
  useEffect(() => sigRef.current?.onProgress?.(progress), [progress])
  const onAssets = useCallback(() => sigRef.current?.onAssets?.(), [])
  // the render loop stays paused until SceneReady has warmed the GPU up in small steps
  const capture0 = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("capture")
  const [running, setRunning] = useState(capture0)
  const onReady = useCallback(() => {
    setRunning(true)
    sigRef.current?.onReady?.()
  }, [])
  const stops = useStops()
  const [stopId, setStopId] = useState("overview")
  const [cardOpen, setCardOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [traffic, setTraffic] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [dpr, setDpr] = useState(quality === "high" ? 1.75 : 1.25)
  const capture = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("capture")
  const terminalTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const stop = stops.find((s) => s.id === stopId) ?? stops[0]
  const onInteract = useCallback(() => setInteracted(true), [])

  const goTo = useCallback(
    (id: string) => {
      const s = stops.find((x) => x.id === id) ?? stops[0]
      setInteracted(true)
      setStopId(s.id)
      setCardOpen(!!s.cardId)
      clearTimeout(terminalTimer.current)
      if (s.terminal) terminalTimer.current = setTimeout(() => setTerminalOpen(true), capture ? 0 : 700)
      else setTerminalOpen(false)
    },
    [stops, capture]
  )
  const close = useCallback(() => {
    setCardOpen(false)
    setTerminalOpen(false)
    setStopId("overview")
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close])
  useEffect(() => () => clearTimeout(terminalTimer.current), [])

  const card = cardOpen && stop.cardId ? rackCards[stop.cardId] : null

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: BG }}>
      <Canvas
        dpr={[1, dpr]}
        frameloop={running && active ? "always" : "never"}
        shadows="percentage"
        camera={{ fov: 40, near: 0.02, far: 40, position: [0.78, 1.62, 1.85] }}
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
        className="rack-canvas"
        resize={capture ? { polyfill: ImmediateResizeObserver, debounce: 0 } : undefined}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <Scene
          quality={quality}
          reducedMotion={reducedMotion}
          stop={stop}
          autoRotate={!reducedMotion && !interacted && !card}
          onInteract={onInteract}
          onStop={goTo}
          capture={capture}
          setStop={goTo}
          traffic={traffic}
          setTraffic={setTraffic}
          cardOpen={!!card}
          onAssets={onAssets}
          onReady={onReady}
        />
      </Canvas>

      {/* view toggles */}
      <div className="absolute right-4 top-4 z-20 flex flex-col items-end gap-2 max-md:top-auto max-md:right-3 max-md:bottom-[4.6rem] max-md:flex-row">
        <button
          type="button"
          onClick={() => setTraffic((t) => !t)}
          aria-pressed={traffic}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] tracking-[0.15em] uppercase backdrop-blur-md transition-colors ${
            traffic ? "border-[#5ff4ff] bg-[#5ff4ff]/15 text-[#5ff4ff]" : "border-white/15 bg-black/45 text-white/75 hover:border-white/40"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${traffic ? "bg-[#5ff4ff] motion-safe:animate-pulse" : "bg-white/40"}`} />
          Live traffic
        </button>
      </div>


      {/* camera stops */}
      <nav
        aria-label="Rack views"
        className={`absolute inset-x-0 bottom-0 z-20 flex gap-2 overflow-x-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 transition-opacity md:bottom-4 md:justify-center ${
          card || terminalOpen ? "max-md:pointer-events-none max-md:opacity-0" : "opacity-100"
        }`}
      >
        {stops.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase backdrop-blur-md transition-colors ${
              stop.id === s.id ? "border-[#00ffe7] bg-[#00ffe7] text-black" : "border-white/15 bg-black/45 text-white/80 hover:border-white/40"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {!interacted && (
        <p className="pointer-events-none absolute inset-x-0 bottom-[4.75rem] z-10 px-6 text-center max-md:hidden font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase md:bottom-[5.5rem]">
          Drag sideways to look around · tap <span className="text-[#00ffe7]">+</span> for details
        </p>
      )}

      <InfoCard card={card} onClose={close} />
      <TerminalOverlay open={terminalOpen} onClose={close} />
    </div>
  )
}
