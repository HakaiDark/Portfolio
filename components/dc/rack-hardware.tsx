"use client"

import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { BODY_WIDTH, PANEL_WIDTH, RACK_UNITS, U, devices, unitY, type DeviceConfig, type RackSlot } from "@/lib/dc/devices"
import { FACE_Z, faceSize, slotCenterY } from "@/lib/dc/layout"
import { KvmDrawer } from "./kvm-drawer"
import {
  brushedRoughness,
  cableManagerFront,
  chassisSide,
  fanTop,
  heatsinkFins,
  patchPanelFront,
  railTexture,
  rearPanel,
  serverFront,
  serverInternals,
  upsFront,
} from "@/lib/dc/textures"

const RAIL_X = 0.2325 // half of the 465 mm hole-to-hole spacing
const EAR_W = (PANEL_WIDTH - BODY_WIDTH) / 2
const POWDER = { color: "#141518", roughness: 0.55, metalness: 0.45 }

// ---------------------------------------------------------------------------
// shared pieces

function Ears({ height, color, metalness = 0.5, roughness = 0.45 }: { height: number; color: string; metalness?: number; roughness?: number }) {
  return (
    <>
      {[-1, 1].map((s) => (
        <group key={s}>
          {/* front plate that bolts to the rail */}
          <mesh position={[s * (BODY_WIDTH / 2 + EAR_W / 2), 0, 0.00125]} castShadow>
            <boxGeometry args={[EAR_W, height - 0.001, 0.0025]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          </mesh>
          {/* side flange screwed to the chassis */}
          <mesh position={[s * (BODY_WIDTH / 2 + 0.0013), 0, -0.016]}>
            <boxGeometry args={[0.0025, height - 0.004, 0.032]} />
            <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
          </mesh>
        </group>
      ))}
    </>
  )
}

/** Chassis body with textured sides, top and rear. Faceplate is supplied by the caller. */
function Chassis({
  height,
  depth,
  color,
  units,
  topMap,
  seed,
}: {
  height: number
  depth: number
  color: string
  units: number
  topMap?: THREE.Texture
  seed: number
}) {
  const rough = brushedRoughness()
  const side = useMemo(() => chassisSide(color, depth, height), [color, depth, height])
  const rear = useMemo(() => rearPanel(units, seed), [units, seed])
  const zc = FACE_Z - depth / 2
  return (
    <group>
      <RoundedBox args={[BODY_WIDTH, height, depth]} radius={Math.min(0.003, height / 4)} smoothness={3} position={[0, 0, zc]} castShadow receiveShadow>
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.5} roughnessMap={rough} />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (BODY_WIDTH / 2 + 0.0002), 0, zc]} rotation={[0, (s * Math.PI) / 2, 0]}>
          <planeGeometry args={[depth * 0.985, height * 0.9]} />
          <meshStandardMaterial map={side} metalness={0.5} roughness={0.5} roughnessMap={rough} />
        </mesh>
      ))}
      {topMap && (
        <mesh position={[0, height / 2 + 0.0002, zc]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[BODY_WIDTH * 0.985, depth * 0.985]} />
          <meshStandardMaterial map={topMap} metalness={0.45} roughness={0.5} roughnessMap={rough} />
        </mesh>
      )}
      <mesh position={[0, 0, FACE_Z - depth - 0.0002]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[BODY_WIDTH * 0.99, height * 0.95]} />
        <meshStandardMaterial map={rear} metalness={0.35} roughness={0.6} />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------------------------
// devices

const dimmGeo = new THREE.BoxGeometry(0.0014, 0.031, 0.133)
const SHEET = 0.0012

/**
 * What a 1U server looks like pulled out on its rails with the lid off: open tray, drive cage,
 * fan wall, two CPU heatsinks with their DIMM banks, PSUs and riser cards at the back.
 * Only mounted while the server is out, so the closed rack costs nothing extra.
 */
function ServerInternals({ height, depth, color }: { height: number; depth: number; color: string }) {
  const board = useMemo(() => serverInternals(), [])
  const fan = useMemo(() => fanTop(), [])
  const fins = useMemo(() => heatsinkFins(), [])
  const floor = -height / 2 + SHEET
  // texture fractions -> tray coordinates (u across, f from the back (0) to the front (1))
  const x = (u: number) => (u - 0.5) * BODY_WIDTH
  const z = (f: number) => FACE_Z - depth * (1 - f)
  const dimmRef = useRef<THREE.InstancedMesh>(null)
  const dimms = useMemo(() => {
    const pts: [number, number][] = []
    for (const cx of [0.31, 0.69]) for (const side of [-1, 1]) for (let i = 0; i < 6; i++) pts.push([x(cx + side * (0.105 + i * 0.022)), z(0.465)])
    return pts
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    dimms.forEach(([dx, dz], i) => dimmRef.current?.setMatrixAt(i, m.makeTranslation(dx, floor + 0.004 + 0.0155, dz)))
    if (dimmRef.current) dimmRef.current.instanceMatrix.needsUpdate = true
  }, [dimms, floor])
  const wallH = height - 0.002
  return (
    <group>
      {/* open tray: floor, side walls, rear wall */}
      <mesh position={[0, floor - SHEET / 2, FACE_Z - depth / 2]} receiveShadow>
        <boxGeometry args={[BODY_WIDTH, SHEET, depth]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.5} />
      </mesh>
      <mesh position={[0, floor + 0.0002, FACE_Z - depth / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[BODY_WIDTH - 0.004, depth - 0.004]} />
        <meshStandardMaterial map={board} roughness={0.7} metalness={0.15} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (BODY_WIDTH / 2 - SHEET / 2), 0, FACE_Z - depth / 2]} castShadow receiveShadow>
          <boxGeometry args={[SHEET, wallH, depth]} />
          <meshStandardMaterial color={color} metalness={0.55} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 0, FACE_Z - depth + SHEET / 2]}>
        <boxGeometry args={[BODY_WIDTH, wallH, SHEET]} />
        <meshStandardMaterial color={color} metalness={0.55} roughness={0.5} />
      </mesh>
      {/* drive cage behind the bezel */}
      <mesh position={[0, 0, z(0.93)]} castShadow>
        <boxGeometry args={[BODY_WIDTH - 0.004, wallH, depth * 0.13]} />
        <meshStandardMaterial color="#2c2f34" metalness={0.5} roughness={0.55} />
      </mesh>
      {/* fan wall: 7 hot-plug modules */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[x(0.08 + i * 0.14), floor + 0.019, z(0.8)]} castShadow>
          <boxGeometry args={[0.056, 0.038, 0.04]} />
          <meshStandardMaterial attach="material-0" color="#141518" roughness={0.7} />
          <meshStandardMaterial attach="material-1" color="#141518" roughness={0.7} />
          <meshStandardMaterial attach="material-2" map={fan} roughness={0.6} />
          <meshStandardMaterial attach="material-3" color="#141518" roughness={0.7} />
          <meshStandardMaterial attach="material-4" color="#141518" roughness={0.7} />
          <meshStandardMaterial attach="material-5" color="#141518" roughness={0.7} />
        </mesh>
      ))}
      {/* CPU heatsinks */}
      {[0.31, 0.69].map((cx) => (
        <group key={cx} position={[x(cx), floor, z(0.465)]}>
          <mesh position={[0, 0.003, 0]}>
            <boxGeometry args={[0.07, 0.006, 0.066]} />
            <meshStandardMaterial color="#b8bcc1" metalness={0.85} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.006 + 0.012, 0]} castShadow>
            <boxGeometry args={[0.078, 0.024, 0.1]} />
            <meshStandardMaterial attach="material-0" color="#9ea2a7" metalness={0.8} roughness={0.35} />
            <meshStandardMaterial attach="material-1" color="#9ea2a7" metalness={0.8} roughness={0.35} />
            <meshStandardMaterial attach="material-2" map={fins} metalness={0.8} roughness={0.35} />
            <meshStandardMaterial attach="material-3" color="#9ea2a7" metalness={0.8} roughness={0.35} />
            <meshStandardMaterial attach="material-4" color="#c4c8cc" metalness={0.8} roughness={0.35} />
            <meshStandardMaterial attach="material-5" color="#c4c8cc" metalness={0.8} roughness={0.35} />
          </mesh>
        </group>
      ))}
      <instancedMesh ref={dimmRef} args={[dimmGeo, undefined, dimms.length]} castShadow>
        <meshStandardMaterial color="#17391f" roughness={0.55} metalness={0.2} />
      </instancedMesh>
      {/* two hot-plug PSUs at the back right, riser cards at the back left */}
      {[0.79, 0.915].map((u) => (
        <mesh key={u} position={[x(u), floor + 0.0185, z(0.13)]} castShadow>
          <boxGeometry args={[0.052, 0.037, depth * 0.26]} />
          <meshStandardMaterial color="#3a3d42" metalness={0.6} roughness={0.45} />
        </mesh>
      ))}
      {[0.1, 0.2].map((u) => (
        <mesh key={u} position={[x(u), floor + 0.019, z(0.2)]} castShadow>
          <boxGeometry args={[0.002, 0.03, depth * 0.24]} />
          <meshStandardMaterial color="#1f4d33" roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export function TexturedDevice({
  cfg,
  centerY,
  lowRes,
  extended = false,
}: {
  cfg: DeviceConfig
  centerY: number
  lowRes: boolean
  /** pulled out on its rails (devices with `slide`) */
  extended?: boolean
}) {
  const urls = [lowRes && cfg.textures.frontLow ? cfg.textures.frontLow : cfg.textures.front]
  if (cfg.textures.top) urls.push(cfg.textures.top)
  const [front, top] = useTexture(urls)
  useLayoutEffect(() => {
    for (const t of [front, top]) {
      if (!t) continue
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 8
      t.needsUpdate = true
    }
  }, [front, top])
  const [fw, fh] = faceSize(cfg)

  // rails: ease out/in; the lid fades as the server clears the rack, revealing the internals
  const slider = useRef<THREE.Group>(null)
  const lid = useRef<THREE.MeshStandardMaterial>(null)
  const progress = useRef(0)
  const [open, setOpen] = useState(false)
  useFrame((_, delta) => {
    if (!cfg.slide) return
    const goal = extended ? 1 : 0
    const p = progress.current
    if (Math.abs(goal - p) < 0.0005) return
    const next = goal > p ? Math.min(1, p + Math.min(delta, 0.05) / 0.9) : Math.max(0, p - Math.min(delta, 0.05) / 0.7)
    progress.current = next
    const eased = next * next * (3 - 2 * next)
    if (slider.current) slider.current.position.z = eased * cfg.slide
    if (lid.current) lid.current.opacity = THREE.MathUtils.clamp(1 - (next - 0.35) / 0.4, 0, 1)
    if ((next > 0) !== open) setOpen(next > 0)
  })

  return (
    <group position={[0, centerY, 0]}>
      <group ref={slider}>
        {open ? (
          <>
            <ServerInternals height={fh} depth={cfg.depth} color={cfg.chassisColor} />
            <mesh position={[0, fh / 2 - SHEET / 2, FACE_Z - cfg.depth / 2]}>
              <boxGeometry args={[BODY_WIDTH, SHEET, cfg.depth]} />
              <meshStandardMaterial ref={lid} color={cfg.chassisColor} metalness={0.55} roughness={0.5} transparent depthWrite={false} />
            </mesh>
            {/* inner rail members travel with the chassis */}
            {[-1, 1].map((s) => (
              <mesh key={s} position={[s * (BODY_WIDTH / 2 + 0.005), 0, FACE_Z - cfg.depth / 2 - 0.02]}>
                <boxGeometry args={[0.005, 0.018, cfg.depth]} />
                <meshStandardMaterial color="#b4b8bd" metalness={0.85} roughness={0.32} />
              </mesh>
            ))}
          </>
        ) : (
          <Chassis height={fh} depth={cfg.depth} color={cfg.chassisColor} units={cfg.rackUnits} topMap={top} seed={cfg.rackUnits * 13} />
        )}
        <mesh position={[0, 0, FACE_Z + (cfg.faceIncludesEars ? 0.0012 : 0.0003)]}>
          <planeGeometry args={[fw, fh]} />
          <meshStandardMaterial map={front} metalness={0.3} roughness={0.5} />
        </mesh>
        {!cfg.faceIncludesEars && <Ears height={fh} color={cfg.chassisColor} />}
      </group>
    </group>
  )
}

export function Shelf({ u }: { u: number }) {
  const y = unitY(u)
  const depth = 0.42
  return (
    <group>
      {/* front plate with ears */}
      <mesh position={[0, y + U / 2, 0.0012]} castShadow>
        <boxGeometry args={[PANEL_WIDTH, U - 0.0008, 0.0024]} />
        <meshStandardMaterial {...POWDER} />
      </mesh>
      {/* tray */}
      <mesh position={[0, y + U - 0.0015, -depth / 2 + 0.03]} castShadow receiveShadow>
        <boxGeometry args={[BODY_WIDTH, 0.003, depth]} />
        <meshStandardMaterial {...POWDER} roughness={0.6} />
      </mesh>
      {/* side lips */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (BODY_WIDTH / 2 - 0.0015), y + U / 2 + 0.004, -depth / 2 + 0.03]} castShadow>
          <boxGeometry args={[0.003, U * 0.8, depth]} />
          <meshStandardMaterial {...POWDER} />
        </mesh>
      ))}
    </group>
  )
}

export function Ups({ u, units }: { u: number; units: number }) {
  const { color, emissive } = useMemo(() => upsFront(units), [units])
  const h = units * U - 0.0008
  return (
    <group position={[0, slotCenterY(u, units), 0]}>
      <Chassis height={h} depth={0.66} color="#1a1b1d" units={units} seed={91} />
      <mesh position={[0, 0, FACE_Z + 0.006]} castShadow>
        <boxGeometry args={[PANEL_WIDTH, h, 0.012]} />
        <meshStandardMaterial map={color} emissiveMap={emissive} emissive="#ffffff" emissiveIntensity={2.4} metalness={0.25} roughness={0.6} />
      </mesh>
    </group>
  )
}

export function GenericServer({ u, units, variant }: { u: number; units: number; variant: number }) {
  const { color, emissive } = useMemo(() => serverFront(units, variant), [units, variant])
  const h = units * U - 0.0008
  const bezel = ["#1d1f23", "#2a2d31", "#15171a"][variant % 3]
  return (
    <group position={[0, slotCenterY(u, units), 0]}>
      <Chassis height={h} depth={0.72} color="#5d6066" units={units} seed={u * 7 + variant} />
      <mesh position={[0, 0, FACE_Z + 0.004]}>
        <boxGeometry args={[BODY_WIDTH, h, 0.008]} />
        <meshStandardMaterial
          attach="material"
          map={color}
          emissiveMap={emissive}
          emissive="#ffffff"
          emissiveIntensity={2.2}
          metalness={0.35}
          roughness={0.6}
        />
      </mesh>
      <Ears height={h} color={bezel} />
    </group>
  )
}

export function PatchPanel({ u, ports }: { u: number; ports: number }) {
  const map = useMemo(() => patchPanelFront(ports), [ports])
  return (
    <group position={[0, slotCenterY(u, 1), 0]}>
      <mesh position={[0, 0, 0.0015]} castShadow>
        <boxGeometry args={[PANEL_WIDTH, U - 0.0008, 0.003]} />
        <meshStandardMaterial map={map} metalness={0.4} roughness={0.55} />
      </mesh>
      {/* punch-down block behind */}
      <mesh position={[0, -0.002, -0.05]}>
        <boxGeometry args={[0.42, 0.03, 0.1]} />
        <meshStandardMaterial {...POWDER} />
      </mesh>
    </group>
  )
}

export function CableManager({ u }: { u: number }) {
  const map = useMemo(() => cableManagerFront(), [])
  const fingers = useMemo(() => Array.from({ length: 15 }, (_, i) => -0.2 + i * (0.4 / 14)), [])
  return (
    <group position={[0, slotCenterY(u, 1), 0]}>
      <mesh position={[0, 0, 0.0015]} castShadow>
        <boxGeometry args={[PANEL_WIDTH, U - 0.0008, 0.003]} />
        <meshStandardMaterial map={map} metalness={0.3} roughness={0.7} />
      </mesh>
      {/* plastic fingers sticking forward */}
      {fingers.map((x) => (
        <mesh key={x} position={[x, 0, 0.025]} castShadow>
          <boxGeometry args={[0.006, U * 0.78, 0.046]} />
          <meshStandardMaterial color="#121315" roughness={0.75} />
        </mesh>
      ))}
      {/* cover lip */}
      <mesh position={[0, U * 0.41, 0.025]}>
        <boxGeometry args={[0.43, 0.0025, 0.048]} />
        <meshStandardMaterial color="#17181b" roughness={0.7} />
      </mesh>
    </group>
  )
}

export function BlankPanel({ u, units }: { u: number; units: number }) {
  const h = units * U - 0.0008
  return (
    <group position={[0, slotCenterY(u, units), 0]}>
      <mesh position={[0, 0, 0.001]} receiveShadow>
        <boxGeometry args={[PANEL_WIDTH, h, 0.0016]} />
        <meshStandardMaterial {...POWDER} roughness={0.62} />
      </mesh>
      {/* pressed stiffening rib */}
      <mesh position={[0, 0, 0.0019]}>
        <boxGeometry args={[0.4, h * 0.45, 0.0008]} />
        <meshStandardMaterial {...POWDER} roughness={0.5} />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------------------------
// screws: one instanced draw for every screw in the rack

const screwHead = new THREE.CylinderGeometry(0.0042, 0.0042, 0.0022, 14)
screwHead.rotateX(Math.PI / 2)
const screwSlot = new THREE.BoxGeometry(0.0055, 0.0009, 0.0006)

function slotUnits(s: RackSlot) {
  if (s.kind === "device") return devices[s.id]?.rackUnits ?? 1
  if (s.kind === "server" || s.kind === "blank" || s.kind === "ups") return s.units
  return 1
}

function Screws({ slots }: { slots: RackSlot[] }) {
  const headRef = useRef<THREE.InstancedMesh>(null)
  const slotRef = useRef<THREE.InstancedMesh>(null)
  const points = useMemo(() => {
    const pts: [number, number, number, number][] = []
    for (const s of slots) {
      // photos that include the ears already show their own fasteners
      if (s.kind === "device" && devices[s.id]?.faceIncludesEars) continue
      const n = slotUnits(s)
      for (let k = 0; k < n; k++) {
        const y = unitY(s.u + k) + U * 0.5
        const z = s.kind === "ups" ? 0.0135 : s.kind === "device" || s.kind === "server" ? 0.0036 : 0.0035
        for (const side of [-1, 1]) pts.push([side * RAIL_X, y, z, Math.random() * Math.PI])
      }
    }
    return pts
  }, [slots])
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const e = new THREE.Euler()
    points.forEach(([x, y, z, rot], i) => {
      m.makeTranslation(x, y, z)
      headRef.current?.setMatrixAt(i, m)
      for (let k = 0; k < 2; k++) {
        e.set(0, 0, rot + (k * Math.PI) / 2)
        q.setFromEuler(e)
        m.compose(new THREE.Vector3(x, y, z + 0.0011), q, new THREE.Vector3(1, 1, 1))
        slotRef.current?.setMatrixAt(i * 2 + k, m)
      }
    })
    if (headRef.current) headRef.current.instanceMatrix.needsUpdate = true
    if (slotRef.current) slotRef.current.instanceMatrix.needsUpdate = true
  }, [points])
  return (
    <>
      <instancedMesh ref={headRef} args={[screwHead, undefined, points.length]}>
        <meshStandardMaterial color="#9a9da2" metalness={0.9} roughness={0.28} />
      </instancedMesh>
      <instancedMesh ref={slotRef} args={[screwSlot, undefined, points.length * 2]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </instancedMesh>
    </>
  )
}

// ---------------------------------------------------------------------------
// the open-frame rack

const RACK_DEPTH = 0.8
const RAIL_TOP = unitY(RACK_UNITS + 1)

function Post({ x, z, front }: { x: number; z: number; front: boolean }) {
  const map = useMemo(() => railTexture(RACK_UNITS), [])
  const h = RAIL_TOP - 0.03
  const side = Math.sign(x)
  return (
    <group position={[x, (RAIL_TOP + 0.03) / 2, z]}>
      {/* mounting face with cage-nut holes */}
      <mesh position={[0, 0, front ? -0.00125 : 0.00125]} castShadow receiveShadow>
        <boxGeometry args={[0.032, h, 0.0025]} />
        <meshStandardMaterial map={map} metalness={0.45} roughness={0.55} />
      </mesh>
      {/* outer web of the channel */}
      <mesh position={[side * 0.0165, 0, front ? -0.03 : 0.03]} castShadow>
        <boxGeometry args={[0.003, h, 0.06]} />
        <meshStandardMaterial {...POWDER} />
      </mesh>
    </group>
  )
}

function VerticalManager({ side }: { side: 1 | -1 }) {
  const h = RAIL_TOP - 0.06
  const ys = useMemo(() => Array.from({ length: RACK_UNITS }, (_, i) => unitY(i + 1) + U / 2), [])
  const fingerGeo = useMemo(() => new THREE.BoxGeometry(0.008, U * 0.55, 0.095), [])
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    let i = 0
    for (const y of ys)
      for (const fx of [0.272, 0.339]) {
        m.makeTranslation(side * fx, y, 0.03)
        ref.current?.setMatrixAt(i++, m)
      }
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true
  }, [ys, side])
  return (
    <group>
      <mesh position={[side * 0.344, h / 2 + 0.04, -0.03]} castShadow receiveShadow>
        <boxGeometry args={[0.003, h, 0.17]} />
        <meshStandardMaterial {...POWDER} />
      </mesh>
      <mesh position={[side * 0.306, h / 2 + 0.04, -0.075]} receiveShadow>
        <boxGeometry args={[0.078, h, 0.003]} />
        <meshStandardMaterial {...POWDER} />
      </mesh>
      <instancedMesh ref={ref} args={[fingerGeo, undefined, ys.length * 2]} castShadow>
        <meshStandardMaterial color="#121315" roughness={0.75} />
      </instancedMesh>
    </group>
  )
}

export function OpenRack({
  slots,
  managers = true,
  lowRes = false,
  extendedKey,
  children,
}: {
  slots: RackSlot[]
  managers?: boolean
  lowRes?: boolean
  /** mounted-device key (e.g. "proliant-dl360@20") currently pulled out on its rails, or "kvm" */
  extendedKey?: string
  children?: React.ReactNode
}) {
  const topY = RAIL_TOP + 0.02
  return (
    <group>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Post x={s * (RAIL_X + 0.004)} z={0} front />
          <Post x={s * (RAIL_X + 0.004)} z={-RACK_DEPTH} front={false} />
          {/* top and bottom side rails */}
          {[topY, 0.03].map((y) => (
            <mesh key={y} position={[s * (RAIL_X + 0.02), y, -RACK_DEPTH / 2]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.04, RACK_DEPTH + 0.06]} />
              <meshStandardMaterial {...POWDER} />
            </mesh>
          ))}
          {managers && <VerticalManager side={s as 1 | -1} />}
        </group>
      ))}
      {/* front/back cross members */}
      {[0.02, -RACK_DEPTH - 0.02].map((z) =>
        [topY, 0.03].map((y) => (
          <mesh key={`${z}-${y}`} position={[0, y, z]} castShadow receiveShadow>
            <boxGeometry args={[2 * RAIL_X + 0.08, 0.04, 0.04]} />
            <meshStandardMaterial {...POWDER} />
          </mesh>
        ))
      )}
      {/* floor plates */}
      {[-1, 1].map((s) => (
        <mesh key={`f${s}`} position={[s * (RAIL_X + 0.03), 0.004, -RACK_DEPTH / 2]} receiveShadow>
          <boxGeometry args={[0.1, 0.008, RACK_DEPTH + 0.12]} />
          <meshStandardMaterial {...POWDER} />
        </mesh>
      ))}

      {slots.map((s, i) => {
        switch (s.kind) {
          case "device": {
            const cfg = devices[s.id]
            return cfg ? (
              <TexturedDevice key={i} cfg={cfg} centerY={slotCenterY(s.u, cfg.rackUnits)} lowRes={lowRes} extended={extendedKey === `${s.id}@${s.u}`} />
            ) : null
          }
          case "patch-panel":
            return <PatchPanel key={i} u={s.u} ports={s.ports} />
          case "cable-manager":
            return <CableManager key={i} u={s.u} />
          case "server":
            return <GenericServer key={i} u={s.u} units={s.units} variant={s.variant} />
          case "blank":
            return <BlankPanel key={i} u={s.u} units={s.units} />
          case "shelf":
            return <Shelf key={i} u={s.u} />
          case "ups":
            return <Ups key={i} u={s.u} units={s.units} />
          case "kvm":
            return <KvmDrawer key={i} u={s.u} open={extendedKey === "kvm"} />
        }
      })}
      <Screws slots={slots} />
      {children}
    </group>
  )
}
