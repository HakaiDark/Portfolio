"use client"

import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { buildHeroCables, CABLE_COLORS, type CableColor, type CableSet, type Plug } from "@/lib/dc/cables"
import { FACE_Z, facePoint, mountedDevices } from "@/lib/dc/layout"
import { Leds, type LedPoint } from "./leds"

const PLUG_GEO: Record<Plug["kind"], THREE.BufferGeometry> = {
  rj45: new THREE.BoxGeometry(0.0118, 0.0088, 0.022),
  sfp: new THREE.BoxGeometry(0.0136, 0.0086, 0.026),
  lc: new THREE.BoxGeometry(0.0128, 0.0058, 0.022),
  qsfp: new THREE.BoxGeometry(0.0184, 0.0086, 0.03),
}

function plugMaterialKey(p: Plug) {
  if (p.kind === "sfp" || p.kind === "qsfp") return "metal"
  if (p.kind === "lc") return p.color === "fiberYellow" ? "lcBlue" : "lcBeige"
  return p.color
}

const PLUG_MATERIAL: Record<string, THREE.MeshStandardMaterialParameters> = {
  metal: { color: "#b9bcc0", metalness: 0.9, roughness: 0.3 },
  lcBlue: { color: "#2a62c9", roughness: 0.45 },
  lcBeige: { color: "#d8d2bf", roughness: 0.5 },
}

function useInstanceMatrices(ref: React.RefObject<THREE.InstancedMesh | null>, matrices: THREE.Matrix4[]) {
  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m))
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [ref, matrices])
}

function PlugInstances({ plugs, matKey }: { plugs: Plug[]; matKey: string }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const kind = plugs[0].kind
  const matrices = useMemo(() => plugs.map((p) => new THREE.Matrix4().makeTranslation(...p.position)), [plugs])
  useInstanceMatrices(ref, matrices)
  const mat = PLUG_MATERIAL[matKey] ?? { color: CABLE_COLORS[matKey as CableColor], roughness: 0.38, transparent: true, opacity: 0.92 }
  return (
    <instancedMesh ref={ref} args={[PLUG_GEO[kind], undefined, plugs.length]} castShadow>
      <meshStandardMaterial {...mat} />
    </instancedMesh>
  )
}

const tieGeo = new THREE.TorusGeometry(0.024, 0.0022, 6, 20)
tieGeo.rotateX(Math.PI / 2)
const sleeveGeo = new THREE.CylinderGeometry(0.0036, 0.0036, 0.016, 10, 1, true)

function Ties({ ties }: { ties: CableSet["ties"] }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const matrices = useMemo(() => ties.map((t) => new THREE.Matrix4().makeTranslation(...t)), [ties])
  useInstanceMatrices(ref, matrices)
  if (ties.length === 0) return null
  return (
    <instancedMesh ref={ref} args={[tieGeo, undefined, ties.length]}>
      <meshStandardMaterial color="#0c0c0d" roughness={0.9} />
    </instancedMesh>
  )
}

/** White printed label sleeves near each connector. */
function Sleeves({ sleeves }: { sleeves: CableSet["sleeves"] }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const matrices = useMemo(() => sleeves.map((s) => new THREE.Matrix4().compose(s.position, s.quaternion, new THREE.Vector3(1, 1, 1))), [sleeves])
  useInstanceMatrices(ref, matrices)
  if (sleeves.length === 0) return null
  return (
    <instancedMesh ref={ref} args={[sleeveGeo, undefined, sleeves.length]}>
      <meshStandardMaterial color="#eeeeea" roughness={0.45} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

const pulseGeo = new THREE.SphereGeometry(0.0055, 10, 8)
const PULSE_COLOR = { fiber: new THREE.Color("#5ff4ff").multiplyScalar(6), copper: new THREE.Color("#ff9a3c").multiplyScalar(5), console: new THREE.Color("#7fb8ff").multiplyScalar(5) }

/** "Live traffic" view: light pulses travelling along every cable. */
function PacketFlow({ paths }: { paths: CableSet["paths"] }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const pulses = useMemo(() => {
    const list: { path: number; t: number; speed: number; dir: 1 | -1 }[] = []
    paths.forEach((p, i) => {
      const len = p.curve.getLength()
      const n = p.kind === "fiber" ? 3 : p.kind === "console" ? 1 : 2
      for (let k = 0; k < n; k++) {
        const speed = (p.kind === "fiber" ? 0.55 : 0.32) * (0.75 + Math.random() * 0.5)
        list.push({ path: i, t: Math.random(), speed: speed / len, dir: Math.random() > 0.5 ? 1 : -1 })
      }
    })
    return list
  }, [paths])
  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    pulses.forEach((p, i) => mesh.setColorAt(i, PULSE_COLOR[paths[p.path].kind]))
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [pulses, paths])
  const m = useMemo(() => new THREE.Matrix4(), [])
  const pos = useMemo(() => new THREE.Vector3(), [])
  useFrame((_, dt) => {
    const mesh = ref.current
    if (!mesh) return
    pulses.forEach((p, i) => {
      p.t = (p.t + p.dir * p.speed * Math.min(dt, 0.05) + 1) % 1
      paths[p.path].curve.getPointAt(p.t, pos)
      m.makeTranslation(pos.x, pos.y, pos.z)
      mesh.setMatrixAt(i, m)
    })
    mesh.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[pulseGeo, undefined, pulses.length]} frustumCulled={false}>
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

const LED_COLORS = { green: "#3dff6e", amber: "#ffb020", blue: "#4aa3ff" } as const

export function RackCabling({ quality, animate, traffic }: { quality: "high" | "low"; animate: boolean; traffic: boolean }) {
  const cables = useMemo(() => buildHeroCables(quality), [quality])
  useEffect(() => () => cables.tubes.forEach((t) => t.geometry.dispose()), [cables])

  const plugGroups = useMemo(() => {
    const groups = new Map<string, Plug[]>()
    for (const p of cables.plugs) {
      const key = `${p.kind}|${plugMaterialKey(p)}`
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(p)
    }
    return [...groups.entries()]
  }, [cables])

  const leds = useMemo(() => {
    const out: Record<keyof typeof LED_COLORS, LedPoint[]> = { green: [], amber: [], blue: [] }
    for (const dev of mountedDevices()) {
      for (const p of dev.ports) {
        if (!p.led || !p.patched) continue
        // some 1G copper ports show amber link like real gear
        const color = p.kind === "rj45" && p.col % 5 === 3 ? "amber" : "green"
        out[color].push({ position: [p.led[0], dev.centerY + p.led[1], FACE_Z + 0.0009], mode: "link" })
      }
      for (const l of dev.cfg.leds ?? []) {
        const [x, y] = facePoint(dev.cfg, l.u, l.v)
        out[l.color].push({ position: [x, dev.centerY + y, FACE_Z + (dev.cfg.faceIncludesEars ? 0.0018 : 0.0009)], mode: l.mode })
      }
    }
    return out
  }, [])

  return (
    <group>
      {cables.tubes.map((t) => (
        <mesh key={t.color} geometry={t.geometry} castShadow={quality === "high"}>
          <meshStandardMaterial
            color={CABLE_COLORS[t.color]}
            roughness={t.color === "aqua" || t.color === "fiberYellow" ? 0.35 : 0.55}
            metalness={0}
            transparent={traffic}
            opacity={traffic ? 0.55 : 1}
          />
        </mesh>
      ))}
      {plugGroups.map(([key, plugs]) => (
        <PlugInstances key={key} plugs={plugs} matKey={key.split("|")[1]} />
      ))}
      <Ties ties={cables.ties} />
      <Sleeves sleeves={cables.sleeves} />
      {(Object.keys(LED_COLORS) as (keyof typeof LED_COLORS)[]).map((c) => (
        <Leds key={c} points={leds[c]} color={LED_COLORS[c]} animate={animate} />
      ))}
      {traffic && <PacketFlow paths={cables.paths} />}
    </group>
  )
}
