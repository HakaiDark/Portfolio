"use client"

import { Suspense, useRef, useState, useEffect, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

// Content data matching the reference
const SECTIONS: Record<string, { ey: string; ti: string; body: string }> = {
  about: {
    ey: "01 // Profile",
    ti: "ABOUT ME",
    body: `<div class="p-s"><div class="p-l">Background</div><div class="p-tx">Computer Engineering graduate from Lebanon with enterprise-grade hands-on experience across network design, security operations, and software development. Built and managed large-scale Fortinet environments, designed BGP/OSPF topologies, and deployed 802.1X NAC with Aruba ClearPass.</div></div>
<div class="p-s"><div class="p-l">Current Focus</div><div class="p-tx">Pursuing NSE 4 FortiGate Security certification. Actively seeking junior IT/networking roles (remote-friendly). Also working as an ICT educator bridging production infrastructure with hands-on curriculum.</div></div>
<div class="p-sgrid"><div class="p-sc"><div class="p-sn">5+</div><div class="p-sl">Years Networking</div></div><div class="p-sc"><div class="p-sn">NSE</div><div class="p-sl">Fortinet Track</div></div><div class="p-sc"><div class="p-sn">BGP</div><div class="p-sl">OSPF · MPLS</div></div><div class="p-sc"><div class="p-sn">3D</div><div class="p-sl">Three.js Dev</div></div></div>`,
  },
  skills: {
    ey: "02 // Arsenal",
    ti: "CORE SKILLS",
    body: `<div class="p-s"><div class="p-l">Networking &amp; Security</div><div class="skr"><div class="skr-t"><span>Fortinet (FortiGate/Manager/Analyzer)</span><span>92%</span></div><div class="skr-bg"><div class="skr-f" style="width:92%"></div></div></div><div class="skr"><div class="skr-t"><span>BGP · OSPF · MPLS · VLAN</span><span>88%</span></div><div class="skr-bg"><div class="skr-f" style="width:88%"></div></div></div><div class="skr"><div class="skr-t"><span>802.1X · Aruba ClearPass · RADIUS</span><span>85%</span></div><div class="skr-bg"><div class="skr-f" style="width:85%"></div></div></div><div class="skr"><div class="skr-t"><span>IPSec &amp; SSL VPN · SD-WAN</span><span>83%</span></div><div class="skr-bg"><div class="skr-f" style="width:83%"></div></div></div></div>
<div class="p-s"><div class="p-l">Development</div><div class="skr"><div class="skr-t"><span>Python · Bash Scripting</span><span>80%</span></div><div class="skr-bg"><div class="skr-f" style="width:80%"></div></div></div><div class="skr"><div class="skr-t"><span>JavaScript · Three.js · WebGL</span><span>76%</span></div><div class="skr-bg"><div class="skr-f" style="width:76%"></div></div></div><div class="skr"><div class="skr-t"><span>Linux · VMware · Kali Linux</span><span>82%</span></div><div class="skr-bg"><div class="skr-f" style="width:82%"></div></div></div></div>
<div class="p-s"><div class="p-l">Tools &amp; Certs</div><div class="p-cr"><span class="p-ch">NSE Track</span><span class="p-ch">Cisco NetAcad</span><span class="p-ch">FortiGate</span><span class="p-ch">Packet Tracer</span><span class="p-ch o">Kali Linux</span><span class="p-ch o">Wireshark</span><span class="p-ch o">MITRE ATT&amp;CK</span></div></div>`,
  },
  rack: {
    ey: "03 // Infrastructure",
    ti: "SERVER RACK",
    body: `<div class="p-s"><div class="p-l">Environment</div><div class="p-tx">Managed a large-scale enterprise Fortinet environment with centralized policy orchestration via FortiManager, advanced logging through FortiAnalyzer, and multi-site SD-WAN configuration.</div></div>
<div class="p-s"><div class="p-l">Stack</div><div class="p-cr"><span class="p-ch">FortiGate NGFW</span><span class="p-ch">L3 Core Switch</span><span class="p-ch">L2 Access Switch</span><span class="p-ch">Patch Panel</span><span class="p-ch o">UPS · PDU</span><span class="p-ch o">Cable Mgmt</span></div></div>
<div class="p-s"><div class="p-l">Protocols</div><div class="skr"><div class="skr-t"><span>BGP · OSPF Routing</span><span>88%</span></div><div class="skr-bg"><div class="skr-f" style="width:88%"></div></div></div><div class="skr"><div class="skr-t"><span>VLAN Segmentation</span><span>90%</span></div><div class="skr-bg"><div class="skr-f" style="width:90%"></div></div></div><div class="skr"><div class="skr-t"><span>STP · LACP · ECMP</span><span>82%</span></div><div class="skr-bg"><div class="skr-f" style="width:82%"></div></div></div><div class="skr"><div class="skr-t"><span>QoS · Traffic Shaping</span><span>78%</span></div><div class="skr-bg"><div class="skr-f" style="width:78%"></div></div></div></div>`,
  },
  firewall: {
    ey: "04 // Security",
    ti: "FORTIGATE NGFW",
    body: `<div class="p-s"><div class="p-l">Overview</div><div class="p-tx">Enterprise FortiGate deployment with NGFW inspection, IPS, App Control, SSL inspection, managed via FortiManager with hundreds of security policies across multiple VDOMs.</div></div>
<div class="p-sgrid"><div class="p-sc"><div class="p-sn">40G</div><div class="p-sl">Throughput</div></div><div class="p-sc"><div class="p-sn">500+</div><div class="p-sl">Policies</div></div></div>
<div class="p-s" style="margin-top:1rem"><div class="p-l">Capabilities</div><div class="p-cr"><span class="p-ch o">IPSec VPN</span><span class="p-ch o">SSL-VPN</span><span class="p-ch o">IPS · AV</span><span class="p-ch o">App Control</span><span class="p-ch o">SD-WAN</span><span class="p-ch o">VDOM</span><span class="p-ch o">SSL Inspect</span><span class="p-ch o">FortiManager</span></div></div>`,
  },
  projects: {
    ey: "05 // Work",
    ti: "PROJECTS",
    body: `<div class="p-pr"><div class="p-pt">Enterprise Fortinet Deployment</div><div class="p-pd">Full-scale enterprise network via FortiManager. Centralized policy orchestration, FortiAnalyzer logging, IPSec site-to-site VPNs, SD-WAN across multiple branches.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">FortiGate</span><span class="p-ch">FortiManager</span><span class="p-ch">SD-WAN</span></div></div>
<div class="p-pr"><div class="p-pt">802.1X NAC with Aruba ClearPass</div><div class="p-pd">Port-based NAC with EAP-TLS certificate auth, dynamic VLAN assignment, and device profiling. RADIUS + TACACS+ integration.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">ClearPass</span><span class="p-ch">802.1X</span><span class="p-ch">RADIUS</span></div></div>
<div class="p-pr"><div class="p-pt">3D Datacenter Portfolio</div><div class="p-pd">This interactive Three.js scene with live terminal textures, clickable rack models, firewall model, and panel navigation.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">Three.js</span><span class="p-ch">WebGL</span><span class="p-ch">JavaScript</span></div></div>
<div class="p-pr"><div class="p-pt">Cyber Security Course Labs</div><div class="p-pd">Bash scripting assignments, Kali Linux terminal labs, Kill Chain & MITRE ATT&CK analysis, PDF-formatted documentation.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">Bash</span><span class="p-ch">Kali Linux</span><span class="p-ch">Python</span></div></div>`,
  },
  contact: {
    ey: "06 // Connect",
    ti: "GET IN TOUCH",
    body: `<div class="p-s"><div class="p-l">Availability</div><div class="p-tx">Open to network engineering roles, consulting, and ICT education. Lebanon-based · Remote-friendly · Actively seeking junior networking positions.</div></div>
<div class="p-s"><div class="p-l">Email</div><div class="p-tx" style="color:var(--accent);font-family:monospace;font-size:.85rem;letter-spacing:.1em">mo.yassin@network.io</div></div>
<div class="p-s"><div class="p-l">Platforms</div><div class="p-cr"><span class="p-ch">LinkedIn</span><span class="p-ch">GitHub</span><span class="p-ch o">Bayt.com</span></div></div>
<div class="p-s"><div class="p-l">Status</div><div class="p-tx" style="color:#00ff88;font-family:monospace;font-size:.8rem">● AVAILABLE — Pursuing NSE 4 Certification</div></div>`,
  },
}

// LED Component with blinking
function LED({
  position,
  baseColor,
  altColor = 0x111111,
  rate = 3,
  offset = 0,
  size = 0.033,
}: {
  position: [number, number, number]
  baseColor: number
  altColor?: number
  rate?: number
  offset?: number
  size?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      const on = Math.sin(clock.elapsedTime * rate + offset) > 0.18
      ;(ref.current.material as THREE.MeshBasicMaterial).color.setHex(on ? baseColor : altColor)
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color={baseColor} />
    </mesh>
  )
}

// Floor with realistic raised floor tiles - light gray industrial
function Floor() {
  return (
    <group>
      {/* Base floor - light gray concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 50]} />
        <meshStandardMaterial color={0xd8dce0} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Raised floor tiles - perforated metal look */}
      {Array.from({ length: 16 }).map((_, fx) =>
        Array.from({ length: 11 }).map((_, fz) => (
          <mesh key={`t-${fx}-${fz}`} position={[(fx - 7.5) * 2, 0.02, (fz - 5) * 2]} receiveShadow>
            <boxGeometry args={[1.92, 0.05, 1.92]} />
            <meshStandardMaterial color={0xc8ccd0} roughness={0.6} metalness={0.15} />
          </mesh>
        ))
      )}
      {/* Subtle tile gap grid - dark lines between tiles */}
      <gridHelper args={[60, 30, 0x909498, 0xa0a4a8]} position={[0, 0.03, 0]} />
      {/* Perforated vent tiles in cold aisle */}
      {[-8, -5, 5, 8].map((x, i) => (
        <mesh key={`vent${i}`} position={[x, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.9, 3.8]} />
          <meshStandardMaterial color={0x404448} roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// Room walls and ceiling - realistic light industrial colors
function Room() {
  return (
    <group>
      {/* Back wall - light gray industrial */}
      <mesh position={[0, 6, -13]}>
        <boxGeometry args={[60, 12, 0.15]} />
        <meshStandardMaterial color={0xe8ecf0} roughness={0.85} />
      </mesh>
      {/* Side walls */}
      <mesh position={[22, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[26, 12, 0.15]} />
        <meshStandardMaterial color={0xe8ecf0} roughness={0.85} />
      </mesh>
      <mesh position={[-22, 6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[26, 12, 0.15]} />
        <meshStandardMaterial color={0xe8ecf0} roughness={0.85} />
      </mesh>
      {/* Ceiling - white acoustic tiles */}
      <mesh position={[0, 10.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 26]} />
        <meshStandardMaterial color={0xf5f7fa} roughness={0.9} />
      </mesh>
      {/* Ceiling tile grid */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`cgx${i}`} position={[-28 + i * 3, 10.05, 0]}>
          <boxGeometry args={[0.02, 0.02, 26]} />
          <meshStandardMaterial color={0xd0d4d8} />
        </mesh>
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={`cgz${i}`} position={[0, 10.05, -13 + i * 3.25]}>
          <boxGeometry args={[60, 0.02, 0.02]} />
          <meshStandardMaterial color={0xd0d4d8} />
        </mesh>
      ))}
      {/* Fluorescent light fixtures - bright white panels */}
      {[-12, -6, 0, 6, 12].map((x, i) => (
        <group key={`light-${i}`}>
          {/* Light fixture housing */}
          <mesh position={[x, 9.95, 0]}>
            <boxGeometry args={[0.8, 0.1, 12]} />
            <meshStandardMaterial color={0xffffff} metalness={0.2} roughness={0.4} />
          </mesh>
          {/* Emissive light panel */}
          <mesh position={[x, 9.88, 0]}>
            <boxGeometry args={[0.7, 0.02, 11.5]} />
            <meshStandardMaterial color={0xffffff} emissive={0xffffff} emissiveIntensity={2.0} />
          </mesh>
        </group>
      ))}
      {/* Cable trays - silver metal */}
      <mesh position={[0, 9.2, -4]}>
        <boxGeometry args={[20, 0.1, 0.8]} />
        <meshStandardMaterial color={0x909498} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 9.2, 4]}>
        <boxGeometry args={[20, 0.1, 0.8]} />
        <meshStandardMaterial color={0x909498} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

// Animated data pulse on fiber
function DataPulse({ curve, color, speed, offset }: { curve: THREE.CatmullRomCurve3; color: number; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.elapsedTime * speed + offset) % 1)
      const pos = curve.getPoint(t)
      ref.current.position.copy(pos)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

// Fiber cable with animated data flow
function FiberCable({ points, color, pulseCount = 3 }: { points: THREE.Vector3[]; color: number; pulseCount?: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  return (
    <group>
      {/* Fiber jacket */}
      <mesh>
        <tubeGeometry args={[curve, 32, 0.012, 8, false]} />
        <meshPhysicalMaterial color={color} roughness={0.25} clearcoat={1.0} clearcoatRoughness={0.1} />
      </mesh>
      {/* Data pulses */}
      {Array.from({ length: pulseCount }).map((_, i) => (
        <DataPulse key={i} curve={curve} color={0xffffff} speed={0.3} offset={i / pulseCount} />
      ))}
    </group>
  )
}

// Cable tray with realistic fiber bundles
function CableTray({ z }: { z: number }) {
  const fiberColors = [0xffcc00, 0x00aaff, 0x00ff88, 0xff6600, 0x0066cc, 0xff00aa, 0x00ffcc, 0xaa00ff]
  
  return (
    <group>
      {/* Metal cable tray */}
      <mesh position={[-3, 8.8, z]}>
        <boxGeometry args={[30, 0.06, 0.6]} />
        <meshStandardMaterial color={0x707478} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Tray sides */}
      <mesh position={[-3, 8.82, z - 0.28]}>
        <boxGeometry args={[30, 0.1, 0.02]} />
        <meshStandardMaterial color={0x606468} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-3, 8.82, z + 0.28]}>
        <boxGeometry args={[30, 0.1, 0.02]} />
        <meshStandardMaterial color={0x606468} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Fiber bundles with natural sag */}
      {fiberColors.map((col, fb) => {
        const pts = Array.from({ length: 25 }).map((_, fs) => {
          const t = fs / 24
          const sag = Math.sin(t * Math.PI) * 0.03
          return new THREE.Vector3(
            -18 + t * 36, 
            8.84 + sag, 
            z - 0.2 + (fb % 4) * 0.1 + Math.floor(fb / 4) * 0.05
          )
        })
        return (
          <FiberCable key={fb} points={pts} color={col} pulseCount={2} />
        )
      })}
    </group>
  )
}

// Inter-rack patch cables (vertical bundles between racks)
function InterRackCables({ rackX }: { rackX: number }) {
  const cableColors = [0x00aaff, 0xffcc00, 0x00ff88, 0xff6600, 0x00ffcc, 0xaa66ff]
  
  return (
    <group position={[rackX, 0, 0]}>
      {/* Vertical cable bundle from switch to cable tray */}
      {cableColors.slice(0, 4).map((col, i) => {
        const offsetX = -0.3 + i * 0.15
        const pts = [
          new THREE.Vector3(offsetX, 8.5, 0.6),
          new THREE.Vector3(offsetX, 8.7, 0.4),
          new THREE.Vector3(offsetX, 8.8, 0),
        ]
        return <FiberCable key={i} points={pts} color={col} pulseCount={1} />
      })}
      
      {/* Patch cables from switch to patch panel */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = cableColors[i % cableColors.length]
        const startX = -0.5 + (i % 4) * 0.25
        const endX = -0.55 + (i % 4) * 0.28
        const pts = [
          new THREE.Vector3(startX, 8.9, 0.58),
          new THREE.Vector3(startX, 9.1, 0.65),
          new THREE.Vector3(endX, 9.55, 0.58),
        ]
        return <FiberCable key={`p${i}`} points={pts} color={col} pulseCount={1} />
      })}
    </group>
  )
}

// SFP Module component
function SFPModule({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* SFP housing */}
      <mesh>
        <boxGeometry args={[0.055, 0.035, 0.08]} />
        <meshPhysicalMaterial color={0x404448} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Fiber port */}
      <mesh position={[0, 0, 0.042]}>
        <cylinderGeometry args={[0.008, 0.008, 0.01, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color={0x00ff88} />
      </mesh>
      {/* LC connector */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.02, 0.015, 0.015]} />
        <meshStandardMaterial color={0x0088ff} />
      </mesh>
    </group>
  )
}

// Spinning fan component
function SpinningFan({ position, size = 0.08 }: { position: [number, number, number]; size?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.15
  })
  return (
    <group position={position}>
      {/* Fan housing */}
      <mesh>
        <cylinderGeometry args={[size, size, 0.02, 16]} />
        <meshStandardMaterial color={0x202428} metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Fan blades */}
      <mesh ref={ref} position={[0, 0, 0.012]}>
        <circleGeometry args={[size * 0.85, 6]} />
        <meshStandardMaterial color={0x303438} side={THREE.DoubleSide} />
      </mesh>
      {/* Center hub */}
      <mesh position={[0, 0, 0.015]}>
        <cylinderGeometry args={[size * 0.2, size * 0.2, 0.015, 12]} />
        <meshStandardMaterial color={0x404448} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Rack mounting screw
function RackScrew({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.012, 0.012, 0.008, 6]} />
      <meshStandardMaterial color={0x505458} metalness={0.9} roughness={0.1} />
    </mesh>
  )
}

// Brand logo text placeholder (rendered as colored strip since we can't do text easily)
function BrandStrip({ position, color, width = 0.3 }: { position: [number, number, number]; color: number; width?: number }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.06, 0.005]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  )
}

// Rack device component - detailed with branding
function RackDevice({
  y,
  h,
  type,
  section,
  label,
  onHover,
  onClick,
}: {
  y: number
  h: number
  type: string
  section?: string
  label?: string
  onHover?: (l: string | null) => void
  onClick?: (s: string) => void
}) {
  // Realistic colors based on type
  const bodyColor = type === "fw" ? 0xe8e8e8 : type === "switch" ? 0x1a1e22 : type === "srv" ? 0x0a0c10 : type === "aruba" ? 0xf5f5f5 : 0x181c20
  const accentColor = type === "fw" ? 0xcc0000 : type === "switch" ? 0x00aacc : type === "aruba" ? 0xff6600 : 0x0066cc
  
  return (
    <group
      position={[0, y, 0]}
      onPointerOver={() => label && onHover?.(label)}
      onPointerOut={() => onHover?.(null)}
      onClick={() => section && onClick?.(section)}
    >
      {/* Main chassis with realistic texture */}
      <mesh castShadow>
        <boxGeometry args={[2.12, h, 1.08]} />
        <meshStandardMaterial 
          color={bodyColor} 
          roughness={type === "fw" || type === "aruba" ? 0.7 : 0.4} 
          metalness={type === "fw" || type === "aruba" ? 0.1 : 0.6} 
        />
      </mesh>
      
      {/* Bezel/faceplate - slightly protruding */}
      <mesh position={[0, 0, 0.545]}>
        <boxGeometry args={[2.1, h - 0.02, 0.01]} />
        <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Rack ears with screw holes */}
      {[-1.08, 1.08].map((ex, i) => (
        <group key={`ear${i}`}>
          <mesh position={[ex, 0, 0.54]}>
            <boxGeometry args={[0.08, h - 0.02, 0.04]} />
            <meshStandardMaterial color={0x303438} roughness={0.3} metalness={0.85} />
          </mesh>
          {/* Cage nuts / screws */}
          <RackScrew position={[ex, h * 0.35, 0.56]} />
          <RackScrew position={[ex, -h * 0.35, 0.56]} />
        </group>
      ))}
      
      {/* Brand accent stripe */}
      <mesh position={[0, h / 2 - 0.025, 0.551]}>
        <boxGeometry args={[2.1, 0.025, 0.005]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* ===== CISCO SWITCH ===== */}
      {type === "switch" && (
        <>
          {/* Cisco blue brand strip */}
          <BrandStrip position={[-0.85, h / 2 - 0.06, 0.555]} color={0x049fd9} width={0.25} />
          
          {/* Recessed port panel */}
          <mesh position={[0, 0, 0.54]}>
            <boxGeometry args={[1.7, h * 0.75, 0.025]} />
            <meshStandardMaterial color={0x0a0c10} roughness={0.9} />
          </mesh>
          
          {/* RJ45 Port grid - 48 ports */}
          {Array.from({ length: 48 }).map((_, sp) => {
            const row = Math.floor(sp / 24)
            const col = sp % 24
            const px = -0.72 + col * 0.06
            const py = 0.1 - row * 0.15
            return (
              <group key={sp}>
                {/* Port housing */}
                <mesh position={[px, py, 0.555]}>
                  <boxGeometry args={[0.05, 0.055, 0.02]} />
                  <meshStandardMaterial color={0x050608} roughness={0.8} />
                </mesh>
                {/* Port LED */}
                <LED position={[px, py - 0.035, 0.565]} baseColor={0x00ff88} altColor={0x0a1a0a} rate={1.5 + Math.random() * 4} offset={Math.random() * 6} size={0.006} />
              </group>
            )
          })}
          
          {/* SFP+ uplink modules */}
          {Array.from({ length: 4 }).map((_, sfp) => (
            <SFPModule key={`sfp${sfp}`} position={[0.82 + (sfp % 2) * 0.08, 0.08 - Math.floor(sfp / 2) * 0.12, 0.555]} />
          ))}
          
          {/* Status LCD */}
          <mesh position={[0.75, -0.12, 0.555]}>
            <boxGeometry args={[0.18, 0.08, 0.01]} />
            <meshBasicMaterial color={0x001a00} />
          </mesh>
          <mesh position={[0.75, -0.12, 0.561]}>
            <boxGeometry args={[0.16, 0.06, 0.002]} />
            <meshBasicMaterial color={0x00cc44} transparent opacity={0.8} />
          </mesh>
          
          {/* Console port */}
          <mesh position={[-0.9, -0.05, 0.555]}>
            <boxGeometry args={[0.05, 0.035, 0.015]} />
            <meshStandardMaterial color={0x1a5a8a} />
          </mesh>
        </>
      )}

      {/* ===== FORTIGATE FIREWALL ===== */}
      {type === "fw" && (
        <>
          {/* Fortinet red brand strip */}
          <BrandStrip position={[-0.85, h / 2 - 0.06, 0.555]} color={0xcc0000} width={0.3} />
          
          {/* Red accent line at bottom */}
          <mesh position={[0, -h / 2 + 0.03, 0.551]}>
            <boxGeometry args={[2.1, 0.04, 0.006]} />
            <meshBasicMaterial color={0xcc0000} />
          </mesh>
          
          {/* Port panel section */}
          <mesh position={[-0.35, 0, 0.545]}>
            <boxGeometry args={[1.3, h * 0.7, 0.02]} />
            <meshStandardMaterial color={0x101214} roughness={0.85} />
          </mesh>
          
          {/* Network ports - 16 GbE ports */}
          {Array.from({ length: 16 }).map((_, pp) => {
            const row = Math.floor(pp / 8)
            const col = pp % 8
            const px = -0.85 + col * 0.13
            const py = 0.12 - row * 0.18
            return (
              <group key={pp}>
                <mesh position={[px, py, 0.555]}>
                  <boxGeometry args={[0.08, 0.06, 0.02]} />
                  <meshStandardMaterial color={0x080a0c} roughness={0.7} />
                </mesh>
                {/* Link LED */}
                <LED position={[px - 0.025, py + 0.04, 0.565]} baseColor={0x00ff00} altColor={0x001a00} rate={2 + Math.random() * 3} offset={Math.random() * 6} size={0.006} />
                {/* Activity LED */}
                <LED position={[px + 0.025, py + 0.04, 0.565]} baseColor={0xffaa00} altColor={0x1a0a00} rate={8 + Math.random() * 12} offset={Math.random() * 6} size={0.006} />
              </group>
            )
          })}
          
          {/* SFP slots */}
          {Array.from({ length: 4 }).map((_, sfp) => (
            <SFPModule key={`fwsfp${sfp}`} position={[0.25 + (sfp % 2) * 0.1, 0.08 - Math.floor(sfp / 2) * 0.15, 0.555]} />
          ))}
          
          {/* LCD status display */}
          <mesh position={[0.7, 0.1, 0.555]}>
            <boxGeometry args={[0.35, 0.22, 0.02]} />
            <meshStandardMaterial color={0x080808} roughness={0.6} />
          </mesh>
          <mesh position={[0.7, 0.1, 0.566]}>
            <boxGeometry args={[0.32, 0.18, 0.005]} />
            <meshBasicMaterial color={0x00ff44} transparent opacity={0.85} />
          </mesh>
          
          {/* USB port */}
          <mesh position={[0.7, -0.12, 0.555]}>
            <boxGeometry args={[0.04, 0.02, 0.01]} />
            <meshStandardMaterial color={0x303030} />
          </mesh>
          
          {/* Power button */}
          <mesh position={[0.9, 0, 0.555]}>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color={0x404040} metalness={0.8} roughness={0.2} />
          </mesh>
          <LED position={[0.9, 0, 0.562]} baseColor={0x00ff00} size={0.008} />
        </>
      )}

      {/* ===== DELL SERVER ===== */}
      {type === "srv" && (
        <>
          {/* Dell blue brand strip */}
          <BrandStrip position={[-0.9, h / 2 - 0.08, 0.555]} color={0x007db8} width={0.2} />
          
          {/* Drive bays - 12 hot-swap SAS/SATA */}
          {Array.from({ length: 12 }).map((_, db) => {
            const row = Math.floor(db / 6)
            const col = db % 6
            const bx = -0.72 + col * 0.24
            const by = 0.15 - row * 0.35
            return (
              <group key={db}>
                {/* Drive caddy */}
                <mesh position={[bx, by, 0.555]}>
                  <boxGeometry args={[0.2, 0.28, 0.03]} />
                  <meshStandardMaterial color={0x606468} roughness={0.35} metalness={0.75} />
                </mesh>
                {/* Drive handle */}
                <mesh position={[bx, by + 0.1, 0.572]}>
                  <boxGeometry args={[0.16, 0.04, 0.01]} />
                  <meshStandardMaterial color={0x404448} metalness={0.8} roughness={0.3} />
                </mesh>
                {/* Drive LED */}
                <LED position={[bx + 0.08, by + 0.12, 0.575]} baseColor={0x4488ff} altColor={0x081828} rate={6 + Math.random() * 10} offset={Math.random() * 6} size={0.008} />
                {/* Activity LED */}
                <LED position={[bx + 0.08, by + 0.1, 0.575]} baseColor={0x00ff88} altColor={0x081808} rate={15 + Math.random() * 20} offset={Math.random() * 6} size={0.006} />
              </group>
            )
          })}
          
          {/* iDRAC port */}
          <mesh position={[0.85, 0.2, 0.555]}>
            <boxGeometry args={[0.06, 0.045, 0.015]} />
            <meshStandardMaterial color={0x0a0a0a} />
          </mesh>
          
          {/* VGA port */}
          <mesh position={[0.85, 0.1, 0.555]}>
            <boxGeometry args={[0.05, 0.035, 0.015]} />
            <meshStandardMaterial color={0x0066cc} />
          </mesh>
          
          {/* USB ports */}
          {[0, 0.06].map((offset, i) => (
            <mesh key={`usb${i}`} position={[0.85 + offset, 0, 0.555]}>
              <boxGeometry args={[0.04, 0.02, 0.01]} />
              <meshStandardMaterial color={0x303030} />
            </mesh>
          ))}
          
          {/* Power button */}
          <mesh position={[0.9, -0.15, 0.555]}>
            <cylinderGeometry args={[0.025, 0.025, 0.01, 12]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color={0x404040} metalness={0.8} roughness={0.2} />
          </mesh>
          <LED position={[0.9, -0.15, 0.562]} baseColor={0x00ff00} size={0.01} />
        </>
      )}

      {/* ===== ARUBA CLEARPASS ===== */}
      {type === "aruba" && (
        <>
          {/* Aruba orange brand strip */}
          <BrandStrip position={[-0.85, 0, 0.555]} color={0xff6600} width={0.25} />
          
          {/* Port section */}
          <mesh position={[0, 0, 0.545]}>
            <boxGeometry args={[1.5, h * 0.6, 0.015]} />
            <meshStandardMaterial color={0xe0e0e0} roughness={0.8} />
          </mesh>
          
          {/* Management ports */}
          {Array.from({ length: 4 }).map((_, p) => (
            <group key={p}>
              <mesh position={[-0.4 + p * 0.2, 0, 0.555]}>
                <boxGeometry args={[0.08, 0.055, 0.015]} />
                <meshStandardMaterial color={0x101010} roughness={0.7} />
              </mesh>
              <LED position={[-0.4 + p * 0.2, -0.04, 0.562]} baseColor={0x00ff88} altColor={0x0a1a0a} rate={2 + Math.random() * 3} offset={Math.random() * 6} size={0.006} />
            </group>
          ))}
          
          {/* Status LEDs */}
          <LED position={[0.7, 0.02, 0.555]} baseColor={0x00ff00} size={0.01} />
          <LED position={[0.7, -0.02, 0.555]} baseColor={0xff6600} rate={1.5} size={0.01} />
        </>
      )}

      {/* ===== PATCH PANEL ===== */}
      {type === "patch" && (
        <>
          {/* Panel face */}
          <mesh position={[0, 0, 0.545]}>
            <boxGeometry args={[2.0, h * 0.8, 0.02]} />
            <meshStandardMaterial color={0x0a0c10} roughness={0.85} />
          </mesh>
          
          {/* 24 patch ports */}
          {Array.from({ length: 24 }).map((_, pp) => {
            const px = -0.85 + pp * 0.075
            return (
              <group key={pp}>
                <mesh position={[px, 0, 0.555]}>
                  <boxGeometry args={[0.055, 0.055, 0.015]} />
                  <meshStandardMaterial color={0x151820} roughness={0.6} />
                </mesh>
                {/* Port number label area */}
                <mesh position={[px, 0.055, 0.555]}>
                  <boxGeometry args={[0.04, 0.02, 0.002]} />
                  <meshStandardMaterial color={0xf0f0f0} />
                </mesh>
              </group>
            )
          })}
        </>
      )}

      {/* ===== UPS ===== */}
      {type === "ups" && (
        <>
          {/* APC green brand strip */}
          <BrandStrip position={[-0.85, h / 2 - 0.1, 0.555]} color={0x00aa44} width={0.2} />
          
          {/* Display panel */}
          <mesh position={[-0.5, 0.1, 0.555]}>
            <boxGeometry args={[0.4, 0.25, 0.02]} />
            <meshStandardMaterial color={0x0a0a0a} roughness={0.5} />
          </mesh>
          <mesh position={[-0.5, 0.1, 0.566]}>
            <boxGeometry args={[0.35, 0.2, 0.005]} />
            <meshBasicMaterial color={0x00ff88} transparent opacity={0.7} />
          </mesh>
          
          {/* Battery status LEDs */}
          {Array.from({ length: 5 }).map((_, i) => (
            <LED key={`bat${i}`} position={[-0.1 + i * 0.08, 0.2, 0.555]} baseColor={0x00ff00} altColor={0x002200} rate={0.5} offset={i * 0.3} size={0.012} />
          ))}
          
          {/* Outlet banks */}
          {Array.from({ length: 8 }).map((_, o) => (
            <mesh key={`out${o}`} position={[0.4 + (o % 4) * 0.15, 0.1 - Math.floor(o / 4) * 0.2, 0.555]}>
              <boxGeometry args={[0.1, 0.08, 0.02]} />
              <meshStandardMaterial color={0x202020} roughness={0.6} />
            </mesh>
          ))}
          
          {/* Cooling fans */}
          <SpinningFan position={[0.8, 0.15, 0.555]} size={0.1} />
          <SpinningFan position={[0.8, -0.15, 0.555]} size={0.1} />
        </>
      )}
    </group>
  )
}

// Server rack
function ServerRack({ x, onHover, onClick }: { x: number; onHover?: (l: string | null) => void; onClick?: (s: string) => void }) {
  const devs = [
    { y: 4.4, h: 0.28, type: "patch" },
    { y: 4.0, h: 0.28, type: "patch" },
    { y: 3.35, h: 0.55, type: "switch", section: "rack", label: "Cisco Core Switch L3" },
    { y: 2.65, h: 0.55, type: "switch", section: "rack", label: "Cisco Distribution Sw" },
    { y: 1.75, h: 0.82, type: "fw", section: "firewall", label: "FortiGate NGFW" },
    { y: 0.75, h: 0.55, type: "switch", section: "rack", label: "Cisco Access Switch" },
    { y: 0.08, h: 0.55, type: "switch", section: "rack", label: "Cisco Access Switch 2" },
    { y: -0.55, h: 0.28, type: "aruba", section: "skills", label: "ClearPass 7200" },
    { y: -1.15, h: 0.72, type: "srv", section: "projects", label: "Server Node A" },
    { y: -2.0, h: 0.72, type: "srv", section: "projects", label: "Server Node B" },
    { y: -2.85, h: 0.28, type: "patch" },
    { y: -3.4, h: 0.78, type: "ups" },
  ]
  return (
    <group position={[x, 5.3, 0]}>
      {/* Frame */}
      <mesh position={[-1.225, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 10.4, 1.55]} />
        <meshPhysicalMaterial color={0x0a1620} roughness={0.7} metalness={0.45} clearcoat={0.3} />
      </mesh>
      <mesh position={[1.225, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 10.4, 1.55]} />
        <meshPhysicalMaterial color={0x0a1620} roughness={0.7} metalness={0.45} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, 5.175, 0]} castShadow>
        <boxGeometry args={[2.4, 0.05, 1.55]} />
        <meshPhysicalMaterial color={0x0a1620} roughness={0.7} metalness={0.45} clearcoat={0.3} />
      </mesh>
      <mesh position={[0, -5.175, 0]} castShadow>
        <boxGeometry args={[2.4, 0.05, 1.55]} />
        <meshPhysicalMaterial color={0x0a1620} roughness={0.7} metalness={0.45} clearcoat={0.3} />
      </mesh>
      {/* Rails */}
      {[-1.1, 1.1].map((rx, ri) => (
        <mesh key={ri} position={[rx, 0, 0]}>
          <boxGeometry args={[0.08, 10.2, 0.08]} />
          <meshPhysicalMaterial color={0x2a3a4a} roughness={0.35} metalness={0.85} clearcoat={0.5} />
        </mesh>
      ))}
      {/* Devices */}
      {devs.map((d, i) => (
        <RackDevice key={i} y={d.y} h={d.h} type={d.type} section={d.section} label={d.label} onHover={onHover} onClick={onClick} />
      ))}
    </group>
  )
}

// Canvas texture hook - optimized for performance
function useCanvasTex(w: number, h: number, draw: (ctx: CanvasRenderingContext2D, t: number) => void) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const texRef = useRef<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    const c = document.createElement("canvas")
    c.width = w
    c.height = h
    canvasRef.current = c
    texRef.current = new THREE.CanvasTexture(c)
    texRef.current.magFilter = THREE.LinearFilter
    texRef.current.minFilter = THREE.LinearFilter
  }, [w, h])

  useFrame(({ clock }) => {
    if (canvasRef.current && texRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        draw(ctx, clock.elapsedTime)
        texRef.current.needsUpdate = true
      }
    }
  })

  return texRef.current
}

// Wall monitor
function WallMonitor({
  position,
  size,
  section,
  label,
  draw,
  onHover,
  onClick,
}: {
  position: [number, number, number]
  size: [number, number]
  section: string
  label: string
  draw: (ctx: CanvasRenderingContext2D, t: number) => void
  onHover?: (l: string | null) => void
  onClick?: (s: string) => void
}) {
  const tex = useCanvasTex(1024, 640, draw)
  return (
    <group position={position} onPointerOver={() => onHover?.(label)} onPointerOut={() => onHover?.(null)} onClick={() => onClick?.(section)}>
      <mesh>
        <boxGeometry args={[size[0], size[1], 0.06]} />
        <meshPhysicalMaterial color={0x101820} roughness={0.5} metalness={0.6} clearcoat={0.4} />
      </mesh>
      {tex && (
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[size[0] - 0.12, size[1] - 0.08]} />
          <meshStandardMaterial map={tex} emissiveMap={tex} emissive={0xffffff} emissiveIntensity={1.5} />
        </mesh>
      )}
    </group>
  )
}

// Wall monitors bank
function WallMonitors({ onHover, onClick }: { onHover?: (l: string | null) => void; onClick?: (s: string) => void }) {
  const drawNist = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 40px Arial"
    ctx.fillText("NIST 800-53 COMPLIANCE", 20, 55)
    const controls = ["AC-2  Account Management", "AU-2  Audit Events", "CM-8  Information Inventory", "IA-2  Identification & Auth", "SC-7  Boundary Protection", "SI-4  System Monitoring"]
    for (let i = 0; i < controls.length; i++) {
      const y = 120 + i * 70
      ctx.fillStyle = "#050a0f"
      ctx.fillRect(20, y - 30, 984, 55)
      ctx.fillStyle = "#00ffe7"
      ctx.font = "bold 28px Arial"
      ctx.fillText(controls[i], 35, y)
      const p = i < 4 ? 1.0 : Math.sin(t * 0.5) * 0.1 + 0.85
      ctx.fillStyle = p > 0.9 ? "#00ff44" : "#ffaa00"
      ctx.fillRect(550, y - 25, 430 * p, 35)
      ctx.fillStyle = "#000"
      ctx.font = "bold 22px Arial"
      ctx.fillText(p > 0.9 ? "PASS" : "WARN", 560, y)
    }
  }, [])

  const drawDna = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 38px Arial"
    ctx.fillText("CISCO DNA // ASSURANCE", 20, 55)
    const cx = 200, cy = 320, r = 110
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "#112233"
    ctx.lineWidth = 20
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.98)
    ctx.strokeStyle = "#00ff44"
    ctx.stroke()
    ctx.fillStyle = "#fff"
    ctx.font = "bold 60px Arial"
    ctx.textAlign = "center"
    ctx.fillText("98%", cx, cy + 18)
    ctx.fillStyle = "#aaa"
    ctx.font = "28px Arial"
    ctx.fillText("HEALTH", cx, cy + 55)
    ctx.textAlign = "left"
    ctx.fillStyle = "#00ffe7"
    ctx.font = "bold 28px Arial"
    ctx.fillText("WIRED: 1,248", 420, 200)
    ctx.fillText("WIRELESS: 8,432", 420, 280)
    ctx.fillStyle = "#00ff44"
    ctx.fillText("ROGUE: 0", 420, 360)
  }, [])

  const drawLogs = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 38px Arial"
    ctx.fillText("FORTIANALYZER // LIVE LOGS", 20, 55)
    const logs = [
      "srcip=10.0.4.15      dstip=192.168.1.10   action=ACCEPT",
      "logid=0000000013  type=traffic  level=notice",
      'app="Web.Client"  policyid=42  service=HTTPS',
      "sentbyte=4512    rcvdbyte=18492    pkt=24",
      "[!!] BLOCKED  srcip=45.33.32.156  dstport=22",
      "IPS MATCH: ET.SCAN.SSH.BRUTE  ACTION=DROP",
    ]
    ctx.font = "26px monospace"
    for (let i = 0; i < 6; i++) {
      const idx = (Math.floor(t * 1.5) + i) % logs.length
      const isErr = logs[idx].includes("[!!]")
      const isDrop = logs[idx].includes("DROP")
      ctx.fillStyle = isErr ? "#ff5555" : isDrop ? "#ffaa00" : "#00ffe7"
      ctx.fillText(logs[idx], 20, 120 + i * 55)
    }
  }, [])

  const drawOspf = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 38px Arial"
    ctx.fillText("OSPF TOPOLOGY", 20, 55)
    const nodes = [
      { x: 160, y: 280, name: "CORE-1", col: "#00ffe7" },
      { x: 340, y: 420, name: "CORE-2", col: "#00ffe7" },
      { x: 500, y: 200, name: "DIST-A", col: "#00ff88" },
      { x: 680, y: 450, name: "DIST-B", col: "#00ff88" },
      { x: 840, y: 260, name: "ACCESS", col: "#4466ff" },
    ]
    const links = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [0, 3]]
    for (const [a, b] of links) {
      ctx.strokeStyle = "#0055a4"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(nodes[a].x, nodes[a].y)
      ctx.lineTo(nodes[b].x, nodes[b].y)
      ctx.stroke()
      const pp = ((t * 0.6 + a * 0.18) % 1)
      const px = nodes[a].x + (nodes[b].x - nodes[a].x) * pp
      const py = nodes[a].y + (nodes[b].y - nodes[a].y) * pp
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(px, py, 5, 0, Math.PI * 2)
      ctx.fill()
    }
    for (const n of nodes) {
      ctx.fillStyle = "#020608"
      ctx.beginPath()
      ctx.arc(n.x, n.y, 40, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = n.col
      ctx.lineWidth = 4
      ctx.stroke()
      ctx.fillStyle = n.col
      ctx.font = "bold 22px Arial"
      ctx.textAlign = "center"
      ctx.fillText(n.name, n.x, n.y + 8)
    }
    ctx.textAlign = "left"
  }, [])

  const drawPrtg = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 38px Arial"
    ctx.fillText("PRTG // SENSORS", 20, 55)
    const sensors = [
      { name: "CPU Load", val: 23 + Math.floor(Math.sin(t) * 5) },
      { name: "Memory", val: 67 + Math.floor(Math.sin(t * 0.7) * 3) },
      { name: "Disk I/O", val: 45 + Math.floor(Math.sin(t * 1.2) * 8) },
      { name: "Network In", val: 78 + Math.floor(Math.sin(t * 0.5) * 10) },
      { name: "Network Out", val: 34 + Math.floor(Math.sin(t * 0.8) * 6) },
      { name: "Ping RTT", val: 12 + Math.floor(Math.sin(t * 2) * 4) },
    ]
    for (let i = 0; i < sensors.length; i++) {
      const y = 115 + i * 65
      ctx.fillStyle = "#050a0f"
      ctx.fillRect(20, y, 984, 50)
      ctx.fillStyle = sensors[i].val > 70 ? "#ffaa00" : "#00ff44"
      ctx.font = "bold 24px Arial"
      ctx.fillText(sensors[i].name, 35, y + 33)
      ctx.fillStyle = "#00ffe7"
      ctx.fillText(sensors[i].val + "%", 300, y + 33)
      ctx.fillStyle = sensors[i].val > 70 ? "#ffaa00" : "#00ff44"
      ctx.fillRect(420, y + 12, 560 * (sensors[i].val / 100), 26)
    }
  }, [])

  const drawProjects = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "bold 38px Arial"
    ctx.fillText("PROJECTS HUB", 20, 55)
    const projs = [
      { name: "FortiGate Enterprise", pct: 100 },
      { name: "802.1X NAC Deploy", pct: 95 },
      { name: "3D Portfolio", pct: 88 },
      { name: "Cyber Labs", pct: 75 },
      { name: "NSE 4 Certification", pct: 60 + Math.floor(Math.sin(t * 0.3) * 5) },
    ]
    for (let i = 0; i < projs.length; i++) {
      const y = 115 + i * 85
      ctx.fillStyle = "#fff"
      ctx.font = "bold 26px Arial"
      ctx.fillText(projs[i].name, 35, y + 20)
      ctx.fillStyle = "#333344"
      ctx.fillRect(35, y + 35, 900, 28)
      ctx.fillStyle = projs[i].pct === 100 ? "#00ff44" : projs[i].pct > 80 ? "#00ffe7" : "#ffaa00"
      ctx.fillRect(35, y + 35, 900 * (projs[i].pct / 100), 28)
      ctx.fillStyle = "#fff"
      ctx.font = "22px Arial"
      ctx.fillText(projs[i].pct + "%", 950, y + 20)
    }
  }, [])

  return (
    <group position={[0, 5.5, -12.7]}>
      {/* Video wall frame - professional NOC style */}
      <mesh position={[0, 1.2, -0.1]}>
        <boxGeometry args={[14, 6.5, 0.15]} />
        <meshStandardMaterial color={0x181c20} roughness={0.8} />
      </mesh>
      
      {/* Top row - 3 large monitors */}
      <WallMonitor position={[-4.2, 2.8, 0]} size={[3.8, 2.4]} section="about" label="NIST Compliance" draw={drawNist} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[0, 2.8, 0]} size={[3.8, 2.4]} section="skills" label="Cisco DNA" draw={drawDna} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[4.2, 2.8, 0]} size={[3.8, 2.4]} section="firewall" label="FortiAnalyzer" draw={drawLogs} onHover={onHover} onClick={onClick} />
      
      {/* Bottom row - 3 large monitors */}
      <WallMonitor position={[-4.2, -0.4, 0]} size={[3.8, 2.4]} section="rack" label="OSPF Topology" draw={drawOspf} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[0, -0.4, 0]} size={[3.8, 2.4]} section="skills" label="PRTG Sensors" draw={drawPrtg} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[4.2, -0.4, 0]} size={[3.8, 2.4]} section="projects" label="Projects Hub" draw={drawProjects} onHover={onHover} onClick={onClick} />
      
      {/* Monitor bezels/frames */}
      {[[-4.2, 2.8], [0, 2.8], [4.2, 2.8], [-4.2, -0.4], [0, -0.4], [4.2, -0.4]].map(([x, y], i) => (
        <mesh key={`bezel${i}`} position={[x, y, 0.04]}>
          <boxGeometry args={[3.9, 2.5, 0.08]} />
          <meshStandardMaterial color={0x101418} roughness={0.6} metalness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// Coffee mug
function CoffeeMug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.1, 0.28, 16]} />
        <meshPhysicalMaterial color={0xeeeeee} roughness={0.1} clearcoat={1.0} />
      </mesh>
      <mesh position={[0.12, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
        <meshPhysicalMaterial color={0xeeeeee} roughness={0.1} clearcoat={1.0} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.098, 0.086, 0.26, 24]} />
        <meshPhysicalMaterial color={0x180900} roughness={0.02} />
      </mesh>
      <mesh position={[0, 0.135, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.097, 32]} />
        <meshPhysicalMaterial color={0x3a1200} roughness={0} clearcoat={1.0} />
      </mesh>
      <pointLight color={0x663300} intensity={0.4} distance={0.8} position={[0, 0.2, 0]} />
    </group>
  )
}

// Workstation
function Workstation({ onHover, onClick }: { onHover?: (l: string | null) => void; onClick?: (s: string) => void }) {
  const fan1 = useRef<THREE.Mesh>(null)
  const fan2 = useRef<THREE.Mesh>(null)
  const rgb = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (fan1.current) fan1.current.rotation.z += 0.07
    if (fan2.current) fan2.current.rotation.z += 0.09
    if (rgb.current) {
      const t = clock.elapsedTime
      rgb.current.color.setRGB(Math.sin(t * 0.7) * 0.5 + 0.5, Math.sin(t * 0.7 + 2.09) * 0.5 + 0.5, Math.sin(t * 0.7 + 4.18) * 0.5 + 0.5)
    }
  })

  const drawProfile = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#00ffe7"
    ctx.font = "bold 40px Arial"
    ctx.fillText("MO. YASSIN // PROFILE", 20, 55)
    ctx.fillStyle = "#fff"
    ctx.font = "28px Arial"
    ctx.fillText("Network Engineer & Developer", 35, 140)
    ctx.fillStyle = "#aaa"
    ctx.font = "22px Arial"
    ctx.fillText("5+ Years Enterprise Networking Experience", 35, 185)
    ctx.fillText("BGP · OSPF · Fortinet · 802.1X NAC", 35, 220)
    const stats = [{ l: "YEARS", v: "5+" }, { l: "CERTS", v: "NSE" }, { l: "ROUTING", v: "BGP" }, { l: "DEV", v: "3D" }]
    for (let i = 0; i < 4; i++) {
      const x = 35 + (i % 2) * 220, y = 280 + Math.floor(i / 2) * 120
      ctx.fillStyle = "#00ffe710"
      ctx.fillRect(x, y, 180, 90)
      ctx.fillStyle = "#00ffe7"
      ctx.font = "bold 40px Arial"
      ctx.fillText(stats[i].v, x + 18, y + 50)
      ctx.fillStyle = "#666"
      ctx.font = "16px Arial"
      ctx.fillText(stats[i].l, x + 18, y + 75)
    }
  }, [])

  const drawSkills = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#020608"
    ctx.fillRect(0, 0, 1024, 640)
    ctx.fillStyle = "#011118"
    ctx.fillRect(0, 0, 1024, 80)
    ctx.fillStyle = "#00ffe7"
    ctx.font = "bold 36px Arial"
    ctx.fillText("SKILLS DASHBOARD", 20, 55)
    const cx = 180, cy = 300, r = 90
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "#112233"
    ctx.lineWidth = 16
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.98)
    ctx.strokeStyle = "#00ff44"
    ctx.stroke()
    ctx.fillStyle = "#fff"
    ctx.font = "bold 48px Arial"
    ctx.textAlign = "center"
    ctx.fillText("98%", cx, cy + 15)
    ctx.fillStyle = "#666"
    ctx.font = "20px Arial"
    ctx.fillText("NET HEALTH", cx, cy + 45)
    ctx.textAlign = "left"
    const skills = [{ n: "Fortinet", p: 92 }, { n: "BGP/OSPF", p: 88 }, { n: "802.1X", p: 85 }, { n: "Python", p: 80 }]
    for (let i = 0; i < 4; i++) {
      const y = 140 + i * 65
      ctx.fillStyle = "#00ffe7"
      ctx.font = "22px Arial"
      ctx.fillText(skills[i].n, 380, y)
      ctx.fillStyle = "#333344"
      ctx.fillRect(380, y + 12, 300, 18)
      ctx.fillStyle = "#00ffe7"
      ctx.fillRect(380, y + 12, 300 * (skills[i].p / 100), 18)
      ctx.fillStyle = "#fff"
      ctx.font = "18px Arial"
      ctx.fillText(skills[i].p + "%", 700, y)
    }
  }, [])

  return (
    <group position={[7.5, 0, 1.2]}>
      {/* Desk */}
      <mesh position={[0, 1.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.1, 2.3]} />
        <meshPhysicalMaterial color={0x1a2a38} roughness={0.55} metalness={0.3} clearcoat={0.4} />
      </mesh>
      {/* Legs */}
      {[[2.2, -1.05], [2.2, 1.05], [-2.2, -1.05], [-2.2, 1.05]].map(([lx, lz], i) => (
        <mesh key={i} position={[lx, 0.91, lz]} castShadow>
          <boxGeometry args={[0.08, 1.82, 0.08]} />
          <meshPhysicalMaterial color={0x1a2a38} roughness={0.4} metalness={0.7} />
        </mesh>
      ))}
      {/* Shelf */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4.6, 0.06, 2.0]} />
        <meshPhysicalMaterial color={0x142028} roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Monitor 1 */}
      <group position={[0, 0, -1]}>
        <mesh position={[0, 2.26, 0]}>
          <boxGeometry args={[0.08, 0.85, 0.08]} />
          <meshPhysicalMaterial color={0x2a3a48} roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.85, 0]}>
          <boxGeometry args={[0.55, 0.04, 0.38]} />
          <meshPhysicalMaterial color={0x2a3a48} roughness={0.4} metalness={0.7} />
        </mesh>
        <WallMonitor position={[0, 3.09, 0]} size={[2.6, 1.55]} section="about" label="My Profile" draw={drawProfile} onHover={onHover} onClick={onClick} />
      </group>
      {/* Monitor 2 */}
      <group position={[2.2, 0, -0.6]} rotation={[0, -0.28, 0]}>
        <mesh position={[0, 2.22, 0]}>
          <boxGeometry args={[0.06, 0.75, 0.06]} />
          <meshPhysicalMaterial color={0x2a3a48} roughness={0.4} metalness={0.7} />
        </mesh>
        <WallMonitor position={[0, 2.78, 0]} size={[1.75, 1.06]} section="skills" label="Skills Dashboard" draw={drawSkills} onHover={onHover} onClick={onClick} />
      </group>
      {/* Keyboard */}
      <mesh position={[0, 1.87, 0]}>
        <boxGeometry args={[1.3, 0.04, 0.45]} />
        <meshPhysicalMaterial color={0x141e28} roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Mouse */}
      <mesh position={[1.6, 1.855, -0.2]} scale={[1, 0.5, 1.3]}>
        <sphereGeometry args={[0.11, 10, 8]} />
        <meshPhysicalMaterial color={0x141e28} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Coffee */}
      <CoffeeMug position={[-1.3, 2.05, 0.3]} />
      {/* Headphones */}
      <mesh position={[-2, 2.2, -0.7]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.22, 0.026, 10, 24, Math.PI]} />
        <meshPhysicalMaterial color={0x141e28} roughness={0.5} metalness={0.5} />
      </mesh>
      {/* PC Tower on shelf */}
      <group position={[1.8, 0.955, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.85, 0.8]} />
          <meshPhysicalMaterial color={0x1a1a1a} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[-0.21, 0, 0]}>
          <boxGeometry args={[0.01, 0.82, 0.76]} />
          <meshPhysicalMaterial color={0x0a1420} roughness={0.05} transparent opacity={0.3} clearcoat={1.0} />
        </mesh>
        <pointLight ref={rgb} color={0x00ffe7} intensity={0.8} distance={1.5} />
        <mesh ref={fan1} position={[0, -0.2, 0.39]}>
          <circleGeometry args={[0.1, 12]} />
          <meshPhongMaterial color={0x050e18} emissive={0x4466ff} emissiveIntensity={0.35} />
        </mesh>
        <mesh ref={fan2} position={[0, 0.1, -0.39]}>
          <circleGeometry args={[0.12, 12]} />
          <meshPhongMaterial color={0x050e18} emissive={0x00ffe7} emissiveIntensity={0.2} />
        </mesh>
        <LED position={[-0.12, 0.4, 0.39]} baseColor={0x00ff88} />
        <LED position={[0.12, 0.4, 0.39]} baseColor={0x00ff88} />
      </group>
      {/* Desk glow */}
      <pointLight position={[0, 3.5, 1.5]} color={0x0055ff} intensity={1.2} distance={10} />
    </group>
  )
}

// Chair
function Chair() {
  return (
    <group position={[7.5, 0.75, 3.5]} rotation={[0, Math.PI, 0]}>
      <mesh>
        <boxGeometry args={[0.8, 0.07, 0.72]} />
        <meshPhysicalMaterial color={0x141e28} roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.51, -0.33]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.8, 0.95, 0.07]} />
        <meshPhysicalMaterial color={0x121a22} roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.65, 8]} />
        <meshPhysicalMaterial color={0x2a3a48} roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[0, -0.69, 0]}>
        <cylinderGeometry args={[0.38, 0.35, 0.06, 12]} />
        <meshPhysicalMaterial color={0x141e28} roughness={0.6} metalness={0.4} />
      </mesh>
      {Array.from({ length: 5 }).map((_, wi) => {
        const a = wi * ((Math.PI * 2) / 5)
        return (
          <mesh key={wi} position={[Math.cos(a) * 0.35, -0.75, Math.sin(a) * 0.35]}>
            <sphereGeometry args={[0.055, 6, 6]} />
            <meshPhysicalMaterial color={0x0a1218} roughness={0.7} metalness={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}

// Lebanon Internet Traffic Map - wall mounted display
function LebanonTrafficMap({ onHover, onClick }: { onHover?: (l: string | null) => void; onClick?: (s: string) => void }) {
  // Animated data flow particles
  const inboundParticles = useRef<THREE.Points>(null)
  const outboundParticles = useRef<THREE.Points>(null)
  
  // Lebanon approximate shape points (simplified)
  const lebanonOutline = useMemo(() => {
    // Simplified Lebanon shape - a narrow strip along Mediterranean
    const points = [
      new THREE.Vector2(0, 1.8),    // North
      new THREE.Vector2(0.3, 1.5),
      new THREE.Vector2(0.4, 1.0),
      new THREE.Vector2(0.5, 0.5),
      new THREE.Vector2(0.4, 0),
      new THREE.Vector2(0.3, -0.5),
      new THREE.Vector2(0.2, -1.0),
      new THREE.Vector2(0, -1.5),   // South
      new THREE.Vector2(-0.1, -1.0),
      new THREE.Vector2(-0.15, -0.5),
      new THREE.Vector2(-0.1, 0),
      new THREE.Vector2(-0.15, 0.5),
      new THREE.Vector2(-0.1, 1.0),
      new THREE.Vector2(-0.05, 1.5),
    ]
    const shape = new THREE.Shape(points)
    return shape
  }, [])
  
  // World connection points (major internet hubs)
  const worldHubs = useMemo(() => [
    { name: "Frankfurt", x: -1.8, y: 1.2, color: 0x00aaff },
    { name: "London", x: -2.2, y: 1.5, color: 0x00ff88 },
    { name: "Paris", x: -2.0, y: 1.0, color: 0x00ffcc },
    { name: "Dubai", x: 1.5, y: -0.3, color: 0xff8800 },
    { name: "Mumbai", x: 2.2, y: -0.8, color: 0xffcc00 },
    { name: "Singapore", x: 2.8, y: -1.2, color: 0xff00aa },
    { name: "New York", x: -3.0, y: 0.8, color: 0x00ff44 },
    { name: "São Paulo", x: -2.5, y: -1.5, color: 0xaaff00 },
  ], [])
  
  // Animated traffic flows
  const trafficFlows = useRef<{pos: number; speed: number; hub: number; inbound: boolean}[]>([])
  
  useEffect(() => {
    // Initialize traffic flow particles
    trafficFlows.current = Array.from({ length: 24 }).map((_, i) => ({
      pos: Math.random(),
      speed: 0.3 + Math.random() * 0.4,
      hub: Math.floor(Math.random() * worldHubs.length),
      inbound: i % 2 === 0
    }))
  }, [worldHubs.length])
  
  // Traffic stats
  const [stats, setStats] = useState({ inbound: 4.2, outbound: 1.8 })
  
  useEffect(() => {
    const iv = setInterval(() => {
      setStats({
        inbound: 4.0 + Math.random() * 0.8,
        outbound: 1.5 + Math.random() * 0.6
      })
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  // Draw the map on canvas
  const drawMap = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    const w = 1024, h = 768
    
    // Dark background with subtle grid
    ctx.fillStyle = "#0a1018"
    ctx.fillRect(0, 0, w, h)
    
    // Grid lines
    ctx.strokeStyle = "#1a2a3a"
    ctx.lineWidth = 1
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    
    // Title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 32px Arial"
    ctx.fillText("LEBANON INTERNET TRAFFIC", 30, 50)
    ctx.font = "18px Arial"
    ctx.fillStyle = "#6a8a9a"
    ctx.fillText("Real-time Data Flow Visualization", 30, 75)
    
    // World map outline (simplified - just major landmasses as context)
    ctx.strokeStyle = "#2a3a4a"
    ctx.lineWidth = 2
    // Europe
    ctx.beginPath()
    ctx.ellipse(200, 200, 120, 80, 0, 0, Math.PI * 2)
    ctx.stroke()
    // Africa
    ctx.beginPath()
    ctx.ellipse(280, 450, 100, 150, 0.2, 0, Math.PI * 2)
    ctx.stroke()
    // Asia
    ctx.beginPath()
    ctx.ellipse(600, 280, 180, 120, 0, 0, Math.PI * 2)
    ctx.stroke()
    // Americas
    ctx.beginPath()
    ctx.ellipse(80, 350, 60, 180, 0, 0, Math.PI * 2)
    ctx.stroke()
    
    // Lebanon position (center-ish, east Mediterranean)
    const lbX = 420, lbY = 300
    
    // Lebanon glow
    const gradient = ctx.createRadialGradient(lbX, lbY, 0, lbX, lbY, 80)
    gradient.addColorStop(0, "rgba(0, 255, 136, 0.4)")
    gradient.addColorStop(1, "rgba(0, 255, 136, 0)")
    ctx.fillStyle = gradient
    ctx.fillRect(lbX - 80, lbY - 80, 160, 160)
    
    // Lebanon shape
    ctx.fillStyle = "#00ff88"
    ctx.beginPath()
    ctx.moveTo(lbX, lbY - 35)
    ctx.lineTo(lbX + 12, lbY - 25)
    ctx.lineTo(lbX + 15, lbY - 10)
    ctx.lineTo(lbX + 12, lbY + 10)
    ctx.lineTo(lbX + 8, lbY + 30)
    ctx.lineTo(lbX, lbY + 35)
    ctx.lineTo(lbX - 5, lbY + 25)
    ctx.lineTo(lbX - 8, lbY + 10)
    ctx.lineTo(lbX - 6, lbY - 10)
    ctx.lineTo(lbX - 4, lbY - 25)
    ctx.closePath()
    ctx.fill()
    
    // Connection hubs
    const hubs = [
      { x: 180, y: 180, name: "Frankfurt", col: "#00aaff" },
      { x: 140, y: 150, name: "London", col: "#00ff88" },
      { x: 160, y: 200, name: "Paris", col: "#00ffcc" },
      { x: 580, y: 380, name: "Dubai", col: "#ff8800" },
      { x: 700, y: 420, name: "Mumbai", col: "#ffcc00" },
      { x: 800, y: 480, name: "Singapore", col: "#ff00aa" },
      { x: 60, y: 250, name: "New York", col: "#00ff44" },
      { x: 100, y: 550, name: "São Paulo", col: "#aaff00" },
    ]
    
    // Draw connection lines with animated particles
    for (let i = 0; i < hubs.length; i++) {
      const hub = hubs[i]
      
      // Connection line
      ctx.strokeStyle = hub.col + "40"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(lbX, lbY)
      ctx.lineTo(hub.x, hub.y)
      ctx.stroke()
      
      // Animated data packets
      const packetCount = 3
      for (let p = 0; p < packetCount; p++) {
        const progress = ((t * 0.5 + i * 0.1 + p * 0.33) % 1)
        const isInbound = p % 2 === 0
        const actualProgress = isInbound ? progress : 1 - progress
        const px = lbX + (hub.x - lbX) * actualProgress
        const py = lbY + (hub.y - lbY) * actualProgress
        
        ctx.fillStyle = isInbound ? "#00ff88" : "#ff6600"
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Hub marker
      ctx.fillStyle = hub.col
      ctx.beginPath()
      ctx.arc(hub.x, hub.y, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Hub label
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.fillText(hub.name, hub.x - 25, hub.y - 15)
    }
    
    // Lebanon label
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 16px Arial"
    ctx.fillText("LEBANON", lbX - 35, lbY + 60)
    ctx.font = "12px monospace"
    ctx.fillStyle = "#00ff88"
    ctx.fillText("● BEIRUT IX", lbX - 30, lbY + 78)
    
    // Stats panel
    ctx.fillStyle = "#0a1520"
    ctx.fillRect(750, 50, 250, 180)
    ctx.strokeStyle = "#00ff88"
    ctx.lineWidth = 2
    ctx.strokeRect(750, 50, 250, 180)
    
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 18px Arial"
    ctx.fillText("TRAFFIC STATS", 770, 80)
    
    // Inbound
    ctx.fillStyle = "#00ff88"
    ctx.font = "14px Arial"
    ctx.fillText("INBOUND", 770, 110)
    ctx.font = "bold 28px Arial"
    const inboundVal = (4.0 + Math.sin(t * 0.8) * 0.5).toFixed(1)
    ctx.fillText(inboundVal + " Gbps", 770, 140)
    
    // Outbound
    ctx.fillStyle = "#ff6600"
    ctx.font = "14px Arial"
    ctx.fillText("OUTBOUND", 770, 170)
    ctx.font = "bold 28px Arial"
    const outboundVal = (1.5 + Math.sin(t * 1.2) * 0.3).toFixed(1)
    ctx.fillText(outboundVal + " Gbps", 770, 200)
    
    // Status indicator
    ctx.fillStyle = "#00ff88"
    ctx.font = "14px Arial"
    ctx.fillText("● CONNECTED", 770, 225)
    
    // ISP breakdown
    ctx.fillStyle = "#0a1520"
    ctx.fillRect(750, 250, 250, 120)
    ctx.strokeStyle = "#0088ff"
    ctx.strokeRect(750, 250, 250, 120)
    
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Arial"
    ctx.fillText("TOP ISP PEERS", 770, 275)
    
    const isps = ["Ogero Telecom", "Touch LB", "Alfa Lebanon", "IDM"]
    const ispColors = ["#00aaff", "#ff6600", "#00ff88", "#ffcc00"]
    for (let i = 0; i < isps.length; i++) {
      ctx.fillStyle = ispColors[i]
      ctx.fillRect(770, 290 + i * 20, 8, 12)
      ctx.fillStyle = "#cccccc"
      ctx.font = "12px Arial"
      ctx.fillText(isps[i], 785, 300 + i * 20)
    }
  }, [])
  
  const tex = useCanvasTex(1024, 768, drawMap)
  
  return (
    <group 
      position={[10, 5, -12.7]} 
      onPointerOver={() => onHover?.("Lebanon Internet Traffic")} 
      onPointerOut={() => onHover?.(null)} 
      onClick={() => onClick?.("contact")}
    >
      {/* Monitor frame */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[5.5, 4.2, 0.15]} />
        <meshStandardMaterial color={0x181c20} roughness={0.7} />
      </mesh>
      
      {/* Monitor bezel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5.3, 4.0, 0.08]} />
        <meshStandardMaterial color={0x101418} roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Screen with canvas texture */}
      {tex && (
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[5.0, 3.75]} />
          <meshStandardMaterial map={tex} emissiveMap={tex} emissive={0xffffff} emissiveIntensity={1.2} />
        </mesh>
      )}
      
      {/* LED indicator light */}
      <mesh position={[2.4, -1.9, 0.05]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={0x00ff88} />
      </mesh>
      
      {/* Status text below */}
      <mesh position={[0, -2.3, 0.02]}>
        <planeGeometry args={[2.5, 0.25]} />
        <meshStandardMaterial color={0x00ff88} emissive={0x00ff88} emissiveIntensity={0.3} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

// Particles
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const vels = useRef<THREE.Vector3[]>([])
  const count = 150

  const pos = useMemo(() => {
    const p = new Float32Array(count * 3)
    const v: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 32
      p[i * 3 + 1] = Math.random() * 9.5
      p[i * 3 + 2] = (Math.random() - 0.5) * 18
      v.push(new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.01))
    }
    vels.current = v
    return p
  }, [])

  useFrame(() => {
    if (ref.current) {
      const p = ref.current.geometry.attributes.position.array as Float32Array
      const v = vels.current
      for (let i = 0; i < count; i++) {
        p[i * 3] += v[i].x
        p[i * 3 + 1] += v[i].y
        p[i * 3 + 2] += v[i].z
        if (Math.abs(p[i * 3]) > 16) v[i].x *= -1
        if (p[i * 3 + 1] > 9.5 || p[i * 3 + 1] < 0) v[i].y *= -1
        if (Math.abs(p[i * 3 + 2]) > 9) v[i].z *= -1
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={0x00ffe7} size={0.05} transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// Lighting - Realistic datacenter with bright overhead fluorescents
function Lights() {
  const fwGlow = useRef<THREE.PointLight>(null)
  const rackGlow = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Subtle equipment glow pulsing
    if (fwGlow.current) fwGlow.current.intensity = 0.6 + Math.sin(t * 1.3) * 0.15
    if (rackGlow.current) rackGlow.current.intensity = 0.4 + Math.sin(t * 0.75) * 0.1
  })

  return (
    <>
      {/* High ambient for bright datacenter look */}
      <ambientLight color={0xf8faff} intensity={1.0} />
      <hemisphereLight color={0xffffff} groundColor={0xe0e4e8} intensity={0.7} />
      {/* Main overhead directional - simulates fluorescent ceiling */}
      <directionalLight color={0xffffff} intensity={1.4} position={[0, 14, 2]} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight color={0xf8f8ff} intensity={0.8} position={[8, 12, 6]} />
      <directionalLight color={0xf8f8ff} intensity={0.6} position={[-8, 12, -4]} />
      {/* Overhead fluorescent row lights */}
      {[-12, -6, 0, 6, 12].map((x, i) => (
        <pointLight key={`fl${i}`} color={0xf5f8ff} intensity={1.8} distance={14} decay={2} position={[x, 9.5, 0]} />
      ))}
      {/* Subtle equipment accent glows - toned down for realism */}
      <pointLight ref={rackGlow} color={0x00ffe7} intensity={0.3} distance={6} position={[-8, 3.5, 0]} />
      <pointLight color={0x00ccff} intensity={0.2} distance={4} position={[7.5, 3.5, 1.5]} />
      <pointLight ref={fwGlow} color={0xff6600} intensity={0.4} distance={4} position={[0, 2.5, -3.5]} />
      <pointLight color={0x00ff88} intensity={0.15} distance={3} position={[7, 2.8, 3]} />
    </>
  )
}

// Scene content
function SceneContent({ onHover, onSectionClick }: { onHover: (l: string | null) => void; onSectionClick: (s: string) => void }) {
  return (
    <>
      <color attach="background" args={[0xe8ecf0]} />
      <fog attach="fog" args={[0xe8ecf0, 30, 80]} />
      <Lights />
      <Floor />
      <Room />
      <CableTray z={0} />
      <CableTray z={-3} />
<ServerRack x={-11} onHover={onHover} onClick={onSectionClick} />
  <ServerRack x={-8} onHover={onHover} onClick={onSectionClick} />
  <ServerRack x={-5} onHover={onHover} onClick={onSectionClick} />
  {/* Inter-rack fiber cables with data flow */}
  <InterRackCables rackX={-11} />
  <InterRackCables rackX={-8} />
  <InterRackCables rackX={-5} />
      <WallMonitors onHover={onHover} onClick={onSectionClick} />
      <Workstation onHover={onHover} onClick={onSectionClick} />
      <Chair />
      <LebanonTrafficMap onHover={onHover} onClick={onSectionClick} />
      <Particles />
      <OrbitControls enableDamping dampingFactor={0.07} maxPolarAngle={Math.PI / 2.05} minDistance={4} maxDistance={30} target={[0, 3, 0]} />
      <EffectComposer>
        <Bloom intensity={0.15} luminanceThreshold={0.95} luminanceSmoothing={0.5} />
      </EffectComposer>
    </>
  )
}

// Boot loader
function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => {
      setPct((p) => {
        const n = p + Math.random() * 7
        if (n >= 100) {
          clearInterval(iv)
          setTimeout(onComplete, 500)
          return 100
        }
        return n
      })
    }, 55)
    return () => clearInterval(iv)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100] bg-[#020608] flex flex-col items-center justify-center">
      <div className="text-[clamp(4rem,12vw,10rem)] font-bold tracking-[0.05em] text-[#00ffe7] leading-[0.9] text-center" style={{ textShadow: "0 0 18px #00ffe7aa" }}>
        MO<span className="text-[#ff4d00]">.</span>
        <br />
        YASSIN
      </div>
      <div className="mt-6 text-[0.7rem] tracking-[0.4em] text-[#2a4a60] uppercase text-center font-mono">Network Engineer · Developer · Educator</div>
      <div className="w-[220px] h-[2px] bg-[#00ffe710] mt-12 rounded overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#0080ff] to-[#00ffe7]" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-3 text-[0.65rem] text-[#00ffe7] tracking-[0.2em] font-mono">BOOTING DATACENTER... {Math.floor(pct)}%</div>
    </div>
  )
}

// Top bar
function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-8 py-3 bg-gradient-to-b from-[rgba(2,6,8,0.95)] to-transparent border-b border-[#00ffe712]">
      <div className="text-[1.9rem] tracking-[0.1em] text-[#00ffe7] font-bold" style={{ textShadow: "0 0 18px #00ffe7aa" }}>
        MO<span className="text-[#ff4d00]">.</span>YASSIN
      </div>
      <div className="flex gap-10 items-center">
        <div className="text-[0.6rem] tracking-[0.2em] text-[#2a4a60] uppercase font-mono">
          Status: <strong className="text-[#00ffe7]">ONLINE</strong>
        </div>
        <div className="text-[0.6rem] tracking-[0.2em] text-[#2a4a60] uppercase font-mono">
          Racks: <strong className="text-[#00ffe7]">A · B · C ACTIVE</strong>
        </div>
        <div className="text-[0.6rem] tracking-[0.2em] text-[#2a4a60] uppercase font-mono">
          Click objects to explore <span className="animate-pulse text-[#00ffe7]">▌</span>
        </div>
      </div>
    </div>
  )
}

// Side nav
function SideNav({ active, onClick }: { active: string | null; onClick: (s: string) => void }) {
  const items = [
    { id: "about", label: "Profile" },
    { id: "skills", label: "Skills" },
    { id: "rack", label: "Infra" },
    { id: "firewall", label: "Security" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3.5">
      {items.map((item) => (
        <div key={item.id} className={`flex items-center gap-3 cursor-pointer transition-opacity duration-300 ${active === item.id ? "opacity-100" : "opacity-30"}`} onClick={() => onClick(item.id)}>
          <div className={`h-[1px] bg-[#00ffe7] transition-all duration-300 ${active === item.id ? "w-8" : "w-[18px]"}`} />
          <div className="text-[0.55rem] tracking-[0.22em] text-[#00ffe7] uppercase font-mono">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

// Panel
function Panel({ section, onClose }: { section: string | null; onClose: () => void }) {
  const data = section ? SECTIONS[section] : null
  return (
    <div className={`fixed right-0 top-0 bottom-0 w-[460px] z-30 bg-[rgba(2,8,16,0.97)] border-l border-[#00ffe720] transition-transform duration-500 ease-out flex flex-col overflow-hidden backdrop-blur-sm ${section ? "translate-x-0" : "translate-x-full"}`}>
      {data && (
        <>
          <div className="p-6 pb-4 border-b border-[#00ffe715] flex justify-between items-start shrink-0">
            <div>
              <div className="text-[0.62rem] tracking-[0.35em] text-[#ff4d00] uppercase mb-2 font-mono">{data.ey}</div>
              <div className="text-[2.2rem] tracking-[0.06em] text-white leading-none font-bold">{data.ti}</div>
            </div>
            <button onClick={onClose} className="bg-transparent border border-[#00ffe730] text-[#00ffe7] text-[0.7rem] tracking-[0.15em] px-3 py-1.5 cursor-pointer transition-all hover:bg-[#00ffe7] hover:text-black font-mono">
              [ CLOSE ]
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6" dangerouslySetInnerHTML={{ __html: data.body }} />
        </>
      )}
      <style jsx global>{`
        .p-s { margin-bottom: 1.8rem; }
        .p-l { font-family: monospace; font-size: 0.62rem; letter-spacing: 0.3em; color: #2a4a60; text-transform: uppercase; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.6rem; }
        .p-l::before { content: ''; display: block; width: 20px; height: 1px; background: #00ffe7; }
        .p-tx { font-size: 0.96rem; font-weight: 300; line-height: 1.85; color: #b8dff5; opacity: 0.85; }
        .p-sgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 0.8rem; }
        .p-sc { border: 1px solid #00ffe718; background: #00ffe706; padding: 1rem; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%); }
        .p-sn { font-size: 2rem; font-weight: bold; color: #00ffe7; }
        .p-sl { font-family: monospace; font-size: 0.58rem; letter-spacing: 0.15em; color: #2a4a60; text-transform: uppercase; }
        .p-cr { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.8rem; }
        .p-ch { font-family: monospace; font-size: 0.6rem; letter-spacing: 0.15em; color: #00ffe7; border: 1px solid #00ffe730; padding: 0.25rem 0.7rem; text-transform: uppercase; }
        .p-ch.o { color: #ff4d00; border-color: #ff4d0040; }
        .skr { margin-bottom: 0.8rem; }
        .skr-t { display: flex; justify-content: space-between; font-family: monospace; font-size: 0.62rem; color: #b8dff5; margin-bottom: 0.4rem; }
        .skr-bg { background: #00ffe710; height: 2px; border-radius: 1px; }
        .skr-f { height: 100%; background: linear-gradient(to right, #0080ff, #00ffe7); box-shadow: 0 0 6px #00ffe7; }
        .p-pr { border: 1px solid #00ffe715; background: #00ffe705; padding: 1rem; margin-bottom: 0.8rem; position: relative; }
        .p-pr::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, #00ffe7, transparent); }
        .p-pt { font-size: 1.2rem; font-weight: bold; letter-spacing: 0.06em; color: #fff; }
        .p-pd { font-size: 0.85rem; color: #b8dff5; opacity: 0.7; margin-top: 0.3rem; line-height: 1.6; }
      `}</style>
    </div>
  )
}

// Tooltip
function Tooltip({ label }: { label: string | null }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX + 18, y: e.clientY - 12 })
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])
  return (
    <div
      className={`fixed z-25 pointer-events-none text-[0.62rem] tracking-[0.15em] text-white bg-[rgba(0,255,231,0.1)] border border-[#00ffe7] px-4 py-1.5 uppercase whitespace-nowrap transition-opacity duration-200 font-mono ${label ? "opacity-100" : "opacity-0"}`}
      style={{ left: pos.x, top: pos.y, clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)" }}
    >
      {">"} {label}
    </div>
  )
}

// Camera hint
function CameraHint() {
  return (
    <div className="fixed bottom-6 right-6 z-20 text-[0.57rem] tracking-[0.15em] text-[#2a4a60] text-right leading-[2.2] pointer-events-none font-mono">
      DRAG · ORBIT
      <br />
      SCROLL · ZOOM
      <br />
      CLICK · EXPLORE
    </div>
  )
}

// Custom cursor
function Cursor({ hovering }: { hovering: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])
  useEffect(() => {
    const iv = setInterval(() => setRingPos((p) => ({ x: p.x + (pos.x - p.x) * 0.1, y: p.y + (pos.y - p.y) * 0.1 })), 16)
    return () => clearInterval(iv)
  }, [pos])
  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-all duration-100"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)", width: hovering ? 20 : 10, height: hovering ? 20 : 10, background: hovering ? "#fff" : "#00ffe7", boxShadow: hovering ? "0 0 16px #fff" : "0 0 10px #00ffe7" }}
      />
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border transition-all duration-200"
        style={{ left: ringPos.x, top: ringPos.y, transform: "translate(-50%, -50%)", width: hovering ? 46 : 30, height: hovering ? 46 : 30, borderColor: hovering ? "#fff" : "#00ffe7", opacity: hovering ? 0.8 : 0.4 }}
      />
    </>
  )
}

// Main export
export default function DatacenterScene() {
  const [booting, setBooting] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [showUI, setShowUI] = useState(false)

  const handleBootComplete = useCallback(() => {
    setBooting(false)
    setTimeout(() => setShowUI(true), 100)
  }, [])

  return (
    <div className="w-full h-screen bg-[#020608] overflow-hidden cursor-none">
      <Cursor hovering={!!hovered} />
      {booting && <BootLoader onComplete={handleBootComplete} />}
      <Canvas camera={{ fov: 52, near: 0.1, far: 200, position: [6, 5, 10] }} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }} style={{ opacity: booting ? 0 : 1, transition: "opacity 0.8s" }}>
        <Suspense fallback={null}>
          <SceneContent onHover={setHovered} onSectionClick={setActiveSection} />
        </Suspense>
      </Canvas>
      {showUI && (
        <>
          <TopBar />
          <SideNav active={activeSection} onClick={setActiveSection} />
          <Panel section={activeSection} onClose={() => setActiveSection(null)} />
          <Tooltip label={hovered} />
          <CameraHint />
          <div className="fixed inset-0 pointer-events-none z-[9990]" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,231,0.01) 2px, rgba(0,255,231,0.01) 4px)" }} />
        </>
      )}
    </div>
  )
}
