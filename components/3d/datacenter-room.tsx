"use client"

import { useRef } from "react"
import { Mesh } from "three"

export function DatacenterRoom() {
  const floorRef = useRef<Mesh>(null)

  return (
    <group>
      {/* Floor with grid pattern */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30, 30, 30]} />
        <meshStandardMaterial
          color="#0a0f14"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Grid lines on floor */}
      <gridHelper
        args={[30, 30, "#1a2533", "#0d1520"]}
        position={[0, 0.01, 0]}
      />

      {/* Back wall */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <boxGeometry args={[30, 10, 0.2]} />
        <meshStandardMaterial color="#080c10" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-15, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 10, 0.2]} />
        <meshStandardMaterial color="#080c10" roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[15, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 10, 0.2]} />
        <meshStandardMaterial color="#080c10" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 10, 0]} receiveShadow>
        <boxGeometry args={[30, 0.2, 16]} />
        <meshStandardMaterial color="#060a0d" roughness={0.95} />
      </mesh>

      {/* Overhead lighting strips */}
      {[-4, 0, 4].map((x, i) => (
        <group key={i} position={[x, 9.8, 0]}>
          <mesh>
            <boxGeometry args={[0.1, 0.1, 12]} />
            <meshStandardMaterial
              color="#2a3a4a"
              emissive="#3a4a5a"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Cable trays */}
      <mesh position={[0, 8.5, -2]}>
        <boxGeometry args={[12, 0.1, 0.5]} />
        <meshStandardMaterial color="#1a252f" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}
