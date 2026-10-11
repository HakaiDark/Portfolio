"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import { MeshReflectorMaterial } from "@react-three/drei"
import * as THREE from "three"
import type { RackSlot } from "@/lib/dc/devices"
import { assetLabel, cabinetInterior, floorTile, perforationAlpha } from "@/lib/dc/textures"
import { OpenRack } from "./rack-hardware"

const CAB_W = 0.6
const CAB_H = 2.0
const CAB_D = 1.07
const AISLE_FRONT_Z = 2.7 // front face of the opposite row
export const CEILING_Y = 3.1

interface CabinetPlacement {
  x: number
  z: number
  ry: number
  variant: number
}

function useCabinets(quality: "high" | "low") {
  return useMemo(() => {
    const span = quality === "high" ? 7.5 : 4.5
    const list: CabinetPlacement[] = []
    let v = 0
    // hero row (fronts at z = 0), leaving room for the three open racks
    for (let x = 1.42; x <= span; x += CAB_W + 0.004) {
      list.push({ x, z: -CAB_D / 2, ry: 0, variant: v++ % 3 })
      list.push({ x: -x, z: -CAB_D / 2, ry: 0, variant: v++ % 3 })
    }
    // opposite row, facing back toward the hero rack
    for (let x = -span; x <= span; x += CAB_W + 0.004) {
      list.push({ x, z: AISLE_FRONT_Z + CAB_D / 2, ry: Math.PI, variant: v++ % 3 })
    }
    return list
  }, [quality])
}

function InstancedPart({
  placements,
  geometry,
  offset,
  children,
  castShadow,
}: {
  placements: CabinetPlacement[]
  geometry: THREE.BufferGeometry
  offset: [number, number, number]
  children: React.ReactNode
  castShadow?: boolean
}) {
  const ref = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    const r = new THREE.Matrix4()
    const o = new THREE.Matrix4().makeTranslation(...offset)
    placements.forEach((p, i) => {
      m.makeTranslation(p.x, 0, p.z).multiply(r.makeRotationY(p.ry)).multiply(o)
      ref.current?.setMatrixAt(i, m)
    })
    if (ref.current) {
      ref.current.instanceMatrix.needsUpdate = true
      ref.current.computeBoundingSphere()
    }
  }, [placements, offset])
  if (placements.length === 0) return null
  return (
    <instancedMesh ref={ref} args={[geometry, undefined, placements.length]} castShadow={castShadow} receiveShadow>
      {children}
    </instancedMesh>
  )
}

const bodyGeo = new THREE.BoxGeometry(CAB_W - 0.004, CAB_H, CAB_D)
const doorGeo = new THREE.PlaneGeometry(CAB_W - 0.06, CAB_H - 0.12)
const interiorGeo = new THREE.PlaneGeometry(CAB_W - 0.08, CAB_H - 0.14)
const handleGeo = new THREE.BoxGeometry(0.018, 0.16, 0.02)
const labelGeo = new THREE.PlaneGeometry(0.09, 0.022)

function Cabinets({ quality }: { quality: "high" | "low" }) {
  const placements = useCabinets(quality)
  const perf = useMemo(() => {
    const t = perforationAlpha().clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(9, 30)
    t.needsUpdate = true
    return t
  }, [])
  const interiors = useMemo(() => [0, 1, 2].map((s) => cabinetInterior(100 + s)), [])
  const label = useMemo(() => assetLabel("DC1-R"), [])
  const doorZ = CAB_D / 2 + 0.012
  return (
    <group>
      <InstancedPart placements={placements} geometry={bodyGeo} offset={[0, CAB_H / 2, 0]} castShadow={quality === "high"}>
        <meshStandardMaterial color="#141619" metalness={0.45} roughness={0.55} />
      </InstancedPart>
      {[0, 1, 2].map((variant) => (
        <InstancedPart
          key={variant}
          placements={placements.filter((p) => p.variant === variant)}
          geometry={interiorGeo}
          offset={[0, CAB_H / 2, CAB_D / 2 + 0.002]}
        >
          <meshStandardMaterial
            map={interiors[variant].color}
            emissiveMap={interiors[variant].emissive}
            emissive="#ffffff"
            emissiveIntensity={3}
            roughness={0.7}
          />
        </InstancedPart>
      ))}
      <InstancedPart placements={placements} geometry={doorGeo} offset={[0, CAB_H / 2, doorZ]}>
        <meshStandardMaterial color="#1b1d21" metalness={0.6} roughness={0.42} alphaMap={perf} alphaTest={0.5} side={THREE.DoubleSide} />
      </InstancedPart>
      <InstancedPart placements={placements} geometry={handleGeo} offset={[CAB_W / 2 - 0.05, 1.05, doorZ + 0.01]}>
        <meshStandardMaterial color="#8d9196" metalness={0.85} roughness={0.3} />
      </InstancedPart>
      <InstancedPart placements={placements} geometry={labelGeo} offset={[0, CAB_H - 0.03, doorZ + 0.002]}>
        <meshStandardMaterial map={label} roughness={0.7} />
      </InstancedPart>
    </group>
  )
}

function Floor({ quality }: { quality: "high" | "low" }) {
  const plain = useMemo(() => {
    const t = floorTile(false).clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(30, 30)
    t.needsUpdate = true
    return t
  }, [])
  const perf = useMemo(() => {
    const t = floorTile(true).clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(30, 2)
    t.needsUpdate = true
    return t
  }, [])
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        {quality === "high" ? (
          // satin vinyl tiles: soft, blurred reflections of the racks and lights
          <MeshReflectorMaterial
            map={plain}
            resolution={512}
            blur={[400, 120]}
            mixBlur={1}
            mixStrength={0.9}
            mixContrast={1}
            depthScale={1}
            minDepthThreshold={0.6}
            maxDepthThreshold={1.6}
            roughness={0.55}
            metalness={0.05}
            mirror={0}
          />
        ) : (
          <meshStandardMaterial map={plain} roughness={0.6} metalness={0.05} />
        )}
      </mesh>
      {/* perforated cold-aisle tiles: two tiles wide in front of the racks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0015, 0.6]} receiveShadow>
        <planeGeometry args={[18, 1.2]} />
        <meshStandardMaterial map={perf} roughness={0.55} metalness={0.15} />
      </mesh>
    </group>
  )
}

function Overhead({ quality }: { quality: "high" | "low" }) {
  const rungRef = useRef<THREE.InstancedMesh>(null)
  const rungs = useMemo(() => {
    const xs: number[] = []
    for (let x = -8; x <= 8; x += 0.3) xs.push(x)
    return xs
  }, [])
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    rungs.forEach((x, i) => {
      m.makeTranslation(x, 2.36, -0.32)
      rungRef.current?.setMatrixAt(i, m)
    })
    if (rungRef.current) rungRef.current.instanceMatrix.needsUpdate = true
  }, [rungs])
  const fixtures = useMemo(() => {
    const xs: number[] = []
    for (let x = -7; x <= 7; x += 2.4) xs.push(x)
    return xs
  }, [])
  const rowSign = useMemo(() => assetLabel("ROW C · CORE"), [])
  return (
    <group>
      {/* ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, CEILING_Y, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#9aa0a6" roughness={0.9} />
      </mesh>
      {/* fire suppression: red sprinkler main with pendant heads */}
      <mesh position={[0, 2.93, 1.75]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.024, 0.024, 16, 12]} />
        <meshStandardMaterial color="#a8241c" roughness={0.45} metalness={0.3} />
      </mesh>
      {fixtures.map((x) => (
        <group key={`spr${x}`} position={[x + 0.6, 2.88, 1.75]}>
          <mesh>
            <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
            <meshStandardMaterial color="#a8241c" roughness={0.45} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.016, 0.006, 0.02, 10]} />
            <meshStandardMaterial color="#c9a24a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {/* smoke detectors */}
      {fixtures.map((x) => (
        <mesh key={`smk${x}`} position={[x - 0.9, CEILING_Y - 0.015, 0.9]}>
          <cylinderGeometry args={[0.06, 0.065, 0.03, 24]} />
          <meshStandardMaterial color="#eeeeec" roughness={0.6} />
        </mesh>
      ))}
      {/* row sign hanging from the ladder */}
      <group position={[-1.75, 2.18, 0.08]}>
        <mesh>
          <boxGeometry args={[0.52, 0.13, 0.006]} />
          <meshStandardMaterial map={rowSign} roughness={0.6} />
        </mesh>
        {[-0.2, 0.2].map((cx) => (
          <mesh key={cx} position={[cx, 0.12, 0]}>
            <cylinderGeometry args={[0.002, 0.002, 0.11, 6]} />
            <meshStandardMaterial color="#8a8d91" metalness={0.8} roughness={0.4} />
          </mesh>
        ))}
      </group>
      {/* cable ladder above the hero row */}
      {[-0.47, -0.17].map((z) => (
        <mesh key={z} position={[0, 2.37, z]} castShadow={quality === "high"}>
          <boxGeometry args={[16, 0.05, 0.006]} />
          <meshStandardMaterial color="#2b2e33" metalness={0.6} roughness={0.45} />
        </mesh>
      ))}
      <instancedMesh ref={rungRef} args={[undefined, undefined, rungs.length]}>
        <boxGeometry args={[0.012, 0.012, 0.3]} />
        <meshStandardMaterial color="#2b2e33" metalness={0.6} roughness={0.45} />
      </instancedMesh>
      {/* yellow fibre runner + drop-out above the hero rack */}
      <mesh position={[0, 2.62, -0.05]} castShadow={quality === "high"}>
        <boxGeometry args={[16, 0.1, 0.3]} />
        <meshStandardMaterial color="#e8b90f" roughness={0.5} />
      </mesh>
      <mesh position={[0.29, 2.45, -0.05]}>
        <cylinderGeometry args={[0.035, 0.05, 0.26, 16, 1, true]} />
        <meshStandardMaterial color="#e8b90f" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* threaded rods holding the runner */}
      {fixtures.map((x) => (
        <mesh key={`rod${x}`} position={[x + 1.2, 2.88, -0.05]}>
          <cylinderGeometry args={[0.005, 0.005, 0.44, 6]} />
          <meshStandardMaterial color="#8a8d91" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
      {/* linear LED fixtures over the aisle */}
      {fixtures.map((x) => (
        <group key={x} position={[x, CEILING_Y - 0.06, 1.35]}>
          <mesh>
            <boxGeometry args={[1.5, 0.05, 0.12]} />
            <meshStandardMaterial color="#d7d9dc" metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.026, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.45, 0.09]} />
            <meshBasicMaterial color={[3.2, 3.3, 3.5]} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

const LEFT_RACK: RackSlot[] = [
  { kind: "patch-panel", u: 38, ports: 24 },
  { kind: "patch-panel", u: 37, ports: 24 },
  { kind: "cable-manager", u: 36 },
  { kind: "patch-panel", u: 35, ports: 24 },
  { kind: "patch-panel", u: 34, ports: 24 },
  { kind: "cable-manager", u: 33 },
  { kind: "blank", u: 30, units: 3 },
  { kind: "server", u: 26, units: 2, variant: 1 },
  { kind: "server", u: 24, units: 2, variant: 1 },
  { kind: "blank", u: 20, units: 4 },
]

const RIGHT_RACK: RackSlot[] = [
  { kind: "blank", u: 38, units: 2 },
  { kind: "server", u: 36, units: 1, variant: 0 },
  { kind: "server", u: 35, units: 1, variant: 0 },
  { kind: "server", u: 34, units: 1, variant: 2 },
  { kind: "server", u: 32, units: 2, variant: 2 },
  { kind: "server", u: 30, units: 2, variant: 0 },
  { kind: "blank", u: 28, units: 2 },
  { kind: "server", u: 26, units: 2, variant: 1 },
  { kind: "server", u: 24, units: 2, variant: 1 },
  { kind: "blank", u: 22, units: 2 },
]

export function Room({ quality }: { quality: "high" | "low" }) {
  return (
    <group>
      <Floor quality={quality} />
      <Cabinets quality={quality} />
      <Overhead quality={quality} />
      <group position={[-0.74, 0, 0]}>
        <OpenRack slots={LEFT_RACK} managers={false} />
      </group>
      <group position={[0.74, 0, 0]}>
        <OpenRack slots={RIGHT_RACK} managers={false} />
      </group>
    </group>
  )
}
