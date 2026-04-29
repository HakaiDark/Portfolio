"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

export function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 150
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      speeds[i] = 0.1 + Math.random() * 0.2
    }

    return { positions, speeds }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particles.speeds.length; i++) {
      const idx = i * 3
      
      // Slow drift upward and sideways
      positions[idx + 1] += particles.speeds[i] * 0.01
      positions[idx] += Math.sin(clock.elapsedTime * 0.5 + i) * 0.002

      // Reset position when too high
      if (positions[idx + 1] > 10) {
        positions[idx + 1] = 0
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points
      ref={pointsRef}
      positions={particles.positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#5a7a9a"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}
