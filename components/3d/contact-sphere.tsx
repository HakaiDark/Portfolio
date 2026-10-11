"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Mesh, Group } from "three"

interface ContactSphereProps {
  onClick: () => void
}

export function ContactSphere({ onClick }: ContactSphereProps) {
  const [hovered, setHovered] = useState(false)
  const sphereRef = useRef<Mesh>(null)
  const ring1Ref = useRef<Group>(null)
  const ring2Ref = useRef<Group>(null)
  const ring3Ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3
      ring1Ref.current.rotation.y = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.2 + Math.PI / 3
      ring2Ref.current.rotation.z = t * 0.3
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.4
      ring3Ref.current.rotation.z = t * 0.2 + Math.PI / 4
    }
  })

  return (
    <group
      position={[5, 2.5, -3]}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Core sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#4a6a8a" : "#3a5a7a"}
          emissive="#3a5a7a"
          emissiveIntensity={hovered ? 0.6 : 0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight
        position={[0, 0, 0]}
        intensity={hovered ? 1 : 0.5}
        distance={3}
        color="#4a7a9a"
      />

      {/* Orbiting rings */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[0.6, 0.01, 16, 64]} />
          <meshStandardMaterial
            color="#4a7a9a"
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[0.75, 0.008, 16, 64]} />
          <meshStandardMaterial
            color="#5a8aaa"
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[0.9, 0.006, 16, 64]} />
          <meshStandardMaterial
            color="#6a9aba"
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>

      {/* Hover tooltip */}
      {hovered && (
        <Html position={[0, 1.2, 0]} center>
          <div className="pointer-events-none whitespace-nowrap border border-primary/50 bg-card/90 px-3 py-1.5 font-mono text-xs tracking-wider text-primary backdrop-blur-sm">
            {'>'} CONTACT ME
          </div>
        </Html>
      )}
    </group>
  )
}
