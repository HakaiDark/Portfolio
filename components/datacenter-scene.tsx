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

// Floor with tiles and grid
function Floor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 50]} />
        <meshPhysicalMaterial color={0x080e14} roughness={0.4} metalness={0.15} clearcoat={0.1} />
      </mesh>
      {/* Raised floor tiles - reduced count for performance */}
      {Array.from({ length: 16 }).map((_, fx) =>
        Array.from({ length: 11 }).map((_, fz) => (
          <mesh key={`t-${fx}-${fz}`} position={[(fx - 7.5) * 2, 0.02, (fz - 5) * 2]} receiveShadow>
            <boxGeometry args={[1.95, 0.04, 1.95]} />
            <meshPhysicalMaterial color={0x0a1218} roughness={0.75} metalness={0.2} clearcoat={0.15} />
          </mesh>
        ))
      )}
      <gridHelper args={[60, 60, 0x00ffe7, 0x00ffe7]} position={[0, 0.01, 0]}>
        <meshBasicMaterial transparent opacity={0.06} />
      </gridHelper>
    </group>
  )
}

// Room walls and ceiling
function Room() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 6, -13]}>
        <boxGeometry args={[60, 12, 0.15]} />
        <meshPhysicalMaterial color={0x050d14} roughness={0.9} metalness={0.08} />
      </mesh>
      {/* Side walls */}
      <mesh position={[22, 6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[26, 12, 0.15]} />
        <meshPhysicalMaterial color={0x050d14} roughness={0.9} metalness={0.08} />
      </mesh>
      <mesh position={[-22, 6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[26, 12, 0.15]} />
        <meshPhysicalMaterial color={0x050d14} roughness={0.9} metalness={0.08} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 10.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 26]} />
        <meshPhongMaterial color={0x030a12} />
      </mesh>
      {/* Ceiling neon strips */}
      {[-14, -7, 0, 7, 14].map((x, i) => (
        <group key={`neon-${i}`}>
          <mesh position={[x, 9.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 14, 8]} />
            <meshBasicMaterial color={0xaaddff} />
          </mesh>
          <pointLight position={[x, 9.5, 0]} color={0x6699cc} intensity={0.6} distance={10} />
        </group>
      ))}
    </group>
  )
}

// Cable tray with fibers
function CableTray({ z }: { z: number }) {
  const colors = [0xffcc00, 0x00cccc, 0x00ff88, 0xff6600, 0x0088ff]
  return (
    <group>
      <mesh position={[-3, 8.8, z]}>
        <boxGeometry args={[30, 0.04, 0.5]} />
        <meshPhysicalMaterial color={0x1a2830} roughness={0.5} metalness={0.7} />
      </mesh>
      {colors.map((col, fb) => {
        const pts = Array.from({ length: 21 }).map((_, fs) => {
          const t = fs / 20
          return new THREE.Vector3(-18 + t * 36, 8.82, z - 0.15 + fb * 0.08 + Math.sin(t * Math.PI * 4 + fb) * 0.02)
        })
        const curve = new THREE.CatmullRomCurve3(pts)
        return (
          <mesh key={fb}>
            <tubeGeometry args={[curve, 20, 0.018, 6, false]} />
            <meshPhysicalMaterial color={col} roughness={0.3} clearcoat={0.8} transparent opacity={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

// Rack device component
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
  const col = type === "fw" ? 0xeeeeee : type === "switch" ? 0x041424 : type === "srv" ? 0x050505 : 0x111111
  return (
    <group
      position={[0, y, 0]}
      onPointerOver={() => label && onHover?.(label)}
      onPointerOut={() => onHover?.(null)}
      onClick={() => section && onClick?.(section)}
    >
      <mesh castShadow>
        <boxGeometry args={[2.12, h, 1.08]} />
        <meshPhysicalMaterial color={col} roughness={type === "fw" ? 0.6 : 0.45} metalness={type === "fw" ? 0.1 : 0.65} clearcoat={0.35} />
      </mesh>
      {/* Ears */}
      {[-1.04, 1.04].map((ex, i) => (
        <mesh key={i} position={[ex, 0, 0.54]}>
          <boxGeometry args={[0.15, h - 0.02, 0.04]} />
          <meshPhysicalMaterial color={0x2a3a4a} roughness={0.4} metalness={0.8} />
        </mesh>
      ))}
      {/* Type-specific */}
      {type === "switch" && (
        <>
          <mesh position={[0.1, 0, 0.55]}>
            <boxGeometry args={[1.6, h * 0.7, 0.02]} />
            <meshPhysicalMaterial color={0x111111} roughness={0.8} />
          </mesh>
          {Array.from({ length: 24 }).map((_, sp) => {
            const px = -0.6 + (sp % 12) * 0.12
            const py = sp < 12 ? 0.08 : -0.08
            return (
              <group key={sp}>
                <mesh position={[px, py, 0.56]}>
                  <boxGeometry args={[0.08, 0.06, 0.04]} />
                  <meshPhongMaterial color={0x050505} />
                </mesh>
                <LED position={[px, py - 0.04, 0.58]} baseColor={0x00ff88} altColor={0x113311} rate={2 + Math.random() * 5} offset={Math.random() * 6} size={0.0075} />
              </group>
            )
          })}
        </>
      )}
      {type === "fw" && (
        <>
          <mesh position={[0, -h / 2 + 0.06, 0.55]}>
            <boxGeometry args={[2.12, 0.04, 0.02]} />
            <meshPhongMaterial color={0xcc0000} />
          </mesh>
          <mesh position={[-0.25, 0, 0.55]}>
            <boxGeometry args={[1.4, h * 0.8, 0.02]} />
            <meshPhysicalMaterial color={0x111111} roughness={0.7} />
          </mesh>
          {Array.from({ length: 16 }).map((_, pp) => {
            const px = -0.85 + (pp % 8) * 0.14
            const py = pp < 8 ? 0.12 : -0.12
            return <LED key={pp} position={[px, py - 0.07, 0.59]} baseColor={0x00ff00} altColor={0x003300} rate={3 + Math.random() * 4} offset={Math.random() * 6} size={0.0075} />
          })}
          <mesh position={[0.65, 0.1, 0.55]}>
            <boxGeometry args={[0.4, 0.25, 0.03]} />
            <meshBasicMaterial color={0x001100} />
          </mesh>
          <mesh position={[0.65, 0.1, 0.565]}>
            <boxGeometry args={[0.36, 0.2, 0.01]} />
            <meshBasicMaterial color={0x00ff44} transparent opacity={0.8} />
          </mesh>
        </>
      )}
      {type === "srv" && (
        <>
          {Array.from({ length: 12 }).map((_, db) => {
            const bx = -0.7 + (db % 6) * 0.22
            const by = db < 6 ? 0.15 : -0.15
            return (
              <group key={db}>
                <mesh position={[bx, by, 0.55]}>
                  <boxGeometry args={[0.18, 0.26, 0.04]} />
                  <meshPhysicalMaterial color={0x8899aa} roughness={0.4} metalness={0.8} />
                </mesh>
                <LED position={[bx + 0.06, by, 0.58]} baseColor={0x4488ff} altColor={0x112244} rate={8 + Math.random() * 10} offset={Math.random() * 6} size={0.012} />
              </group>
            )
          })}
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
    <group position={[0, 7, -12.5]}>
      <WallMonitor position={[-3, 1.2, 0]} size={[1.4, 0.9]} section="about" label="NIST Compliance" draw={drawNist} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[0, 1.4, 0]} size={[1.0, 0.65]} section="skills" label="Cisco DNA" draw={drawDna} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[3, 1.2, 0]} size={[1.4, 0.9]} section="firewall" label="FortiAnalyzer" draw={drawLogs} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[-3, 0, 0]} size={[1.4, 0.9]} section="rack" label="OSPF Topology" draw={drawOspf} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[0, 0, 0]} size={[1.4, 0.9]} section="skills" label="PRTG Sensors" draw={drawPrtg} onHover={onHover} onClick={onClick} />
      <WallMonitor position={[3, 0, 0]} size={[1.4, 0.9]} section="projects" label="Projects Hub" draw={drawProjects} onHover={onHover} onClick={onClick} />
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

// Contact sphere
function ContactSphere({ onHover, onClick }: { onHover?: (l: string | null) => void; onClick?: (s: string) => void }) {
  const sphere = useRef<THREE.Mesh>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (ring1.current) ring1.current.rotation.x += 0.01
    if (ring2.current) ring2.current.rotation.y += 0.015
    if (glow.current) glow.current.intensity = 1.8 + Math.sin(t * 1.9) * 0.8
    if (sphere.current) {
      ;(sphere.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.55 + Math.sin(t * 1.9) * 0.32
    }
  })

  return (
    <group position={[12, 2.5, -3]} onPointerOver={() => onHover?.("Contact Me")} onPointerOut={() => onHover?.(null)} onClick={() => onClick?.("contact")}>
      <mesh ref={sphere}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial color={0x00ffe7} emissive={0x00ffe7} emissiveIntensity={0.55} roughness={0.1} metalness={0.2} clearcoat={1.0} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshBasicMaterial color={0x00ffe7} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.02, 16, 64]} />
        <meshBasicMaterial color={0x0088ff} transparent opacity={0.4} />
      </mesh>
      <pointLight ref={glow} color={0x00ffe7} intensity={1.2} distance={5} />
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

// Lighting
function Lights() {
  const fwGlow = useRef<THREE.PointLight>(null)
  const rackGlow = useRef<THREE.PointLight>(null)
  const contactGlow = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (fwGlow.current) fwGlow.current.intensity = 2.5 + Math.sin(t * 1.3) * 0.7
    if (rackGlow.current) rackGlow.current.intensity = 3.5 + Math.sin(t * 0.75) * 0.8
    if (contactGlow.current) contactGlow.current.intensity = 1.8 + Math.sin(t * 1.9) * 0.8
  })

  return (
    <>
      <ambientLight color={0x1a2a3a} intensity={1.2} />
      <hemisphereLight color={0x224466} groundColor={0x080810} intensity={1.0} />
      <directionalLight color={0x6699cc} intensity={0.8} position={[4, 14, 6]} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight color={0x334466} intensity={0.4} position={[5, 8, 15]} />
      <pointLight ref={rackGlow} color={0x00ffe7} intensity={1.5} distance={16} position={[-8, 3.5, 0]} />
      <pointLight color={0x0055ff} intensity={1.2} distance={10} position={[7.5, 3.5, 1.5]} />
      <pointLight ref={fwGlow} color={0xff4400} intensity={1.5} distance={8} position={[0, 2.5, -3.5]} />
      <pointLight color={0x00ffe7} intensity={1.0} distance={5} position={[7, 2.8, 3]} />
      <pointLight ref={contactGlow} color={0x00ffe7} intensity={1.2} distance={5} position={[12, 2.5, -3]} />
      <pointLight color={0x0088ff} intensity={1.0} distance={10} position={[-8, 7, 0]} />
      <pointLight color={0x00ff88} intensity={0.8} distance={8} position={[-5, 2, 2]} />
    </>
  )
}

// Scene content
function SceneContent({ onHover, onSectionClick }: { onHover: (l: string | null) => void; onSectionClick: (s: string) => void }) {
  return (
    <>
      <color attach="background" args={[0x020608]} />
      <fog attach="fog" args={[0x020608, 0, 60]} />
      <Lights />
      <Floor />
      <Room />
      <CableTray z={0} />
      <CableTray z={-3} />
      <ServerRack x={-11} onHover={onHover} onClick={onSectionClick} />
      <ServerRack x={-8} onHover={onHover} onClick={onSectionClick} />
      <ServerRack x={-5} onHover={onHover} onClick={onSectionClick} />
      <WallMonitors onHover={onHover} onClick={onSectionClick} />
      <Workstation onHover={onHover} onClick={onSectionClick} />
      <Chair />
      <ContactSphere onHover={onHover} onClick={onSectionClick} />
      <Particles />
      <OrbitControls enableDamping dampingFactor={0.07} maxPolarAngle={Math.PI / 2.05} minDistance={4} maxDistance={30} target={[0, 3, 0]} />
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.9} luminanceSmoothing={0.4} />
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
