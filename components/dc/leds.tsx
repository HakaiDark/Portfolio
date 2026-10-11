"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export interface LedPoint {
  position: [number, number, number]
  /** "link" blinks with traffic, "steady" stays lit (power / status) */
  mode: "link" | "steady"
}

const geo = new THREE.PlaneGeometry(0.0024, 0.0017)

/**
 * All port LEDs of one colour in a single instanced draw call.
 * Each "link" LED behaves like real port activity: mostly lit, with irregular
 * dark flickers whose rate drifts over time (bursty traffic).
 */
export function Leds({
  points,
  color,
  intensity = 4,
  animate,
}: {
  points: LedPoint[]
  color: string
  intensity?: number
  animate: boolean
}) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const base = useMemo(() => new THREE.Color(color).multiplyScalar(intensity), [color, intensity])
  const dim = useMemo(() => new THREE.Color(color).multiplyScalar(0.08), [color])

  const state = useMemo(
    () =>
      points.map(() => ({
        on: true,
        next: Math.random() * 2,
        load: Math.random(), // how busy this port is
        drift: Math.random() * 10,
      })),
    [points]
  )

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    points.forEach((p, i) => {
      m.makeTranslation(p.position[0], p.position[1], p.position[2])
      mesh.setMatrixAt(i, m)
      mesh.setColorAt(i, base)
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [points, base])

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh || !animate) return
    const t = clock.elapsedTime
    let dirty = false
    for (let i = 0; i < points.length; i++) {
      if (points[i].mode !== "link") continue
      const s = state[i]
      if (t < s.next) continue
      // load slowly drifts so ports go through busy and quiet phases
      const load = 0.5 + 0.5 * Math.sin(t * 0.15 + s.drift) * s.load
      if (s.on) {
        s.on = false
        s.next = t + 0.025 + Math.random() * 0.06
      } else {
        s.on = true
        s.next = t + (0.04 + Math.random() * 0.5) / (0.3 + load * 2.5)
      }
      mesh.setColorAt(i, s.on ? base : dim)
      dirty = true
    }
    if (dirty && mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  if (points.length === 0) return null
  return (
    <instancedMesh ref={ref} args={[geo, undefined, points.length]} frustumCulled={false}>
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}
