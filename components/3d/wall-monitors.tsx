"use client"

import { useState } from "react"
import { Html, Text } from "@react-three/drei"

interface WallMonitorsProps {
  onFirewallClick: () => void
  onProjectsClick: () => void
}

function WallMonitor({
  position,
  onClick,
  label,
  title,
  hoverLabel,
}: {
  position: [number, number, number]
  onClick?: () => void
  label: string
  title: string
  hoverLabel?: string
}) {
  const [hovered, setHovered] = useState(false)
  const interactive = !!onClick

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerEnter={() => interactive && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Monitor frame */}
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial
          color={hovered ? "#2a3540" : "#1a2530"}
          roughness={0.7}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial
          color="#0a1015"
          emissive={hovered ? "#2a4050" : "#1a2535"}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Title */}
      <Text
        fontSize={0.04}
        color="#5a7a9a"
        anchorX="left"
        anchorY="top"
        position={[-0.5, 0.3, 0.03]}
      >
        {label}
      </Text>

      <Text
        fontSize={0.06}
        color="#8aaaba"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.03]}
      >
        {title}
      </Text>

      {/* Hover tooltip */}
      {hovered && hoverLabel && (
        <Html position={[0, 0.5, 0]} center>
          <div className="pointer-events-none whitespace-nowrap border border-primary/50 bg-card/90 px-3 py-1.5 font-mono text-xs tracking-wider text-primary backdrop-blur-sm">
            {'>'} {hoverLabel}
          </div>
        </Html>
      )}
    </group>
  )
}

export function WallMonitors({ onFirewallClick, onProjectsClick }: WallMonitorsProps) {
  return (
    <group position={[0, 5.5, -7.8]}>
      {/* Top row */}
      <WallMonitor
        position={[-2.8, 1.2, 0]}
        label="NIST 800-53"
        title="COMPLIANCE"
      />
      <WallMonitor
        position={[-1.4, 1.2, 0]}
        label="CISCO DNA"
        title="ASSURANCE"
      />
      <WallMonitor
        position={[0, 1.2, 0]}
        onClick={onFirewallClick}
        label="FORTIANALYZER"
        title="LIVE LOGS"
        hoverLabel="FORTIGATE NGFW"
      />

      {/* Bottom row */}
      <WallMonitor
        position={[-2.8, 0.2, 0]}
        label="OSPF"
        title="TOPOLOGY"
      />
      <WallMonitor
        position={[-1.4, 0.2, 0]}
        label="PRTG"
        title="MONITOR"
      />
      <WallMonitor
        position={[0, 0.2, 0]}
        onClick={onProjectsClick}
        label="PROJECTS"
        title="HUB"
        hoverLabel="PROJECTS HUB"
      />
    </group>
  )
}
