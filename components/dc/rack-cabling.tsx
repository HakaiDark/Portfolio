"use client"

import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { buildHeroCables, CABLE_COLORS, type CableColor, type Plug } from "@/lib/dc/cables"
import { FACE_Z, mountedDevices } from "@/lib/dc/layout"
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

function PlugInstances({ plugs, matKey }: { plugs: Plug[]; matKey: string }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const kind = plugs[0].kind
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    plugs.forEach((p, i) => {
      m.makeTranslation(...p.position)
      ref.current?.setMatrixAt(i, m)
    })
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true
  }, [plugs])
  const mat = PLUG_MATERIAL[matKey] ?? { color: CABLE_COLORS[matKey as CableColor], roughness: 0.38, transparent: true, opacity: 0.92 }
  return (
    <instancedMesh ref={ref} args={[PLUG_GEO[kind], undefined, plugs.length]} castShadow>
      <meshStandardMaterial {...mat} />
    </instancedMesh>
  )
}

const tieGeo = new THREE.TorusGeometry(0.024, 0.0022, 6, 20)
tieGeo.rotateX(Math.PI / 2)

export function RackCabling({ quality, animate }: { quality: "high" | "low"; animate: boolean }) {
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

  const tieRef = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    cables.ties.forEach((t, i) => {
      m.makeTranslation(...t)
      tieRef.current?.setMatrixAt(i, m)
    })
    if (tieRef.current) tieRef.current.instanceMatrix.needsUpdate = true
  }, [cables])

  const { green, amber } = useMemo(() => {
    const green: LedPoint[] = []
    const amber: LedPoint[] = []
    for (const dev of mountedDevices()) {
      for (const p of dev.ports) {
        if (!p.led || !p.patched) continue
        const pt: LedPoint = { position: [p.led[0], dev.centerY + p.led[1], FACE_Z + 0.0009], mode: "link" }
        // some 1G copper ports show amber link like real gear
        ;(p.kind === "rj45" && p.col % 5 === 3 ? amber : green).push(pt)
      }
    }
    return { green, amber }
  }, [])

  return (
    <group>
      {cables.tubes.map((t) => (
        <mesh key={t.color} geometry={t.geometry} castShadow={quality === "high"}>
          <meshStandardMaterial
            color={CABLE_COLORS[t.color]}
            roughness={t.color === "aqua" || t.color === "fiberYellow" ? 0.35 : 0.55}
            metalness={0}
          />
        </mesh>
      ))}
      {plugGroups.map(([key, plugs]) => (
        <PlugInstances key={key} plugs={plugs} matKey={key.split("|")[1]} />
      ))}
      {cables.ties.length > 0 && (
        <instancedMesh ref={tieRef} args={[tieGeo, undefined, cables.ties.length]}>
          <meshStandardMaterial color="#0c0c0d" roughness={0.9} />
        </instancedMesh>
      )}
      <Leds points={green} color="#3dff6e" animate={animate} />
      <Leds points={amber} color="#ffb020" animate={animate} />
    </group>
  )
}
