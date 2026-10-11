"use client"

import { useRef } from "react"
import { Mesh } from "three"

export function DatacenterRoom() {
  const floorRef = useRef<Mesh>(null)

  return (
    <group>
      {/* Floor - realistic light gray raised floor tiles */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30, 30, 30]} />
        <meshStandardMaterial
          color="#d8dce0"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Raised floor tile grid - subtle dark lines */}
      <gridHelper
        args={[30, 50, "#a0a8b0", "#c0c8d0"]}
        position={[0, 0.01, 0]}
      />

      {/* Back wall - light industrial gray */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <boxGeometry args={[30, 10, 0.2]} />
        <meshStandardMaterial color="#e8ecf0" roughness={0.85} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-15, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 10, 0.2]} />
        <meshStandardMaterial color="#e8ecf0" roughness={0.85} />
      </mesh>

      {/* Right wall */}
      <mesh position={[15, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 10, 0.2]} />
        <meshStandardMaterial color="#e8ecf0" roughness={0.85} />
      </mesh>

      {/* Ceiling - white industrial tiles */}
      <mesh position={[0, 10, 0]} receiveShadow>
        <boxGeometry args={[30, 0.2, 16]} />
        <meshStandardMaterial color="#f0f4f8" roughness={0.9} />
      </mesh>

      {/* Ceiling tile grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`cx${i}`} position={[-15 + i * 3.3, 9.89, 0]}>
          <boxGeometry args={[0.02, 0.02, 16]} />
          <meshStandardMaterial color="#c0c8d0" />
        </mesh>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`cz${i}`} position={[0, 9.89, -8 + i * 3.2]}>
          <boxGeometry args={[30, 0.02, 0.02]} />
          <meshStandardMaterial color="#c0c8d0" />
        </mesh>
      ))}

      {/* Overhead fluorescent light fixtures - bright white */}
      {[-6, -2, 2, 6].map((x, i) => (
        <group key={i} position={[x, 9.7, 0]}>
          {/* Light fixture housing */}
          <mesh>
            <boxGeometry args={[0.6, 0.08, 10]} />
            <meshStandardMaterial color="#f8f8f8" metalness={0.3} roughness={0.4} />
          </mesh>
          {/* Light panel - emissive white */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.5, 0.02, 9.5]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={1.5}
            />
          </mesh>
          {/* Point light for illumination */}
          <pointLight position={[0, -0.5, 0]} color="#f5f8ff" intensity={2.5} distance={12} decay={2} />
        </group>
      ))}

      {/* Cable trays - silver metal */}
      <mesh position={[0, 8.5, -2]}>
        <boxGeometry args={[14, 0.08, 0.6]} />
        <meshStandardMaterial color="#808890" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 8.5, 2]}>
        <boxGeometry args={[14, 0.08, 0.6]} />
        <meshStandardMaterial color="#808890" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Floor vents - perforated tiles */}
      {[-8, -4, 4, 8].map((x, i) => (
        <mesh key={`vent${i}`} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2, 4]} />
          <meshStandardMaterial color="#303840" roughness={0.5} metalness={0.4} />
        </mesh>
      ))}
    </group>
  )
}
