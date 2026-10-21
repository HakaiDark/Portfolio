"use client"

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { CameraControls, CameraControlsImpl, Html, PerformanceMonitor, useProgress } from "@react-three/drei"
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer, N8AO, Noise, ToneMapping, Vignette } from "@react-three/postprocessing"
import { BlendFunction, ToneMappingMode, type DepthOfFieldEffect } from "postprocessing"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js"
import { ACCESS_POINT, U, heroRack } from "@/lib/dc/devices"
import { FACE_Z, facePoint, mountedDevices, slotCenterY } from "@/lib/dc/layout"
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
import { Ambience } from "@/lib/dc/ambience"
import { HA_PRIMARY, HA_TIMELINE, haBadges, haView, type BadgeTone, type HaPhase, type HaStep, type HaView } from "@/lib/dc/ha"
import { FailoverPanel } from "./failover-panel"
import { MONITORS, MonitorWall } from "./monitor-wall"
import { RearPower } from "./rear-power"
import { KVM } from "./kvm-drawer"
import { DeskPhone, PHONE } from "./desk-phone"
import { ContactPanel } from "./contact-panel"
import { DeskProps } from "./desk-props"
import { PacketJourney, TracePanel } from "./packet-journey"
import { TRACE_POSE } from "@/lib/dc/journey"
import { realityShot, type RealityLayout, type RealityShot } from "@/lib/dc/reality"

const { ACTION } = CameraControlsImpl
const BG = "#2a3036"
const LENS_FRINGE = new THREE.Vector2(0.0009, 0.0006)
const AZIMUTH_LIMIT = THREE.MathUtils.degToRad(75)
/** limit on the side a desktop framing offset shifts the camera toward */
const SHIFTED_AZIMUTH_LIMIT = THREE.MathUtils.degToRad(48)
/** how far a visitor can zoom out (unless the stop itself frames from further away) */
const MAX_DISTANCE = 2.2
/** closest zoom: keeps the camera in front of the cables and fingers that stick out of the rack */
const MIN_DISTANCE = 0.32

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
  /** pull this stop's device out on its rails */
  extend?: boolean
  /** closest zoom for this stop (default MIN_DISTANCE) */
  minDistance?: number
  /** half-height (m) that must fit in the free part of the screen (above the phone sheet) */
  fitH?: number
  /** not offered in the view bar (the packet film's hand-off framing) */
  hidden?: boolean
}

function useStops(): Stop[] {
  return useMemo(() => {
    // the overview orbits a point behind the rack face, so it stops further out
    const stops: Stop[] = [{ id: "overview", label: "Overview", position: [0.78, 1.62, 1.85], target: [0, 1.35, -0.1], minDistance: 0.55 }]
    mountedDevices()
      .filter((d) => d.hotspot)
      .forEach((d, i) => {
        const side = i % 2 === 0 ? 1 : -1
        const slide = d.cfg.slide
        if (slide) {
          // pulled out on its rails: look down into the open tray
          stops.push({
            id: d.key,
            label: d.cfg.short,
            position: [0.2, d.centerY + 0.4, 0.6 + slide],
            target: [0, d.centerY - 0.01, slide * 0.5],
            cardId: d.cfg.cardId,
            fit: 0.27,
            extend: true,
          })
          return
        }
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
    // rack console drawer: look down at the screen and keyboard once it's out
    const kvmSlot = heroRack.find((x) => x.kind === "kvm")
    if (kvmSlot) {
      const ky = slotCenterY(kvmSlot.u, 1)
      stops.push({
        id: "kvm",
        label: "Automation",
        position: [0.14, ky + 0.3, 1.0],
        target: [0, ky + 0.1, 0.14],
        cardId: "automation",
        fit: 0.26,
        extend: true,
        minDistance: 0.3,
      })
    }
    // the two monitors on the next rack: look at them square-on
    const { position: mp, rotationY: mr, tops } = MONITORS
    const mt: [number, number, number] = [mp[0] + Math.sin(mr) * 0.045, (tops[0] + tops[1]) / 2, mp[2] + Math.cos(mr) * 0.045]
    stops.push({
      id: "monitoring",
      label: "Monitoring",
      position: [mt[0] + Math.sin(mr) * 1.15, mt[1] + 0.03, mt[2] + Math.cos(mr) * 1.15],
      target: mt,
      cardId: "monitoring",
      fit: 0.34,
      fitH: 0.37,
      minDistance: 0.4,
    })
    // the NOC desk phone on the right rack's shelf
    {
      const [phx, phy, phz] = PHONE.position
      const r = PHONE.rotationY
      const t: [number, number, number] = [phx + Math.sin(r) * 0.01, phy + 0.08, phz + Math.cos(r) * 0.01]
      stops.push({
        id: "contact",
        label: "Contact",
        // only slightly above the phone, so the eye line clears the gear above the shelf
        position: [t[0] + Math.sin(r) * 0.62, t[1] + 0.2, t[2] + Math.cos(r) * 0.62],
        target: t,
        cardId: "contact",
        fit: 0.2,
        minDistance: 0.3,
      })
    }
    const [lx, ly, lz] = LAPTOP_SCREEN_CENTER
    stops.push({ id: "terminal", label: "Terminal", position: [lx + 0.12, ly + 0.1, 0.42], target: [lx + 0.06, ly - 0.03, lz], fit: 0.27, terminal: true, minDistance: 0.24 })
    // close on the FortiGate's fibre ports: the packet film's first frame matches this view
    stops.push({ id: "trace", label: "Trace", position: TRACE_POSE.position, target: TRACE_POSE.target, hidden: true, minDistance: 0.2 })
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
/** set by the capture hook's lookAt so stills can be framed anywhere */
let captureFreeCamera = false

function CaptureHook({ setStop, setTraffic }: { setStop: (id: string) => void; setTraffic: (on: boolean) => void }) {
  const get = useThree((s) => s.get)
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>
    w.__rack = {
      setStop(id: string) {
        captureFreeCamera = false
        setStop(id)
      },
      setTraffic,
      /** orbit like a user drag (degrees); the controls clamp to their limits */
      orbit(deg: number) {
        const c = get().controls as unknown as CameraControlsImpl | null
        c?.rotate(THREE.MathUtils.degToRad(deg), 0, false)
        c?.update(0)
        return c ? THREE.MathUtils.radToDeg(c.azimuthAngle) : null
      },
      /** free camera for stills: also lifts the close-up arc narrowing until the next setStop */
      lookAt(px: number, py: number, pz: number, tx: number, ty: number, tz: number) {
        captureFreeCamera = true
        const c = get().controls as unknown as CameraControlsImpl | null
        if (c) {
          c.setBoundary()
          c.minAzimuthAngle = -Infinity
          c.maxAzimuthAngle = Infinity
        }
        c?.setFocalOffset(0, 0, 0, false)
        c?.setLookAt(px, py, pz, tx, ty, tz, false)
      },
      /** camera-to-target distance (to check zoom gestures) */
      distance() {
        return (get().controls as unknown as CameraControlsImpl | null)?.distance ?? null
      },
      /** camera position and orbit target, rounded to mm (to check zoom limits) */
      pose() {
        const c = get().controls as unknown as CameraControlsImpl | null
        if (!c) return null
        const r = (v: THREE.Vector3) => [v.x, v.y, v.z].map((n) => Math.round(n * 1000) / 1000)
        return { camera: r(c.getPosition(new THREE.Vector3())), target: r(c.getTarget(new THREE.Vector3())), azimuth: Math.round(THREE.MathUtils.radToDeg(c.azimuthAngle)) }
      },
      /** the rendered camera (focal offset included): position, a point 1 m ahead, vertical fov */
      view() {
        const cam = get().camera as THREE.PerspectiveCamera
        cam.updateMatrixWorld()
        const p = cam.getWorldPosition(new THREE.Vector3())
        const t = p.clone().add(cam.getWorldDirection(new THREE.Vector3()))
        const r = (v: THREE.Vector3) => [v.x, v.y, v.z].map((n) => Math.round(n * 10000) / 10000)
        return { position: r(p), target: r(t), fov: cam.fov }
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
  reframe = 0,
  onZoomed,
}: {
  stop: Stop
  autoRotate: boolean
  onInteract: () => void
  instant?: boolean
  cardOpen: boolean
  /** bump to re-apply the current stop's framing (e.g. "back to overview" after zooming) */
  reframe?: number
  /** the visitor zoomed in from the overview (true) or back out (false) */
  onZoomed?: (zoomed: boolean) => void
}) {
  const ref = useRef<CameraControlsImpl>(null)
  const baseDist = useRef(2.6)
  const stopRef = useRef(stop)
  stopRef.current = stop
  const zoomed = useRef(false)
  const size = useThree((s) => s.size)
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const aspect = size.width / Math.max(1, size.height)
  // Portrait phones: widen the lens and step back a little to fit the rack width,
  // without backing into the opposite row of cabinets.
  const portrait = aspect < 1
  const fov = portrait ? 54 : 40
  const pull = portrait ? THREE.MathUtils.clamp(0.85 / Math.sqrt(aspect), 1, 1.3) : 1
  const dir = useRef(1)
  const gl = useThree((s) => s.gl)
  // how far out the visitor can zoom: the overview's own framing, or 2.2 m (more if a stop frames from further)
  const [maxDist, setMaxDist] = useState(MAX_DISTANCE)

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
      // portrait overview: fit the rack (with its cable managers) to the screen width, no wider,
      // so phones don't back off far enough to show the ceiling
      if (portrait && stop.id === "overview") offset.setLength(0.4 / (aspect * Math.tan(THREE.MathUtils.degToRad(fov) / 2)))
      else offset.multiplyScalar(pull)
    }
    if (stop.fitH) {
      // tall subjects (the monitor pair): back off until they fit the free height too
      const freeH = portrait && cardOpen && stop.cardId ? 0.4 : 0.86
      offset.setLength(Math.max(offset.length(), stop.fitH / (freeH * Math.tan(THREE.MathUtils.degToRad(fov) / 2))))
    }
    baseDist.current = offset.length()
    const p = target.clone().add(offset)
    // the overview is as far out as it goes, so scrolling down there moves the page straight away
    setMaxDist(stop.id === "overview" ? offset.length() + 0.005 : Math.max(MAX_DISTANCE, offset.length()))
    // fence the orbit point: two-finger drags and cursor zooms can slide the view around this
    // stop, but never off into empty space (overview: floor-to-top of the rack)
    const fence =
      stop.id === "overview"
        ? new THREE.Box3(new THREE.Vector3(-0.6, 0.35, tz - 0.3), new THREE.Vector3(0.6, 2.15, tz + 0.3))
        : new THREE.Box3(new THREE.Vector3(tx - 0.3, ty - 0.3, tz - 0.25), new THREE.Vector3(tx + 0.3, ty + 0.3, tz + 0.25))
    c.setBoundary(fence)
    c.setLookAt(p.x, p.y, p.z, tx, ty, tz, !instant)
    const visH = 2 * offset.length() * Math.tan(THREE.MathUtils.degToRad(fov) / 2)
    const visW = visH * aspect
    // phones: the info sheet covers the lower half, so lift the subject into the upper half;
    // desktop: the card sits on the right, so slide the subject left
    // phone overview: the compact hero card covers the top, so frame the rack a little lower
    const phoneHero = stop.id === "overview" && portrait
    const oy = portrait && cardOpen && stop.cardId ? 0.24 * visH : phoneHero ? -0.1 * visH : 0
    // desktop overview: the hero card sits on the left, so push the rack right
    const heroCard = stop.id === "overview" && !portrait && aspect > 1.2
    const ox = sideCard ? 0.19 * visW : heroCard ? -0.14 * visW : 0
    c.setFocalOffset(ox, oy, 0, !instant)
  }, [stop, pull, instant, aspect, portrait, fov, cardOpen, reframe])

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

  // Phones: a one-finger SIDEWAYS swipe turns around the rack; up/down swipes stay with the page
  // (the canvas is touch-action: pan-y, and polar rotation is off on touch, so a vertical swipe
  // never tilts the camera instead of scrolling); two fingers pinch to zoom and drag to slide the
  // view (e.g. down the rack), fenced in by the stop's boundary. Mouse keeps drag-to-orbit.
  const coarsePointer = useMemo(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches, [])
  const touchActions = useMemo(() => {
    const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
    return coarse
      ? { one: ACTION.TOUCH_ROTATE, two: ACTION.TOUCH_DOLLY_TRUCK, three: ACTION.NONE }
      : { one: ACTION.TOUCH_ROTATE, two: ACTION.TOUCH_DOLLY_TRUCK, three: ACTION.NONE }
  }, [])

  // Touch: a two-finger gesture on the rack belongs to the 3D view. Without this, iOS Safari
  // pinch-zooms the whole page (it doesn't fully honour `touch-action: pan-y`) or claims the
  // gesture for scrolling and cancels the pointers before the pinch reaches camera-controls.
  // One finger is never touched, so it keeps scrolling the page.
  useEffect(() => {
    const el = gl.domElement
    const multi = (e: TouchEvent) => {
      if (e.touches.length >= 2 && e.cancelable) e.preventDefault()
    }
    const gesture = (e: Event) => e.preventDefault() // Safari's own pinch events
    el.addEventListener("touchstart", multi, { passive: false })
    el.addEventListener("touchmove", multi, { passive: false })
    el.addEventListener("gesturestart", gesture)
    el.addEventListener("gesturechange", gesture)
    return () => {
      el.removeEventListener("touchstart", multi)
      el.removeEventListener("touchmove", multi)
      el.removeEventListener("gesturestart", gesture)
      el.removeEventListener("gesturechange", gesture)
    }
  }, [gl])

  // Mouse wheel / trackpad: zooms the rack only while the page is at the top. Fully zoomed out,
  // scrolling down hands over to the page, so visitors who just scroll never get stuck here.
  useEffect(() => {
    const el = gl.domElement
    const onWheel = (e: WheelEvent) => {
      const c = ref.current
      if (!c) return
      const pinch = e.ctrlKey // trackpad pinch arrives as ctrl+wheel
      if (!pinch && window.scrollY > 40) return
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1)
      const d = c.distance
      if (!pinch && ((dy > 0 && d >= c.maxDistance - 0.01) || (dy < 0 && d <= c.minDistance + 0.01))) return
      e.preventDefault()
      // zoom toward the point under the cursor (camera-controls' own dolly-to-cursor path;
      // its public dolly() always aims at the centre). One wheel notch ≈ 18%.
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 2 - 1
      const y = -((e.clientY - r.top) / r.height) * 2 + 1
      const step = THREE.MathUtils.clamp(dy, -120, 120) / (pinch ? 6 : 30)
      ;(c as unknown as { _dollyInternal: (delta: number, x: number, y: number) => void })._dollyInternal(step, x, y)
      if (step > 0) {
        // zooming out eases the orbit point back to the stop's own centre, so scrolling all the
        // way out after a cursor zoom ends on the normal framing, not an off-centre one
        const t = c.getTarget(new THREE.Vector3())
        const home = new THREE.Vector3(...stopRef.current.target)
        if (t.distanceToSquared(home) > 1e-6) c.moveTo(...t.lerp(home, 0.3).toArray(), true)
      }
      onInteract()
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [gl, onInteract])

  // Up close, narrow the arc you can turn through so the camera can't swing into the rack's
  // side (cable managers stick out) — full arc from ~1.1 m out, about half of it at the closest.
  // Phone overview: the two-finger slide range depends on zoom, so the picture's edges stop at
  // the rack top (not the fibres rising out of it) and around the lowest server (not the floor).
  // Zoomed all the way out there is almost nothing to slide; zoomed in there is more rack to see.
  const lastFence = useRef("")
  useFrame(() => {
    const c = ref.current
    if (!c || !portrait || stop.id !== "overview" || captureFreeCamera) return
    const half = c.distance * Math.tan(THREE.MathUtils.degToRad(fov) / 2)
    // picture edges: bottom no lower than ~0.35 m, which is just enough to lift the console drawer
    // and UPS clear of the view bar (that covers the bottom ~16% of the screen and hides what's
    // below, so no floor shows); top no higher than the rack top (~2 m). The overview's own
    // 1.35 m always stays allowed, so zoomed fully out the framing never moves
    const home = stop.target[1]
    let lo = Math.min(home, 0.35 + half * 0.9)
    let hi = Math.max(home, 2.0 - half * 0.9)
    if (lo > hi) lo = hi = home
    const key = `${lo.toFixed(2)}:${hi.toFixed(2)}`
    if (key === lastFence.current) return
    lastFence.current = key
    const [, , tz] = stop.target
    c.setBoundary(new THREE.Box3(new THREE.Vector3(-0.25, lo, tz - 0.3), new THREE.Vector3(0.25, hi, tz + 0.3)))
  })

  // report zooming in from the overview, so the hero card can step aside
  useFrame(() => {
    const c = ref.current
    if (!c || !onZoomed) return
    const z = stop.id === "overview" && c.distance < baseDist.current * 0.8
    if (z !== zoomed.current) {
      zoomed.current = z
      onZoomed(z)
    }
  })

  useFrame(() => {
    const c = ref.current
    if (!c || captureFreeCamera) return
    const k = THREE.MathUtils.smoothstep(c.distance, 0.4, 1.1)
    const f = 0.5 + 0.5 * k
    c.minAzimuthAngle = minAz * f
    c.maxAzimuthAngle = maxAz * f
  })

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
      // looking up at the ceiling AP the camera stays below it, so it can never rise through the ceiling
      minPolarAngle={THREE.MathUtils.degToRad(stop.lookUp ? 96 : 58)}
      maxPolarAngle={THREE.MathUtils.degToRad(stop.lookUp ? 150 : 100)}
      minDistance={stop.minDistance ?? MIN_DISTANCE}
      maxDistance={maxDist}
      // wheel and pinch zoom toward the cursor / the point between the fingers
      dollyToCursor
      mouseButtons={{ left: ACTION.ROTATE, middle: ACTION.DOLLY, right: ACTION.NONE, wheel: ACTION.NONE }}
      touches={touchActions}
      polarRotateSpeed={coarsePointer ? 0 : 1}
      // a thumb swipe across the screen turns ~30°, not the whole arc
      azimuthRotateSpeed={coarsePointer ? 0.45 : 1}
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

/** Feeds the camera distance to the ambience so the fans get louder up close. */
function AmbienceDriver({ ambience, on }: { ambience: Ambience; on: boolean }) {
  const get = useThree((s) => s.get)
  const n = useRef(0)
  useFrame(() => {
    if (!on || n.current++ % 6) return
    const d = (get().controls as unknown as CameraControlsImpl | null)?.distance
    if (d != null) ambience.setProximity(THREE.MathUtils.clamp((2.4 - d) / 1.9, 0, 1))
  })
  return null
}

// 3D buttons and badges stay under the view bar and toggles (z-20) and the info card (z-30)
const HOTSPOT_Z: [number, number] = [19, 10]

// constant so React re-renders never re-apply it over the animated focus
const DOF_TARGET: [number, number, number] = [0, 1.35, -0.1]

/**
 * Camera-like focus: sharp around the subject, soft beyond it. On a new stop the focus trails
 * the camera move with a little extra blur, so the subject "racks" into focus like a film shot.
 * The effect is created once and animated (changing its props would rebuild it and hitch).
 */
function FocusPull({ stop }: { stop: Stop }) {
  const ref = useRef<DepthOfFieldEffect>(null)
  const focus = useMemo(() => new THREE.Vector3(...stop.target), []) // eslint-disable-line react-hooks/exhaustive-deps
  const goal = useMemo(() => new THREE.Vector3(), [])
  const s = useRef({ range: 2.5, pull: 0 })
  useEffect(() => {
    s.current.pull = 1
  }, [stop.id])
  useFrame((_, delta) => {
    const e = ref.current
    if (!e?.target) return
    const dt = Math.min(delta, 0.05)
    const overview = stop.id === "overview"
    goal.set(...stop.target)
    focus.lerp(goal, 1 - Math.exp(-dt * 2.4))
    e.target.copy(focus)
    s.current.range += ((overview ? 2.5 : 0.55) - s.current.range) * (1 - Math.exp(-dt * 3))
    e.cocMaterial.focusRange = s.current.range
    s.current.pull = Math.max(0, s.current.pull - dt / 1.3)
    const pull = s.current.pull * s.current.pull * (3 - 2 * s.current.pull) // smoothstep
    e.bokehScale = (overview ? 1 : 2.5) + pull * 3
  })
  return <DepthOfField ref={ref} target={DOF_TARGET} worldFocusRange={2.5} bokehScale={1} height={540} />
}

const BADGE_TONE: Record<BadgeTone, string> = {
  good: "border-[#3ee07a]/60 text-[#3ee07a]",
  bad: "border-[#ff6b5b]/70 text-[#ff7a6b]",
  warn: "border-[#ffb020]/70 text-[#ffb020] motion-safe:animate-pulse",
  idle: "border-white/20 text-white/60",
}

/** HA role badges on the blank panels just above FGT-01 and below FGT-02 while their stop is open. */
function HaBadges({ phase }: { phase: HaPhase }) {
  const badges = haBadges(phase)
  return (
    <>
      {mountedDevices()
        .filter((d) => badges[d.key])
        .map((d) => {
          const b = badges[d.key]
          const y = d.key === HA_PRIMARY ? d.centerY + U : d.centerY - U
          return (
            <Html key={d.key} position={[0.1, y, FACE_Z + 0.01]} center zIndexRange={HOTSPOT_Z} style={{ pointerEvents: "none" }}>
              <div className={`whitespace-nowrap rounded-full border bg-black/70 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] uppercase backdrop-blur ${BADGE_TONE[b.tone]}`}>
                {b.name} · {b.role}
              </div>
            </Html>
          )
        })}
    </>
  )
}

// right side of the console drawer's front panel (the ProLiant above it has its button on the left)
const KVM_HOTSPOT: [number, number, number] | null = (() => {
  const k = heroRack.find((x) => x.kind === "kvm")
  return k ? [0.15, slotCenterY(k.u, 1), FACE_Z + 0.03] : null
})()

// above the desk phone's screen module
const PHONE_HOTSPOT: [number, number, number] = (() => {
  const [x, y, z] = PHONE.position
  const r = PHONE.rotationY
  const lx = 0.07
  const lz = -0.03
  return [x + Math.cos(r) * lx + Math.sin(r) * lz, y + 0.2, z - Math.sin(r) * lx + Math.cos(r) * lz]
})()

// top-left corner of the upper monitor (left of the FortiAnalyzer title bar)
const MONITOR_HOTSPOT: [number, number, number] = (() => {
  const { position: p, rotationY: r, tops, width, height } = MONITORS
  const lx = -width / 2 + 0.03
  const lz = 0.045 + 0.03
  return [p[0] + Math.cos(r) * lx + Math.sin(r) * lz, tops[0] + height / 2 - 0.035, p[2] - Math.sin(r) * lx + Math.cos(r) * lz]
})()

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

/**
 * A 3D hotspot that hides itself while it sits under the bottom UI (phones: the view bar and the
 * Live traffic / Sound row; desktop: the view row), where it would be untappable and messy.
 */
function Spot({ position, children }: { position: [number, number, number]; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const v = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const el = ref.current
    if (!el) return
    v.set(...position).project(camera)
    const y = ((1 - v.y) / 2) * size.height
    const zone = size.width < size.height ? 130 : 72
    const want = y > size.height - zone ? "hidden" : "visible"
    if (el.style.visibility !== want) el.style.visibility = want
  })
  return (
    <Html position={position} center zIndexRange={HOTSPOT_Z}>
      <div ref={ref}>{children}</div>
    </Html>
  )
}

function Hotspots({ activeStop, onStop }: { activeStop: string; onStop: (id: string) => void }) {
  const [ax, ay, az] = ACCESS_POINT.position
  const [lx, ly, lz] = LAPTOP_SCREEN_CENTER
  return (
    <>
      {mountedDevices()
        .filter((d) => d.hotspot && d.cfg.hotspot)
        // the open console drawer's screen rises in front of the servers: hide their button meanwhile
        .filter((d) => !(activeStop === "kvm" && d.cfg.slide))
        .map((d) => {
          const [x, y] = facePoint(d.cfg, d.cfg.hotspot!.u, d.cfg.hotspot!.v)
          return (
            // a server pulled out on its rails takes its button with it
            <Spot key={d.key} position={[x, d.centerY + y, FACE_Z + 0.03 + (activeStop === d.key ? (d.cfg.slide ?? 0) : 0)]}>
              <HotspotButton label={`About ${d.cfg.name}`} active={activeStop === d.key} onClick={() => onStop(d.key)} />
            </Spot>
          )
        })}
      <Spot position={[ax, ay - 0.06, az]}>
        <HotspotButton label="About the Aruba access point" active={activeStop === "wireless"} onClick={() => onStop("wireless")} />
      </Spot>
      {KVM_HOTSPOT && (
        // travels out with the drawer when it's open
        <Spot position={[KVM_HOTSPOT[0], KVM_HOTSPOT[1], KVM_HOTSPOT[2] + (activeStop === "kvm" ? KVM.slide : 0)]}>
          <HotspotButton label="Open the rack console" glyph=">_" active={activeStop === "kvm"} onClick={() => onStop("kvm")} />
        </Spot>
      )}
      <Spot position={PHONE_HOTSPOT}>
        <HotspotButton label="Contact Mohammad" active={activeStop === "contact"} onClick={() => onStop("contact")} />
      </Spot>
      <Spot position={MONITOR_HOTSPOT}>
        <HotspotButton label="About the monitoring screens" active={activeStop === "monitoring"} onClick={() => onStop("monitoring")} />
      </Spot>
      <Spot position={[lx - 0.13, ly + 0.08, lz + 0.03]}>
        <HotspotButton label="Open the console terminal" glyph=">_" active={activeStop === "terminal"} onClick={() => onStop("terminal")} />
      </Spot>
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
  ha,
  haPhase,
  haLog,
  reframe,
  onZoomed,
  ao,
  coarse,
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
  ha: HaView
  haPhase: HaPhase
  haLog: NonNullable<HaStep["log"]>[]
  reframe: number
  onZoomed: (zoomed: boolean) => void
  ao: boolean
  coarse: boolean
}) {
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 5, 15]} />
      <Environment />
      <Lights quality={quality} />
      <CameraRig
        stop={stop}
        autoRotate={autoRotate && !capture}
        onInteract={onInteract}
        instant={capture}
        cardOpen={cardOpen}
        reframe={reframe}
        onZoomed={onZoomed}
      />
      {capture && <CaptureHook setStop={setStop} setTraffic={setTraffic} />}
      <Suspense fallback={null}>
        {/* the reflective floor renders the scene twice: desktop only (barely visible in phone framing) */}
        <Room quality={quality} reflections={quality === "high" && !coarse} />
        <OpenRack slots={heroRack} lowRes={quality === "low"} extendedKey={stop.extend ? stop.id : undefined}>
          <RackCabling quality={quality} animate={!reducedMotion} traffic={traffic} ledStates={ha.leds} paused={ha.paused} />
          <Laptop animate={!reducedMotion} onOpen={() => onStop("terminal")} highlighted={stop.id === "terminal"} />
          <Mug />
          <RearPower />
          <DeskProps />
        </OpenRack>
        <AccessPoint lowRes={quality === "low"} />
        <MonitorWall state={{ phase: haPhase, haLog }} quality={quality} />
        <DeskPhone />
        <Hotspots activeStop={stop.id} onStop={onStop} />
        {stop.id === HA_PRIMARY && <HaBadges phase={haPhase} />}
        <SceneReady onAssets={onAssets} onReady={onReady} />
      </Suspense>
      {quality === "high" ? (
        <EffectComposer multisampling={4} enableNormalPass={false}>
          {ao ? <N8AO halfRes aoRadius={0.35} distanceFalloff={0.6} intensity={2.2} color="#000000" /> : <></>}
          <FocusPull stop={stop} />
          <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={traffic ? 0.9 : 0.55} />
          {/* a real lens: faint colour fringing toward the edges, plus film grain */}
          <ChromaticAberration offset={LENS_FRINGE} radialModulation modulationOffset={0.3} />
          <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
          <Vignette offset={0.32} darkness={0.5} />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      ) : null}
    </>
  )
}

/**
 * Reality layer, in-canvas half: once the camera rests at a stop that has a photograph, glide
 * the last few millimetres onto the photo's exact camera, then tell the DOM to show it. Any
 * drag, zoom or stop change hides it again; after the visitor moves the camera it stays 3D
 * until the next stop (the camera is never pulled back against them).
 */
function RealityDriver({ stop, cardOpen, enabled, onShow }: { stop: Stop; cardOpen: boolean; enabled: boolean; onShow: (s: RealityShot | null) => void }) {
  const get = useThree((s) => s.get)
  const size = useThree((s) => s.size)
  const aspect = size.width / Math.max(1, size.height)
  const layout: RealityLayout | null = !cardOpen || !stop.cardId ? null : aspect < 1 ? "phone" : aspect > 1.2 ? "desktop" : null
  const shot = enabled ? realityShot(stop.id, layout, aspect) : null
  // a resize re-frames the stop (CameraRig), so it re-arms the photo too (phones resize while
  // scrolling as the address bar hides)
  const sizeKey = `${size.width}x${size.height}`

  useEffect(() => {
    onShow(null)
    const c = get().controls as unknown as CameraControlsImpl | null
    if (!c || !shot) return
    const img = new Image()
    img.src = shot.src
    let loaded = false
    img.decode().then(
      () => (loaded = true),
      () => {}
    )
    const pos = new THREE.Vector3(...shot.position)
    const dir = new THREE.Vector3(...shot.target).sub(pos).normalize()
    // orbit point: where the photo's view ray passes the stop's subject (keeps it inside the stop's fence)
    const tgt = pos.clone().addScaledVector(dir, new THREE.Vector3(...stop.target).sub(pos).dot(dir))
    const cam = get().camera
    const atShot = () => cam.position.distanceTo(pos) < 0.004
    let phase: "arriving" | "gliding" | "shown" | "off" = "arriving"
    const show = () => {
      if (phase !== "gliding" || !atShot()) return
      if (!loaded) return void setTimeout(show, 150)
      phase = "shown"
      onShow(shot)
    }
    const onRest = () => {
      if (phase === "arriving") {
        phase = "gliding"
        c.setFocalOffset(0, 0, 0, true)
        void c.setLookAt(pos.x, pos.y, pos.z, tgt.x, tgt.y, tgt.z, true)
        // already there: no movement, so no second rest event
        setTimeout(show, 80)
      } else show()
    }
    const off = () => {
      phase = "off"
      onShow(null)
    }
    // wheel zoom goes around camera-controls' gestures: hide once the camera leaves the photo's pose
    const onUpdate = () => phase === "shown" && !atShot() && off()
    c.addEventListener("rest", onRest)
    c.addEventListener("controlstart", off)
    c.addEventListener("update", onUpdate)
    return () => {
      c.removeEventListener("rest", onRest)
      c.removeEventListener("controlstart", off)
      c.removeEventListener("update", onUpdate)
      onShow(null)
    }
  }, [shot, stop, get, onShow, sizeKey])
  return null
}

/** Reality layer, DOM half: the photograph, height-fitted and centred like the camera's view. */
function RealityLayer({ shot }: { shot: RealityShot | null }) {
  const last = useRef<RealityShot | null>(null)
  if (shot) last.current = shot
  const s = last.current
  if (!s) return null
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[5] overflow-hidden transition-[opacity,filter] ease-out ${
        shot ? "opacity-100 blur-0 duration-[900ms]" : "opacity-0 blur-sm duration-200"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.src} alt="" className="absolute top-0 left-1/2 h-full max-w-none -translate-x-1/2" style={{ aspectRatio: s.aspect }} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// DOM wrapper

type StopGroup = "network" | "servers" | "ops"
const GROUP_LABEL: Record<StopGroup, string> = { network: "Network", servers: "Servers", ops: "Ops" }

/** Which phone-menu group a stop lives in; overview and contact stay as direct buttons. */
function stopGroup(s: Stop): StopGroup | null {
  if (s.id === "overview" || s.id === "contact") return null
  if (s.id === "kvm" || s.extend) return "servers"
  if (s.id === "wireless" || s.id === "monitoring" || s.terminal) return "ops"
  return "network"
}

const CHIP = "shrink-0 rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.1em] uppercase backdrop-blur-md transition-colors"
// bar buttons share the width equally; text a touch smaller so five fit a 360 px phone
const BAR_CHIP = "min-w-0 truncate rounded-full border px-1 py-2.5 text-center font-mono text-[10px] tracking-[0.06em] uppercase backdrop-blur-md transition-colors"
const chipTone = (on: boolean) => (on ? "border-[#00ffe7] bg-[#00ffe7] text-black" : "border-white/15 bg-black/55 text-white/85")

/**
 * Phones: five equal buttons that fit a 360 px screen (Overview, Network ▾, Servers ▾, Ops ▾,
 * Contact). A group opens a small menu above the bar; the group lights up while one of its
 * views is open.
 */
function PhoneNav({ stops, current, onPick, hidden }: { stops: Stop[]; current: string; onPick: (id: string) => void; hidden: boolean }) {
  const [open, setOpen] = useState<StopGroup | null>(null)
  useEffect(() => setOpen(null), [current, hidden])
  const curGroup = stopGroup(stops.find((s) => s.id === current) ?? stops[0])
  const items: ({ kind: "stop"; stop: Stop } | { kind: "group"; group: StopGroup })[] = []
  for (const s of stops) {
    const g = stopGroup(s)
    if (!g) items.push({ kind: "stop", stop: s })
    else if (!items.some((i) => i.kind === "group" && i.group === g)) items.push({ kind: "group", group: g })
  }
  // contact last, after the groups
  items.sort((a, b) => Number(a.kind === "stop" && a.stop.id === "contact") - Number(b.kind === "stop" && b.stop.id === "contact"))
  return (
    <nav
      aria-label="Rack views"
      // while a menu is open the bar rises above the view toggles (also z-20) so taps can't collide
      className={`absolute inset-x-0 bottom-0 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 transition-opacity md:hidden ${open ? "z-[25]" : "z-20"} ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {open && (
        <>
          {/* tap anywhere else to close the menu */}
          <button type="button" aria-label="Close menu" className="fixed inset-0 -z-10 cursor-default" onClick={() => setOpen(null)} />
          <div className="mb-2 flex flex-wrap justify-center gap-1.5 rounded-2xl border border-white/10 bg-[#0b0e11]/90 p-2 shadow-2xl backdrop-blur-md" role="menu" aria-label={GROUP_LABEL[open]}>
            {stops
              .filter((s) => stopGroup(s) === open)
              .map((s) => (
                <button key={s.id} type="button" role="menuitem" onClick={() => onPick(s.id)} className={`${CHIP} ${chipTone(current === s.id)}`}>
                  {s.label}
                </button>
              ))}
          </div>
        </>
      )}
      <div className="grid grid-cols-5 gap-1">
        {items.map((it) =>
          it.kind === "stop" ? (
            <button key={it.stop.id} type="button" onClick={() => onPick(it.stop.id)} className={`${BAR_CHIP} ${chipTone(current === it.stop.id)}`}>
              {it.stop.id === "overview" ? "Overview" : it.stop.label}
            </button>
          ) : (
            <button
              key={it.group}
              type="button"
              aria-expanded={open === it.group}
              aria-haspopup="menu"
              onClick={() => setOpen((o) => (o === it.group ? null : it.group))}
              className={`${BAR_CHIP} ${chipTone(curGroup === it.group)} ${open === it.group ? "ring-1 ring-[#00ffe7]/70" : ""}`}
            >
              {GROUP_LABEL[it.group]}
              <span aria-hidden className="ml-0.5 opacity-70">
                {open === it.group ? "▴" : "▾"}
              </span>
            </button>
          )
        )}
      </div>
    </nav>
  )
}


export interface RackSceneSignals {
  onEngine?: () => void
  /** the visitor started exploring (stop, hotspot or camera gesture) */
  onExplore?: () => void
  /** a view is open or the camera is zoomed in (true), or back at the overview (false) */
  onFocus?: (focused: boolean) => void
  onProgress?: (progress: number) => void
  onAssets?: () => void
  onReady?: () => void
}

export default function RackScene({
  quality,
  reducedMotion,
  signals,
  active = true,
  resetNonce = 0,
}: {
  quality: "high" | "low"
  reducedMotion: boolean
  signals?: RackSceneSignals
  /** false while the hero is scrolled out of view: the render loop pauses */
  active?: boolean
  /** bump to return to the overview framing (closes any view, undoes zoom) */
  resetNonce?: number
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
  const navStops = useMemo(() => stops.filter((s) => !s.hidden), [stops])
  // capture tooling: which stops exist (ids for lib/dc/reality.ts)
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("capture")) return
    ;(window as unknown as { __rackStops?: unknown }).__rackStops = navStops.map((s) => ({ id: s.id, label: s.label, card: !!s.cardId }))
  }, [navStops])
  const [stopId, setStopId] = useState("overview")
  const [cardOpen, setCardOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [traffic, setTraffic] = useState(false)
  const [sound, setSound] = useState(false)
  const ambience = useMemo(() => new Ambience(), [])
  useEffect(() => () => ambience.dispose(), [ambience])
  // silence while the hero is off screen or the tab is in the background
  useEffect(() => {
    const sync = () => ambience.setPaused(!active || document.hidden)
    sync()
    document.addEventListener("visibilitychange", sync)
    return () => document.removeEventListener("visibilitychange", sync)
  }, [ambience, active])
  const toggleSound = () => {
    if (sound) ambience.stop()
    else ambience.start() // inside the click: iOS only unlocks audio in a user gesture
    setSound(!sound)
  }
  const [interacted, setInteracted] = useState(false)
  // phones on the high tier cap the pixel ratio at 1.5 (plenty on a small screen); if the frame
  // rate drops, the first decline lowers sharpness, the second drops ambient occlusion
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  const [dpr, setDpr] = useState(quality === "high" ? (coarse ? 1.5 : 1.75) : 1.25)
  const [ao, setAo] = useState(true)
  const declines = useRef(0)
  const capture = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("capture")
  const terminalTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const stop = stops.find((s) => s.id === stopId) ?? stops[0]
  const onInteract = useCallback(() => {
    setInteracted(true)
    sigRef.current?.onExplore?.()
  }, [])

  const goTo = useCallback(
    (id: string) => {
      const s = stops.find((x) => x.id === id) ?? stops[0]
      setInteracted(true)
      sigRef.current?.onExplore?.()
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

  // "focused" = a view is open or the camera is zoomed in: the hero card steps aside meanwhile
  const [zoomedIn, setZoomedIn] = useState(false)
  const [reframe, setReframe] = useState(0)
  const focused = stopId !== "overview" || zoomedIn || terminalOpen
  useEffect(() => sigRef.current?.onFocus?.(focused), [focused])
  useEffect(() => {
    if (!resetNonce) return
    close()
    setReframe((n) => n + 1)
  }, [resetNonce, close])

  // HA failover demo: scripted timeline, traffic view on while it runs
  const [haPhase, setHaPhase] = useState<HaPhase>("idle")
  const [haLog, setHaLog] = useState<NonNullable<HaStep["log"]>[]>([])
  const [haRunning, setHaRunning] = useState(false)
  const haTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const haViewNow = useMemo(() => haView(haPhase), [haPhase])
  const trafficRef = useRef(traffic)
  trafficRef.current = traffic
  const trafficBefore = useRef(false)
  const haRunningRef = useRef(false)
  useEffect(() => () => haTimers.current.forEach(clearTimeout), [])
  const runFailover = useCallback(() => {
    haTimers.current.forEach(clearTimeout)
    goTo(HA_PRIMARY)
    setTerminalOpen(false)
    setHaLog([])
    setHaRunning(true)
    // remember the visitor's own traffic setting (not one this demo switched on)
    if (!haRunningRef.current) trafficBefore.current = trafficRef.current
    haRunningRef.current = true
    setTraffic(true)
    const last = HA_TIMELINE[HA_TIMELINE.length - 1].at
    haTimers.current = HA_TIMELINE.map((step) =>
      setTimeout(() => {
        if (step.phase) setHaPhase(step.phase)
        if (step.log) setHaLog((l) => [...l, step.log!])
      }, step.at * 1000 + 700)
    )
    haTimers.current.push(
      setTimeout(() => {
        setHaRunning(false)
        haRunningRef.current = false
        setTraffic(trafficBefore.current)
      }, (last + 2.5) * 1000 + 700)
    )
  }, [goTo])

  // "Follow a packet": glide to the fibre ports, then the film takes over the screen; the 3D
  // render loop pauses while the film fully covers it
  // photographs at rest (see RealityDriver); off in capture mode unless asked for with ?reality
  const [realShot, setRealShot] = useState<RealityShot | null>(null)
  const realityOn = !capture || (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("reality"))
  const [journeyRun, setJourneyRun] = useState(0)
  const [filmCovers, setFilmCovers] = useState(false)
  const startJourney = useCallback(() => {
    if (haRunningRef.current) return
    goTo("trace")
    setJourneyRun((n) => n + 1)
  }, [goTo])
  const onFilmCovers = useCallback(
    (covers: boolean) => {
      setFilmCovers(covers)
      // fading out: back to the overview underneath, so the film lands on the whole rack
      if (!covers) {
        close()
        setReframe((n) => n + 1)
      }
    },
    [close]
  )
  // the hero card's play button lives outside this component: it talks to us through window events
  useEffect(() => {
    const w = window as unknown as { __dcTrace?: boolean }
    w.__dcTrace = true
    window.dispatchEvent(new Event("dc:trace-ready"))
    const onTrace = () => startJourney()
    window.addEventListener("dc:trace", onTrace)
    return () => {
      delete w.__dcTrace
      window.removeEventListener("dc:trace", onTrace)
    }
  }, [startJourney])

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: BG }}>
      <Canvas
        dpr={[1, dpr]}
        frameloop={running && active && !filmCovers ? "always" : "never"}
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
        <PerformanceMonitor
          onDecline={() => {
            declines.current += 1
            if (declines.current === 1) setDpr(1)
            else setAo(false)
          }}
        />
        <AmbienceDriver ambience={ambience} on={sound} />
        <RealityDriver stop={stop} cardOpen={!!card} enabled={realityOn && !traffic && !haRunning} onShow={setRealShot} />
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
          ha={haViewNow}
          haPhase={haPhase}
          haLog={haLog}
          reframe={reframe}
          onZoomed={setZoomedIn}
          ao={ao}
          coarse={coarse}
        />
      </Canvas>
      <RealityLayer shot={realShot} />

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
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={sound}
          aria-label={sound ? "Mute data-centre sound" : "Play data-centre sound"}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] tracking-[0.15em] uppercase backdrop-blur-md transition-colors ${
            sound ? "border-[#5ff4ff] bg-[#5ff4ff]/15 text-[#5ff4ff]" : "border-white/15 bg-black/45 text-white/75 hover:border-white/40"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6v4h3l4 3V3L5 6H2z" fill="currentColor" stroke="none" />
            {sound ? <path d="M11.5 5.5a3.5 3.5 0 010 5M13.5 3.5a6.5 6.5 0 010 9" /> : <path d="M11.5 6l3.5 4M15 6l-3.5 4" />}
          </svg>
          Sound
        </button>
      </div>


      {/* camera stops: desktop shows every view in one row; phones group them (see PhoneNav) */}
      <PhoneNav stops={navStops} current={stop.id} onPick={goTo} hidden={!!card || terminalOpen} />
      <nav
        aria-label="Rack views"
        className={`absolute inset-x-0 bottom-0 z-20 overflow-x-auto px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 transition-opacity [scrollbar-width:none] max-md:hidden md:bottom-4 ${
          card || terminalOpen ? "max-md:pointer-events-none max-md:opacity-0" : "opacity-100"
        }`}
      >
        {/* w-max + mx-auto: centred when the chips fit, scrolls from the first chip when they don't */}
        <div className="mx-auto flex w-max gap-1.5">
        {navStops.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            className={`shrink-0 rounded-full border px-3.5 py-2 font-mono text-[11px] tracking-[0.1em] uppercase backdrop-blur-md transition-colors ${
              stop.id === s.id ? "border-[#00ffe7] bg-[#00ffe7] text-black" : "border-white/15 bg-black/45 text-white/80 hover:border-white/40"
            }`}
          >
            {s.label}
          </button>
        ))}
        </div>
      </nav>

      {!interacted && (
        <>
          <p className="pointer-events-none absolute inset-x-0 bottom-[5.5rem] z-10 px-6 text-center font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase max-md:hidden">
            Drag to look around · scroll to zoom · tap <span className="text-[#00ffe7]">+</span> for details
          </p>
          {/* left of the Live traffic / Sound toggles, a strip no 3D button ever reaches */}
          <p className="pointer-events-none absolute bottom-[4.75rem] left-4 z-10 w-[calc(100%-16.5rem)] font-mono text-[8.5px] leading-snug tracking-[0.1em] text-white/70 uppercase md:hidden">
            Swipe to turn · two fingers zoom &amp; move
          </p>
        </>
      )}

      <InfoCard card={card} onClose={close}>
        {stop.id === HA_PRIMARY && <TracePanel onRun={startJourney} disabled={haRunning} />}
        {stop.id === HA_PRIMARY && <FailoverPanel running={haRunning} log={haLog} onRun={runFailover} />}
        {stop.id === "contact" && <ContactPanel />}
      </InfoCard>
      <TerminalOverlay open={terminalOpen} onClose={close} onAction={(a) => (a === "trace" ? startJourney() : runFailover())} />
      <PacketJourney run={journeyRun} onCovered={onFilmCovers} />
    </div>
  )
}
