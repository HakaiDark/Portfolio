"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { Group, MeshStandardMaterial } from "three"

interface ServerRacksProps {
  onRackClick: () => void
}

function BlinkingLED({ 
  position, 
  color, 
  speed = 1 
}: { 
  position: [number, number, number]
  color: string
  speed?: number 
}) {
  const ref = useRef<MeshStandardMaterial>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      const blink = Math.sin(clock.elapsedTime * speed * Math.PI) > 0 ? 1 : 0.2
      ref.current.emissiveIntensity = blink
    }
  })

  return (
    <mesh position={position}>
      <boxGeometry args={[0.02, 0.02, 0.01]} />
      <meshStandardMaterial
        ref={ref}
        color={color}
        emissive={color}
        emissiveIntensity={1}
      />
    </mesh>
  )
}

function ServerUnit({ 
  position, 
  height = 0.08, 
  type = "server" 
}: { 
  position: [number, number, number]
  height?: number
  type?: "server" | "switch" | "firewall" | "patch"
}) {
  const colors = {
    server: "#1a2535",
    switch: "#152030",
    firewall: "#2a1815",
    patch: "#101820",
  }

  const ledColor = type === "firewall" ? "#ff6a33" : type === "switch" ? "#33ff66" : "#3366ff"
  const ledCount = type === "patch" ? 24 : type === "switch" ? 12 : 4

  return (
    <group position={position}>
      {/* Unit body */}
      <mesh castShadow>
        <boxGeometry args={[0.8, height, 0.5]} />
        <meshStandardMaterial
          color={colors[type]}
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Front plate */}
      <mesh position={[0, 0, 0.26]}>
        <boxGeometry args={[0.78, height - 0.01, 0.01]} />
        <meshStandardMaterial color="#0a1018" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* LEDs */}
      {Array.from({ length: Math.min(ledCount, 8) }).map((_, i) => (
        <BlinkingLED
          key={i}
          position={[-0.35 + i * 0.1, 0, 0.27]}
          color={ledColor}
          speed={0.5 + Math.random() * 2}
        />
      ))}

      {/* Firewall label */}
      {type === "firewall" && (
        <Html position={[0, 0, 0.28]} center>
          <div className="pointer-events-none font-mono text-[8px] tracking-wider text-orange-400/80">
            FORTIGATE
          </div>
        </Html>
      )}
    </group>
  )
}

function Rack({ 
  position, 
  onClick 
}: { 
  position: [number, number, number]
  onClick: () => void 
}) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<Group>(null)

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Rack frame */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 4, 0.6]} />
        <meshStandardMaterial
          color={hovered ? "#1a2535" : "#0d1520"}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Rack rails */}
      {[-0.42, 0.42].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.25]}>
          <boxGeometry args={[0.02, 3.8, 0.05]} />
          <meshStandardMaterial color="#2a3540" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Server units */}
      <ServerUnit position={[0, 1.6, 0]} type="patch" height={0.06} />
      <ServerUnit position={[0, 1.45, 0]} type="switch" height={0.08} />
      <ServerUnit position={[0, 1.3, 0]} type="switch" height={0.08} />
      <ServerUnit position={[0, 1.1, 0]} type="firewall" height={0.12} />
      <ServerUnit position={[0, 0.9, 0]} type="server" height={0.1} />
      <ServerUnit position={[0, 0.7, 0]} type="server" height={0.1} />
      <ServerUnit position={[0, 0.5, 0]} type="server" height={0.1} />
      <ServerUnit position={[0, 0.3, 0]} type="server" height={0.1} />
      <ServerUnit position={[0, 0.1, 0]} type="patch" height={0.06} />
      <ServerUnit position={[0, -0.05, 0]} type="switch" height={0.08} />
      <ServerUnit position={[0, -0.2, 0]} type="server" height={0.1} />
      <ServerUnit position={[0, -0.4, 0]} type="server" height={0.1} />

      {/* Hover tooltip */}
      {hovered && (
        <Html position={[0, 2.2, 0]} center>
          <div className="pointer-events-none whitespace-nowrap border border-primary/50 bg-card/90 px-3 py-1.5 font-mono text-xs tracking-wider text-primary backdrop-blur-sm">
            {'>'} SERVER RACK
          </div>
        </Html>
      )}
    </group>
  )
}

export function ServerRacks({ onRackClick }: ServerRacksProps) {
  return (
    <group position={[-3.5, 2, -4]}>
      <Rack position={[-1.2, 0, 0]} onClick={onRackClick} />
      <Rack position={[0, 0, 0]} onClick={onRackClick} />
      <Rack position={[1.2, 0, 0]} onClick={onRackClick} />

      {/* Inter-rack cables */}
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 1.8, 0.35]}>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color={i === 0 ? "#f4a020" : "#20a0f4"} />
        </mesh>
      ))}
    </group>
  )
}
