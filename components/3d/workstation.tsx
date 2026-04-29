"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text } from "@react-three/drei"
import { Mesh, MeshStandardMaterial } from "three"

interface WorkstationProps {
  onMonitor1Click: () => void
  onMonitor2Click: () => void
}

function Monitor({
  position,
  onClick,
  label,
  content,
}: {
  position: [number, number, number]
  onClick: () => void
  label: string
  content: "terminal" | "chart"
}) {
  const [hovered, setHovered] = useState(false)
  const screenRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (screenRef.current && hovered) {
      ;(screenRef.current.material as MeshStandardMaterial).emissiveIntensity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Monitor body */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.6, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.026]}>
        <planeGeometry args={[0.82, 0.52]} />
        <meshStandardMaterial
          color={hovered ? "#1a2a3a" : "#0a1520"}
          emissive="#2a3a4a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Screen content */}
      {content === "terminal" && (
        <group position={[0, 0, 0.03]}>
          <Text
            fontSize={0.03}
            color="#4a7a9a"
            anchorX="left"
            anchorY="top"
            position={[-0.38, 0.22, 0]}
          >
            {`$ network status\n> BGP: ESTABLISHED\n> OSPF: ACTIVE\n> Interfaces: UP`}
          </Text>
        </group>
      )}

      {content === "chart" && (
        <group position={[0, 0, 0.03]}>
          <Text
            fontSize={0.06}
            color="#4a9a6a"
            anchorX="center"
            anchorY="middle"
          >
            98%
          </Text>
          <Text
            fontSize={0.025}
            color="#5a6a7a"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.12, 0]}
          >
            NETWORK HEALTH
          </Text>
        </group>
      )}

      {/* Stand */}
      <mesh position={[0, -0.35, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.42, 0.02]} castShadow>
        <boxGeometry args={[0.25, 0.02, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
      </mesh>

      {/* Hover tooltip */}
      {hovered && (
        <Html position={[0, 0.4, 0]} center>
          <div className="pointer-events-none whitespace-nowrap border border-primary/50 bg-card/90 px-3 py-1.5 font-mono text-xs tracking-wider text-primary backdrop-blur-sm">
            {'>'} {label}
          </div>
        </Html>
      )}
    </group>
  )
}

export function Workstation({ onMonitor1Click, onMonitor2Click }: WorkstationProps) {
  return (
    <group position={[2.5, 1.44, -2]} scale={1.6}>
      {/* Desk */}
      <mesh position={[0, -0.55, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.5, 0.05, 0.9]} />
        <meshStandardMaterial color="#2a2520" roughness={0.8} />
      </mesh>

      {/* Desk legs */}
      {[
        [-1.1, -0.9, -0.35],
        [1.1, -0.9, -0.35],
        [-1.1, -0.9, 0.35],
        [1.1, -0.9, 0.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.05, 0.7, 0.05]} />
          <meshStandardMaterial color="#1a1815" metalness={0.4} />
        </mesh>
      ))}

      {/* Monitors */}
      <Monitor
        position={[-0.5, 0, 0]}
        onClick={onMonitor1Click}
        label="MY PROFILE"
        content="terminal"
      />
      <Monitor
        position={[0.5, 0, 0]}
        onClick={onMonitor2Click}
        label="SKILLS DASHBOARD"
        content="chart"
      />

      {/* Keyboard */}
      <mesh position={[0, -0.5, 0.3]} castShadow>
        <boxGeometry args={[0.5, 0.02, 0.15]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.4, -0.5, 0.3]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.1]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* Coffee mug */}
      <group position={[-0.9, -0.45, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.08, 16]} />
          <meshStandardMaterial color="#e8e8e0" roughness={0.6} />
        </mesh>
        {/* Coffee */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.01, 16]} />
          <meshStandardMaterial color="#3a2820" roughness={0.2} />
        </mesh>
      </group>

      {/* PC Tower under desk */}
      <mesh position={[-1, -0.9, 0]} castShadow>
        <boxGeometry args={[0.2, 0.45, 0.4]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
    </group>
  )
}
