"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import { RoundedBox, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { BODY_WIDTH, PANEL_WIDTH, RACK_UNITS, U, devices, unitY, type DeviceConfig, type RackSlot } from "@/lib/dc/devices"
import { FACE_Z, faceSize, slotCenterY } from "@/lib/dc/layout"
import {
  brushedRoughness,
  cableManagerFront,
  chassisSide,
  patchPanelFront,
  railTexture,
  rearPanel,
  serverFront,
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

export function TexturedDevice({ cfg, centerY, lowRes }: { cfg: DeviceConfig; centerY: number; lowRes: boolean }) {
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
  return (
    <group position={[0, centerY, 0]}>
      <Chassis height={fh} depth={cfg.depth} color={cfg.chassisColor} units={cfg.rackUnits} topMap={top} seed={cfg.rackUnits * 13} />
      <mesh position={[0, 0, FACE_Z + 0.0003]}>
        <planeGeometry args={[fw, fh]} />
        <meshStandardMaterial map={front} metalness={0.3} roughness={0.55} />
      </mesh>
      <Ears height={fh} color={cfg.chassisColor} />
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
  if (s.kind === "server" || s.kind === "blank") return s.units
  return 1
}

function Screws({ slots }: { slots: RackSlot[] }) {
  const headRef = useRef<THREE.InstancedMesh>(null)
  const slotRef = useRef<THREE.InstancedMesh>(null)
  const points = useMemo(() => {
    const pts: [number, number, number, number][] = []
    for (const s of slots) {
      const n = slotUnits(s)
      for (let k = 0; k < n; k++) {
        const y = unitY(s.u + k) + U * 0.5
        const z = s.kind === "patch-panel" || s.kind === "cable-manager" || s.kind === "blank" ? 0.0035 : 0.0036
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
  children,
}: {
  slots: RackSlot[]
  managers?: boolean
  lowRes?: boolean
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
            return cfg ? <TexturedDevice key={i} cfg={cfg} centerY={slotCenterY(s.u, cfg.rackUnits)} lowRes={lowRes} /> : null
          }
          case "patch-panel":
            return <PatchPanel key={i} u={s.u} ports={s.ports} />
          case "cable-manager":
            return <CableManager key={i} u={s.u} />
          case "server":
            return <GenericServer key={i} u={s.u} units={s.units} variant={s.variant} />
          case "blank":
            return <BlankPanel key={i} u={s.u} units={s.units} />
        }
      })}
      <Screws slots={slots} />
      {children}
    </group>
  )
}
