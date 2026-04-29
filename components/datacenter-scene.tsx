"use client"

import { Suspense, useRef, useState, useEffect, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, BakeShadows, Preload } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

// Content data matching the reference
const SECTIONS: Record<string, { ey: string; ti: string; body: string }> = {
about: {
  ey: "01 // Profile",
  ti: "MOHAMMAD YASSIN",
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
<div class="p-s"><div class="p-l">Email</div><div class="p-tx" style="color:var(--accent);font-family:monospace;font-size:.85rem;letter-spacing:.1em">mohammad.yassin@network.io</div></div>
<div class="p-s"><div class="p-l">Platforms</div><div class="p-cr"><span class="p-ch">LinkedIn</span><span class="p-ch">GitHub</span><span class="p-ch o">Bayt.com</span></div></div>
<div class="p-s"><div class="p-l">Status</div><div class="p-tx" style="color:#00ff88;font-family:monospace;font-size:.8rem">● AVAILABLE — Pursuing NSE 4 Certification</div></div>`,
  },
  experience: {
    ey: "07 // Career",
    ti: "EXPERIENCE",
    body: `<div class="p-pr"><div class="p-pt">Senior Network Security Engineer</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">Enterprise Infrastructure | 2022 - Present</div><div class="p-pd">Architected and deployed multi-site SD-WAN infrastructure using FortiGate 600E/200F clusters with BGP ECMP load balancing across 40G MPLS uplinks. Implemented zero-trust network segmentation using FortiManager 7.4 ADOM-based policy orchestration across 500+ firewall policies. Configured advanced threat prevention with FortiSandbox integration, achieving 99.97% malware detection rate. Managed FortiAnalyzer SOC dashboards with custom SIEM correlation rules and automated incident response playbooks.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">FortiGate HA</span><span class="p-ch">SD-WAN</span><span class="p-ch">BGP/OSPF</span><span class="p-ch o">VDOM</span><span class="p-ch o">SSL Inspection</span></div></div>
<div class="p-pr"><div class="p-pt">Network Access Control Specialist</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">802.1X Implementation | 2021 - 2022</div><div class="p-pd">Deployed enterprise-wide 802.1X NAC using Aruba ClearPass 6.9 with EAP-TLS machine authentication against Active Directory Certificate Services (ADCS) PKI. Configured dynamic VLAN assignment based on device posture assessment, reducing lateral movement risk by 85%. Implemented RADIUS CoA for real-time policy enforcement and TACACS+ for network device AAA with command authorization. Integrated with Palo Alto Panorama for cross-platform threat intelligence sharing.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">ClearPass</span><span class="p-ch">802.1X EAP-TLS</span><span class="p-ch">PKI/ADCS</span><span class="p-ch o">RADIUS CoA</span><span class="p-ch o">TACACS+</span></div></div>
<div class="p-pr"><div class="p-pt">Data Center Network Engineer</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">Infrastructure Design | 2019 - 2021</div><div class="p-pd">Designed and deployed Cisco Nexus 9000 series spine-leaf fabric with VXLAN EVPN overlay supporting 10,000+ virtual workloads. Configured BGP EVPN Type-2/Type-5 routes for L2/L3 VNI mobility across data center pods. Implemented Cisco ACI multi-site orchestration with MSO for disaster recovery spanning three geographic locations. Managed 100G backbone infrastructure with QoS traffic shaping for mission-critical applications.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">Nexus 9K</span><span class="p-ch">VXLAN EVPN</span><span class="p-ch">ACI MSO</span><span class="p-ch o">Spine-Leaf</span><span class="p-ch o">100G</span></div></div>
<div class="p-pr"><div class="p-pt">ICT Systems Administrator</div><div class="p-pd" style="font-size:0.7rem;color:#00ffe7;margin-bottom:0.5rem">Education Sector | 2018 - 2019</div><div class="p-pd">Managed VMware vSphere 7.0 hyperconverged infrastructure with vSAN stretched clusters for high availability. Administered Windows Server 2019 Active Directory with Group Policy deployment for 2,000+ endpoints. Implemented Veeam Backup & Replication with immutable repositories for ransomware protection. Configured PRTG Network Monitor with custom sensors for SLA compliance reporting.</div><div class="p-cr" style="margin-top:.6rem"><span class="p-ch">VMware vSphere</span><span class="p-ch">Active Directory</span><span class="p-ch">Veeam</span><span class="p-ch o">PRTG</span><span class="p-ch o">PowerShell</span></div></div>`,
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
  const isBase = useRef(true)
  useFrame(({ clock }) => {
    if (ref.current && rate > 0) {
      const on = Math.sin(clock.elapsedTime * rate + offset) > 0.18
      if (on !== isBase.current) {
        ;(ref.current.material as THREE.MeshBasicMaterial).color.setHex(on ? baseColor : altColor)
        isBase.current = on
      }
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

// Warning label component
function WarningLabel({ position, rotation = [0, 0, 0], text }: { position: [number, number, number]; rotation?: [number, number, number]; text: string }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[0.8, 0.25]} />
        <meshStandardMaterial color={0xffcc00} />
      </mesh>
      <Text
        fontSize={0.06}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.01]}
        font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf"
      >
        {text}
      </Text>
    </group>
  )
}

// Fire suppression system nozzle
function FireSuppressionNozzle({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Nozzle head */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 12]} />
        <meshStandardMaterial color={0xcc0000} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Deflector plate */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 12]} />
        <meshStandardMaterial color={0x888888} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Emergency exit sign
function ExitSign({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.8, 0.3, 0.08]} />
        <meshStandardMaterial color={0x00aa00} emissive={0x00ff00} emissiveIntensity={0.5} />
      </mesh>
      <Text
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.045]}
        font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf"
      >
        EXIT
      </Text>
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
      <mesh position={[0, 13.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 26]} />
        <meshStandardMaterial color={0xf5f7fa} roughness={0.9} />
      </mesh>
      {/* Ceiling tile grid */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`cgx${i}`} position={[-28 + i * 3, 13.05, 0]}>
          <boxGeometry args={[0.02, 0.02, 26]} />
          <meshStandardMaterial color={0xd0d4d8} />
        </mesh>
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={`cgz${i}`} position={[0, 13.05, -13 + i * 3.25]}>
          <boxGeometry args={[60, 0.02, 0.02]} />
          <meshStandardMaterial color={0xd0d4d8} />
        </mesh>
      ))}
      {/* Fluorescent light fixtures - bright white panels */}
      {[-12, -6, 0, 6, 12].map((x, i) => (
        <group key={`light-${i}`}>
          {/* Light fixture housing */}
          <mesh position={[x, 12.95, 0]}>
            <boxGeometry args={[0.8, 0.1, 12]} />
            <meshStandardMaterial color={0xffffff} metalness={0.2} roughness={0.4} />
          </mesh>
          {/* Emissive light panel */}
          <mesh position={[x, 12.88, 0]}>
            <boxGeometry args={[0.7, 0.02, 11.5]} />
            <meshStandardMaterial color={0xffffff} emissive={0xffffff} emissiveIntensity={2.0} />
          </mesh>
        </group>
      ))}
      {/* Cable trays - silver metal */}
      <mesh position={[0, 12.2, -4]}>
        <boxGeometry args={[20, 0.1, 0.8]} />
        <meshStandardMaterial color={0x909498} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 12.2, 4]}>
        <boxGeometry args={[20, 0.1, 0.8]} />
        <meshStandardMaterial color={0x909498} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Fire suppression system nozzles */}
      {[-15, -10, -5, 0, 5, 10, 15].map((x, i) => (
        <FireSuppressionNozzle key={`fire${i}`} position={[x, 12.9, -6]} />
      ))}
      {[-15, -10, -5, 0, 5, 10, 15].map((x, i) => (
        <FireSuppressionNozzle key={`fire2${i}`} position={[x, 12.9, 6]} />
      ))}
      
      {/* Warning labels on walls */}
      <WarningLabel position={[-18, 2, -12.9]} text="CAUTION: HIGH VOLTAGE" />
      <WarningLabel position={[-18, 2, 12.9]} rotation={[0, Math.PI, 0]} text="AUTHORIZED PERSONNEL ONLY" />
      <WarningLabel position={[15, 2, -12.9]} text="FIRE SUPPRESSION ZONE" />
      
      {/* Exit signs */}
      <ExitSign position={[21.85, 8.5, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <ExitSign position={[-21.85, 8.5, 0]} rotation={[0, Math.PI / 2, 0]} />
      
      {/* HVAC vents on walls */}
      {[-15, -5, 5, 15].map((x, i) => (
        <group key={`vent${i}`} position={[x, 1.5, -12.9]}>
          <mesh>
            <boxGeometry args={[2, 0.8, 0.05]} />
            <meshStandardMaterial color={0xd0d4d8} metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Vent slats */}
          {Array.from({ length: 8 }).map((_, j) => (
            <mesh key={j} position={[-0.8 + j * 0.23, 0, 0.03]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[0.18, 0.6, 0.01]} />
              <meshStandardMaterial color={0xb0b4b8} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Temperature/humidity sensor */}
      <group position={[-20, 3, -12.9]}>
        <mesh>
          <boxGeometry args={[0.2, 0.3, 0.08]} />
          <meshStandardMaterial color={0xf0f0f0} />
        </mesh>
        <mesh position={[0, 0.05, 0.045]}>
          <planeGeometry args={[0.12, 0.12]} />
          <meshBasicMaterial color={0x00ff88} />
        </mesh>
      </group>
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

// Realistic cable tray with organized fiber bundles and cable ties
function CableTray({ z }: { z: number }) {
  const singleModeFibers = [0xffcc00, 0xffcc00, 0xffcc00, 0xffcc00] // Yellow SM
  const multiModeFibers  = [0x00cccc, 0x00cccc, 0x00cccc, 0x00cccc] // Aqua OM4
  const copperBundles    = [0x0066cc, 0x0066cc, 0x0066cc]            // Blue Cat6A

  return (
    <group>
      {/* Galvanized steel cable tray - ladder style */}
      <mesh position={[-3, 11.88, z]}>
        <boxGeometry args={[32, 0.04, 0.7]} />
        <meshPhysicalMaterial color={0x808488} metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Tray side rails */}
      <mesh position={[-3, 11.92, z - 0.33]}>
        <boxGeometry args={[32, 0.12, 0.03]} />
        <meshPhysicalMaterial color={0x707478} metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[-3, 11.92, z + 0.33]}>
        <boxGeometry args={[32, 0.12, 0.03]} />
        <meshPhysicalMaterial color={0x707478} metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Cross rungs */}
      {Array.from({ length: 22 }).map((_, r) => (
        <mesh key={r} position={[-17 + r * 1.5, 11.88, z]}>
          <boxGeometry args={[0.025, 0.03, 0.64]} />
          <meshPhysicalMaterial color={0x606468} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Single-mode fiber bundle (yellow) - for 40G/100G */}
      {singleModeFibers.map((col, fb) => {
        const pts = Array.from({ length: 30 }).map((_, fs) => {
          const t = fs / 29
          const sag = Math.sin(t * Math.PI) * 0.015
          const wobble = Math.sin(t * Math.PI * 3 + fb) * 0.008
          return new THREE.Vector3(-17 + t * 34, 11.92 + sag + wobble, z - 0.22 + fb * 0.035)
        })
        return <FiberCable key={`sm${fb}`} points={pts} color={col} pulseCount={5} />
      })}
      {/* Multi-mode fiber bundle (aqua OM4) - for 10G */}
      {multiModeFibers.map((col, fb) => {
        const pts = Array.from({ length: 30 }).map((_, fs) => {
          const t = fs / 29
          const sag = Math.sin(t * Math.PI) * 0.018
          const wobble = Math.sin(t * Math.PI * 2.5 + fb * 1.2) * 0.006
          return new THREE.Vector3(-17 + t * 34, 11.93 + sag + wobble, z + fb * 0.035)
        })
        return <FiberCable key={`mm${fb}`} points={pts} color={col} pulseCount={4} />
      })}
      {/* Copper Cat6A bundle - for management/1G */}
      {copperBundles.map((col, cb) => {
        const pts = Array.from({ length: 30 }).map((_, fs) => {
          const t = fs / 29
          const sag = Math.sin(t * Math.PI) * 0.02
          return new THREE.Vector3(-17 + t * 34, 11.91 + sag, z + 0.18 + cb * 0.04)
        })
        return <CopperCable key={`cu${cb}`} points={pts} color={col} pulseCount={2} thickness={0.015} />
      })}
      {/* Velcro cable ties at intervals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <CableTie key={i} position={[-15 + i * 2.5, 11.95, z]} width={0.5} />
      ))}
    </group>
  )
}

// Copper Ethernet cable with animated data pulses
function CopperCable({ points, color, pulseCount = 2, thickness = 0.012 }: { points: THREE.Vector3[]; color: number; pulseCount?: number; thickness?: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5), [points])
  return (
    <group>
      {/* Cable jacket with realistic PVC look */}
      <mesh>
        <tubeGeometry args={[curve, 48, thickness, 8, false]} />
        <meshPhysicalMaterial color={color} roughness={0.7} metalness={0.05} clearcoat={0.15} />
      </mesh>
      {/* Data pulses - subtle and fast */}
      {Array.from({ length: pulseCount }).map((_, i) => (
        <DataPulse key={i} curve={curve} color={0x00ff88} speed={0.6 + Math.random() * 0.3} offset={i / pulseCount} />
      ))}
    </group>
  )
}

// Power cable component
function PowerCable({ points, thickness = 0.02 }: { points: THREE.Vector3[]; thickness?: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5), [points])
  return (
    <mesh>
      <tubeGeometry args={[curve, 32, thickness, 8, false]} />
      <meshPhysicalMaterial color={0x0a0a0a} roughness={0.85} metalness={0.05} />
    </mesh>
  )
}

// Velcro cable tie/wrap
function CableTie({ position, rotation = [0, 0, 0], width = 0.15 }: { position: [number, number, number]; rotation?: [number, number, number]; width?: number }) {
  return (
    <mesh position={position} rotation={rotation as [number, number, number]}>
      <boxGeometry args={[width, 0.02, 0.04]} />
      <meshStandardMaterial color={0x1a1a1a} roughness={0.9} />
    </mesh>
  )
}

// Bundled cable run (multiple cables bound together)
function CableBundle({
  startPos,
  endPos,
  cableCount = 6,
  colors,
  isFiber = false,
  bundleRadius = 0.08,
}: {
  startPos: [number, number, number]
  endPos: [number, number, number]
  cableCount?: number
  colors: number[]
  isFiber?: boolean
  bundleRadius?: number
}) {
  const cables = useMemo(() => {
    const result: { points: THREE.Vector3[]; color: number }[] = []
    const midY = (startPos[1] + endPos[1]) / 2
    const midX = (startPos[0] + endPos[0]) / 2
    const sagAmount = Math.abs(endPos[0] - startPos[0]) * 0.08
    for (let i = 0; i < cableCount; i++) {
      const angle = (i / cableCount) * Math.PI * 2
      const offsetX = Math.cos(angle) * bundleRadius * 0.3
      const offsetZ = Math.sin(angle) * bundleRadius * 0.3
      const pts = [
        new THREE.Vector3(startPos[0] + offsetX * 0.5, startPos[1], startPos[2] + offsetZ * 0.5),
        new THREE.Vector3(startPos[0] + offsetX, startPos[1] - 0.1, startPos[2] + offsetZ + 0.05),
        new THREE.Vector3(midX + offsetX * 0.8, midY - sagAmount, startPos[2] + offsetZ + 0.08),
        new THREE.Vector3(endPos[0] + offsetX, endPos[1] + 0.1, endPos[2] + offsetZ + 0.05),
        new THREE.Vector3(endPos[0] + offsetX * 0.5, endPos[1], endPos[2] + offsetZ * 0.5),
      ]
      result.push({ points: pts, color: colors[i % colors.length] })
    }
    return result
  }, [startPos, endPos, cableCount, colors, bundleRadius])

  return (
    <group>
      {cables.map((cable, i) =>
        isFiber
          ? <FiberCable key={i} points={cable.points} color={cable.color} pulseCount={3} />
          : <CopperCable key={i} points={cable.points} color={cable.color} pulseCount={2} thickness={0.008} />
      )}
    </group>
  )
}

// Comprehensive rack cabling system
function RackCableSystem({ rackX }: { rackX: number }) {
  const fiberColors = [0xffcc00, 0x00aaff, 0x00ff88, 0xff6600, 0x00ffcc, 0xaa66ff, 0xff00aa, 0x88ff00]
  const copperBlue  = [0x0044aa, 0x0055bb, 0x0066cc, 0x0077dd, 0x0088ee, 0x0099ff]
  const copperGray  = [0x606060, 0x707070, 0x808080, 0x909090]

  return (
    <group position={[rackX, 0, 0]}>
      {/* === D-rings / cable guides along rack side === */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`dring${i}`} position={[-1.15, 2 + i * 0.9, 0.3]}>
          <torusGeometry args={[0.04, 0.008, 8, 12, Math.PI]} />
          <meshStandardMaterial color={0x404040} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* === FIBER UPLINKS: Switch to Cable Tray (40G QSFP+ yellow SM) === */}
      {[0, 1, 2, 3].map((i) => {
        const offsetX = -0.25 + i * 0.12
        const pts = [
          new THREE.Vector3(offsetX, 8.35, 0.58),
          new THREE.Vector3(offsetX + 0.03, 8.45, 0.62),
          new THREE.Vector3(offsetX + 0.02, 8.6, 0.55),
          new THREE.Vector3(offsetX, 8.75, 0.35),
          new THREE.Vector3(offsetX - 0.02, 10.85, 0.1),
          new THREE.Vector3(offsetX, 11.9, -0.1),
        ]
        return <FiberCable key={`fu${i}`} points={pts} color={0xffcc00} pulseCount={5} />
      })}

      {/* === PATCH PANEL → SWITCH copper Cat6A bundles === */}
      <CableBundle
        startPos={[-0.5, 9.52, 0.58]}
        endPos={[-0.5, 8.32, 0.58]}
        cableCount={6}
        colors={copperBlue}
        isFiber={false}
        bundleRadius={0.12}
      />
      <CableBundle
        startPos={[0.5, 9.52, 0.58]}
        endPos={[0.5, 8.32, 0.58]}
        cableCount={6}
        colors={copperGray}
        isFiber={false}
        bundleRadius={0.12}
      />

      {/* === VERTICAL FIBER TRUNK: rack top → cable tray === */}
      {[0.18, -0.18].map((oz, i) => {
        const pts = [
          new THREE.Vector3(0, 10.3, oz + 0.6),
          new THREE.Vector3(0.02, 11.0, oz + 0.45),
          new THREE.Vector3(0, 11.5, oz + 0.2),
          new THREE.Vector3(0, 11.9, oz),
        ]
        return <FiberCable key={`vt${i}`} points={pts} color={i === 0 ? 0x00ff88 : 0xff6600} pulseCount={4} />
      })}

      {/* === POWER CABLES from UPS (thick black) === */}
      {[-0.4, 0.4].map((ox, i) => {
        const pts = [
          new THREE.Vector3(ox, 1.9, 0.55),
          new THREE.Vector3(ox * 0.9, 2.6, 0.62),
          new THREE.Vector3(ox * 0.7, 3.6, 0.58),
        ]
        return <PowerCable key={`pw${i}`} points={pts} thickness={0.022} />
      })}

      {/* === Cable ties on vertical run === */}
      {Array.from({ length: 6 }).map((_, i) => (
        <CableTie key={`ct${i}`} position={[0, 2.5 + i * 1.0, 0.62]} width={0.18} />
      ))}
    </group>
  )
}

// Cross-rack high-bandwidth fiber interconnects
function CrossRackFiber({ rack1X, rack2X }: { rack1X: number; rack2X: number }) {
  const midX = (rack1X + rack2X) / 2
  return (
    <group>
      {[0, 1].map((idx) => {
        const yOffset = 8.35 + idx * 0.15
        const pts = [
          new THREE.Vector3(rack1X + 0.5, yOffset, 0.6),
          new THREE.Vector3(rack1X + 0.8, yOffset + 0.1, 0.7),
          new THREE.Vector3(midX, yOffset + 0.15, 0.75),
          new THREE.Vector3(rack2X - 0.8, yOffset + 0.1, 0.7),
          new THREE.Vector3(rack2X - 0.5, yOffset, 0.6),
        ]
        return <FiberCable key={`cross${idx}`} points={pts} color={idx === 0 ? 0x00ffcc : 0xffaa00} pulseCount={5} />
      })}
      <CopperCable
        points={[
          new THREE.Vector3(rack1X + 0.3, 6.8, 0.58),
          new THREE.Vector3(midX, 7.0, 0.7),
          new THREE.Vector3(rack2X - 0.3, 6.8, 0.58),
        ]}
        color={0x888888}
        pulseCount={2}
        thickness={0.014}
      />
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
      <mesh position={[0, 0, 0.042]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.01, 8]} />
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
  const bodyColor = type === "fw" ? 0xdcdcdc : type === "switch" ? 0x16191e : type === "srv" ? 0x080a0e : type === "aruba" ? 0xf0f0f0 : 0x141820
  const accentColor = type === "fw" ? 0xcc0000 : type === "switch" ? 0x049fd9 : type === "aruba" ? 0xff6600 : 0x0066cc
  const metalness = type === "fw" || type === "aruba" ? 0.15 : 0.75
  const roughness = type === "fw" || type === "aruba" ? 0.65 : 0.28

  return (
    <group
      position={[0, y, 0]}
      onPointerOver={() => label && onHover?.(label)}
      onPointerOut={() => onHover?.(null)}
      onClick={() => section && onClick?.(section)}
    >
      {/* Main chassis - brushed metal physical material */}
      <mesh castShadow>
        <boxGeometry args={[2.12, h, 1.08]} />
        <meshPhysicalMaterial color={bodyColor} roughness={roughness} metalness={metalness} clearcoat={0.4} clearcoatRoughness={0.2} />
      </mesh>
      {/* Rear exhaust grille (switches & servers) */}
      {(type === "switch" || type === "srv") && Array.from({ length: 6 }).map((_, gi) => (
        <mesh key={`gr${gi}`} position={[0, -h / 2 + 0.04 + gi * (h / 7), -0.535]}>
          <boxGeometry args={[1.8, 0.018, 0.01]} />
          <meshStandardMaterial color={0x080c10} />
        </mesh>
      ))}
      {/* Bezel/faceplate */}
      <mesh position={[0, 0, 0.545]}>
        <boxGeometry args={[2.1, h - 0.02, 0.012]} />
        <meshPhysicalMaterial color={bodyColor} roughness={roughness + 0.1} metalness={metalness - 0.1} />
      </mesh>
      {/* Rack ears */}
      {[-1.08, 1.08].map((ex, i) => (
        <group key={`ear${i}`}>
          <mesh position={[ex, 0, 0.54]}>
            <boxGeometry args={[0.075, h - 0.015, 0.042]} />
            <meshPhysicalMaterial color={0x252a30} roughness={0.25} metalness={0.9} clearcoat={0.5} />
          </mesh>
          <RackScrew position={[ex, h * 0.35, 0.562]} />
          <RackScrew position={[ex, -h * 0.35, 0.562]} />
        </group>
      ))}
      {/* Brand accent stripe */}
      <mesh position={[0, h / 2 - 0.022, 0.552]}>
        <boxGeometry args={[2.08, 0.022, 0.006]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>
      {/* Bottom accent stripe */}
      <mesh position={[0, -h / 2 + 0.012, 0.552]}>
        <boxGeometry args={[2.08, 0.012, 0.004]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* ===== CISCO SWITCH ===== */}
      {type === "switch" && (
        <>
          {/* CISCO wordmark */}
          <Text fontSize={0.13} color="#049fd9" anchorX="left" anchorY="middle"
            position={[-0.95, h / 2 - 0.065, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            CISCO
          </Text>
          {/* Catalyst 9300 model */}
          <Text fontSize={0.048} color="#6a8a9a" anchorX="left" anchorY="middle"
            position={[-0.95, h / 2 - 0.14, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            Catalyst 9300-48T
          </Text>
          <BrandStrip position={[-0.45, h / 2 - 0.065, 0.558]} color={0x049fd9} width={0.12} />
          {/* Recessed port panel */}
          <mesh position={[0, 0, 0.542]}>
            <boxGeometry args={[1.68, h * 0.72, 0.028]} />
            <meshStandardMaterial color={0x08090c} roughness={0.95} />
          </mesh>
          {/* 48x RJ45 ports - dual row, dual LED each */}
          {Array.from({ length: 48 }).map((_, sp) => {
            const row = Math.floor(sp / 24)
            const col = sp % 24
            const px = -0.7 + col * 0.058
            const py = 0.09 - row * 0.14
            return (
              <group key={sp}>
                <mesh position={[px, py, 0.557]}>
                  <boxGeometry args={[0.048, 0.052, 0.022]} />
                  <meshStandardMaterial color={0x040507} roughness={0.9} />
                </mesh>
                {/* Link LED - green */}
                <LED position={[px - 0.014, py - 0.032, 0.568]} baseColor={0x00ff44} altColor={0x001a00} rate={1.2 + (sp % 7) * 0.5} offset={sp * 0.13} size={0.005} />
                {/* Activity LED - amber */}
                <LED position={[px + 0.014, py - 0.032, 0.568]} baseColor={0xffaa00} altColor={0x140a00} rate={6 + (sp % 11) * 1.2} offset={sp * 0.17} size={0.005} />
              </group>
            )
          })}
          {/* 4x SFP28 uplink cages */}
          {Array.from({ length: 4 }).map((_, sfp) => (
            <SFPModule key={`sfp${sfp}`} position={[0.8 + (sfp % 2) * 0.085, 0.07 - Math.floor(sfp / 2) * 0.115, 0.557]} />
          ))}
          {/* StackWise port */}
          <mesh position={[-0.88, 0.05, 0.557]}>
            <boxGeometry args={[0.045, 0.032, 0.018]} />
            <meshStandardMaterial color={0x1a3a5a} />
          </mesh>
          {/* Console RJ45 */}
          <mesh position={[-0.88, -0.04, 0.557]}>
            <boxGeometry args={[0.042, 0.032, 0.018]} />
            <meshStandardMaterial color={0x004488} />
          </mesh>
          {/* Status LCD */}
          <mesh position={[0.78, -0.1, 0.556]}>
            <boxGeometry args={[0.17, 0.075, 0.012]} />
            <meshStandardMaterial color={0x000e00} roughness={0.6} />
          </mesh>
          <mesh position={[0.78, -0.1, 0.563]}>
            <boxGeometry args={[0.15, 0.058, 0.003]} />
            <meshBasicMaterial color={0x00dd44} transparent opacity={0.85} />
          </mesh>
          {/* System LED */}
          <LED position={[-0.88, -0.1, 0.557]} baseColor={0x00ff00} size={0.009} rate={0.5} />
          {/* Rear fans */}
          <SpinningFan position={[0.7, 0, -0.54]} size={0.09} />
          <SpinningFan position={[0.5, 0, -0.54]} size={0.09} />
        </>
      )}

      {/* ===== FORTIGATE FIREWALL ===== */}
      {type === "fw" && (
        <>
          {/* FORTINET wordmark */}
          <Text fontSize={0.105} color="#cc0000" anchorX="left" anchorY="middle"
            position={[-0.98, h / 2 - 0.065, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            FORTINET
          </Text>
          {/* FortiGate 600E model */}
          <Text fontSize={0.055} color="#cccccc" anchorX="left" anchorY="middle"
            position={[-0.98, h / 2 - 0.165, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            FortiGate 600E
          </Text>
          <BrandStrip position={[-0.38, h / 2 - 0.065, 0.558]} color={0xcc0000} width={0.12} />
          {/* Bottom red accent */}
          <mesh position={[0, -h / 2 + 0.028, 0.553]}>
            <boxGeometry args={[2.1, 0.038, 0.007]} />
            <meshBasicMaterial color={0xcc0000} />
          </mesh>
          {/* Port panel */}
          <mesh position={[-0.3, 0, 0.546]}>
            <boxGeometry args={[1.28, h * 0.68, 0.022]} />
            <meshStandardMaterial color={0x0c0e12} roughness={0.9} />
          </mesh>
          {/* 16x GbE copper ports - 2 rows of 8 */}
          {Array.from({ length: 16 }).map((_, pp) => {
            const row = Math.floor(pp / 8)
            const col = pp % 8
            const px = -0.84 + col * 0.125
            const py = 0.115 - row * 0.175
            return (
              <group key={pp}>
                <mesh position={[px, py, 0.558]}>
                  <boxGeometry args={[0.078, 0.058, 0.022]} />
                  <meshStandardMaterial color={0x060810} roughness={0.8} />
                </mesh>
                <LED position={[px - 0.022, py + 0.037, 0.569]} baseColor={0x00ff00} altColor={0x001800} rate={1.5 + (pp % 5) * 0.7} offset={pp * 0.2} size={0.006} />
                <LED position={[px + 0.022, py + 0.037, 0.569]} baseColor={0xffaa00} altColor={0x150800} rate={7 + (pp % 9) * 1.5} offset={pp * 0.15} size={0.006} />
              </group>
            )
          })}
          {/* 4x SFP+ cages */}
          {Array.from({ length: 4 }).map((_, sfp) => (
            <SFPModule key={`fwsfp${sfp}`} position={[0.22 + (sfp % 2) * 0.095, 0.075 - Math.floor(sfp / 2) * 0.14, 0.558]} />
          ))}
          {/* LCD status panel */}
          <mesh position={[0.72, 0.1, 0.557]}>
            <boxGeometry args={[0.33, 0.21, 0.02]} />
            <meshStandardMaterial color={0x06080a} roughness={0.65} />
          </mesh>
          <mesh position={[0.72, 0.1, 0.568]}>
            <boxGeometry args={[0.3, 0.18, 0.005]} />
            <meshBasicMaterial color={0x00ee44} transparent opacity={0.88} />
          </mesh>
          {/* Management port */}
          <mesh position={[0.72, -0.1, 0.558]}>
            <boxGeometry args={[0.055, 0.04, 0.016]} />
            <meshStandardMaterial color={0x0a2a4a} />
          </mesh>
          {/* USB port */}
          <mesh position={[0.85, -0.1, 0.558]}>
            <boxGeometry args={[0.04, 0.02, 0.012]} />
            <meshStandardMaterial color={0x202020} />
          </mesh>
          {/* Power button + LED */}
          <mesh position={[0.93, 0, 0.557]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} />
            <meshPhysicalMaterial color={0x383838} metalness={0.9} roughness={0.15} />
          </mesh>
          <LED position={[0.93, 0, 0.564]} baseColor={0x00ff00} size={0.009} rate={0.4} />
          {/* ASIC vent slats */}
          {Array.from({ length: 5 }).map((_, v) => (
            <mesh key={v} position={[0.93, -h / 2 + 0.06 + v * 0.055, -0.535]}>
              <boxGeometry args={[0.15, 0.016, 0.01]} />
              <meshStandardMaterial color={0x080c10} />
            </mesh>
          ))}
        </>
      )}



      {/* ===== DELL SERVER ===== */}
      {type === "srv" && (
        <>
          {/* DELL wordmark */}
          <Text fontSize={0.11} color="#007db8" anchorX="left" anchorY="middle"
            position={[-0.98, h / 2 - 0.08, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            DELL
          </Text>
          {/* PowerEdge model */}
          <Text fontSize={0.045} color="#888888" anchorX="left" anchorY="middle"
            position={[-0.98, h / 2 - 0.17, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            PowerEdge R750
          </Text>
          <BrandStrip position={[-0.45, h / 2 - 0.08, 0.558]} color={0x007db8} width={0.15} />
          
          {/* Honeycomb bezel ventilation (left side) */}
          <mesh position={[-0.8, 0.05, 0.548]}>
            <boxGeometry args={[0.3, 0.5, 0.015]} />
            <meshStandardMaterial color={0x06080a} roughness={0.9} />
          </mesh>
          {Array.from({ length: 15 }).map((_, vx) =>
            Array.from({ length: 10 }).map((_, vy) => (
              <mesh key={`v${vx}-${vy}`} position={[-0.92 + vx * 0.018, -0.15 + vy * 0.045 + (vx % 2) * 0.02, 0.556]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.007, 0.007, 0.004, 6]} />
                <meshStandardMaterial color={0x030405} />
              </mesh>
            ))
          )}

          {/* Drive bays - 12x 3.5" hot-swap SAS */}
          {Array.from({ length: 12 }).map((_, db) => {
            const row = Math.floor(db / 6)
            const col = db % 6
            const bx = -0.5 + col * 0.22
            const by = 0.15 - row * 0.35
            return (
              <group key={db}>
                {/* Drive caddy */}
                <mesh position={[bx, by, 0.555]}>
                  <boxGeometry args={[0.2, 0.28, 0.03]} />
                  <meshPhysicalMaterial color={0x3a4048} roughness={0.3} metalness={0.8} />
                </mesh>
                <mesh position={[bx - 0.07, by, 0.57]}>
                  <boxGeometry args={[0.04, 0.25, 0.005]} />
                  <meshStandardMaterial color={0x15181c} />
                </mesh>
                {/* Drive release button */}
                <mesh position={[bx + 0.07, by - 0.08, 0.57]}>
                  <boxGeometry args={[0.03, 0.08, 0.01]} />
                  <meshStandardMaterial color={0x600000} />
                </mesh>
                {/* Status LED */}
                <LED position={[bx + 0.07, by + 0.1, 0.575]} baseColor={0x4488ff} altColor={0x081828} rate={4 + Math.random() * 6} offset={Math.random() * 6} size={0.007} />
                {/* Activity LED */}
                <LED position={[bx + 0.07, by + 0.05, 0.575]} baseColor={0x00ff88} altColor={0x081808} rate={15 + Math.random() * 20} offset={Math.random() * 6} size={0.005} />
              </group>
            )
          })}
          
          {/* Quick Sync / iDRAC control panel (right side) */}
          <mesh position={[0.88, 0.15, 0.555]}>
            <boxGeometry args={[0.15, 0.25, 0.015]} />
            <meshStandardMaterial color={0x080a0c} />
          </mesh>
          <mesh position={[0.88, 0.2, 0.563]}>
            <boxGeometry args={[0.1, 0.08, 0.005]} />
            <meshBasicMaterial color={0x00aacc} transparent opacity={0.6} />
          </mesh>
          
          {/* VGA port */}
          <mesh position={[0.85, 0, 0.558]}>
            <boxGeometry args={[0.04, 0.025, 0.015]} />
            <meshStandardMaterial color={0x0044aa} />
          </mesh>
          {/* USB ports */}
          {[0, 0.05].map((offset, i) => (
            <mesh key={`usb${i}`} position={[0.92, -0.05 + offset, 0.558]}>
              <boxGeometry args={[0.035, 0.015, 0.01]} />
              <meshStandardMaterial color={0x1a1a1a} />
            </mesh>
          ))}
          {/* Power button */}
          <mesh position={[0.88, -0.15, 0.558]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} />
            <meshStandardMaterial color={0x404040} metalness={0.8} />
          </mesh>
          <LED position={[0.88, -0.15, 0.565]} baseColor={0x00ff00} size={0.008} rate={0} />

          {/* Dual Rear Power Supplies */}
          {[-0.8, -0.6].map((px, i) => (
            <group key={`psu${i}`} position={[px, -0.15, -0.535]}>
              <mesh>
                <boxGeometry args={[0.16, 0.2, 0.02]} />
                <meshStandardMaterial color={0x202428} />
              </mesh>
              {/* PSU fan */}
              <SpinningFan position={[0, 0, -0.01]} size={0.04} />
              {/* PSU handle */}
              <mesh position={[0.05, 0, -0.015]}>
                <boxGeometry args={[0.02, 0.12, 0.04]} />
                <meshStandardMaterial color={0x404448} />
              </mesh>
              {/* PSU LED */}
              <LED position={[-0.05, 0.06, -0.015]} baseColor={0x00ff44} size={0.005} />
            </group>
          ))}
        </>
      )}

      {/* ===== ARUBA CLEARPASS ===== */}
      {type === "aruba" && (
        <>
          {/* ARUBA wordmark */}
          <Text fontSize={0.11} color="#ff6600" anchorX="left" anchorY="middle"
            position={[-0.98, h / 2 - 0.025, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            ARUBA
          </Text>
          {/* ClearPass model */}
          <Text fontSize={0.05} color="#eeeeee" anchorX="left" anchorY="middle"
            position={[-0.98, h / 2 - 0.115, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            ClearPass 7280
          </Text>
          <BrandStrip position={[-0.45, h / 2 - 0.025, 0.558]} color={0xff6600} width={0.15} />
          
          {/* Port / display section */}
          <mesh position={[0, 0, 0.546]}>
            <boxGeometry args={[1.5, h * 0.65, 0.018]} />
            <meshStandardMaterial color={0xc0c4c8} roughness={0.8} />
          </mesh>
          
          {/* Management ports (Data/Mgmt/IPMI) */}
          {Array.from({ length: 6 }).map((_, p) => (
            <group key={p}>
              <mesh position={[-0.5 + p * 0.16, 0, 0.556]}>
                <boxGeometry args={[0.075, 0.052, 0.018]} />
                <meshStandardMaterial color={0x080808} />
              </mesh>
              <LED position={[-0.51 + p * 0.16, -0.038, 0.566]} baseColor={0x00ff44} altColor={0x001a00} rate={2 + Math.random() * 3} offset={Math.random() * 6} size={0.005} />
            </group>
          ))}
          
          {/* Front LCD display */}
          <mesh position={[0.55, 0, 0.556]}>
            <boxGeometry args={[0.22, 0.12, 0.01]} />
            <meshStandardMaterial color={0x080808} />
          </mesh>
          <mesh position={[0.55, 0, 0.562]}>
            <boxGeometry args={[0.2, 0.1, 0.002]} />
            <meshBasicMaterial color={0x2288ff} transparent opacity={0.9} />
          </mesh>
          
          {/* Status LEDs */}
          <LED position={[0.8, 0.04, 0.556]} baseColor={0x00ff00} size={0.008} />
          <LED position={[0.8, 0, 0.556]} baseColor={0xffaa00} rate={1.2} size={0.008} />
          <LED position={[0.8, -0.04, 0.556]} baseColor={0x00aaff} rate={0} size={0.008} />
        </>
      )}

      {/* ===== PATCH PANEL ===== */}
      {type === "patch" && (
        <>
          {/* Patch panel faceplate (brushed aluminum/black) */}
          <mesh position={[0, 0, 0.546]}>
            <boxGeometry args={[2.08, h * 0.9, 0.022]} />
            <meshPhysicalMaterial color={0x121418} roughness={0.6} metalness={0.8} />
          </mesh>
          
          {/* 24 keystone patch ports */}
          {Array.from({ length: 24 }).map((_, pp) => {
            const px = -0.92 + pp * 0.08
            return (
              <group key={pp}>
                {/* Keystone jack opening */}
                <mesh position={[px, -0.02, 0.558]}>
                  <boxGeometry args={[0.052, 0.065, 0.015]} />
                  <meshStandardMaterial color={0x050608} roughness={0.8} />
                </mesh>
                {/* RJ45 inner contact area */}
                <mesh position={[px, -0.02, 0.562]}>
                  <boxGeometry args={[0.038, 0.045, 0.01]} />
                  <meshStandardMaterial color={0x0a0c10} />
                </mesh>
                {/* Port number label (white stripe) */}
                <mesh position={[px, 0.06, 0.558]}>
                  <boxGeometry args={[0.045, 0.025, 0.003]} />
                  <meshStandardMaterial color={0xf8f9fa} />
                </mesh>
              </group>
            )
          })}
        </>
      )}

      {/* ===== UPS ===== */}
      {type === "ups" && (
        <>
          {/* APC wordmark */}
          <Text fontSize={0.13} color="#00aa44" anchorX="left" anchorY="middle"
            position={[-0.95, h / 2 - 0.1, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            APC
          </Text>
          {/* Smart-UPS model */}
          <Text fontSize={0.055} color="#aaaaaa" anchorX="left" anchorY="middle"
            position={[-0.95, h / 2 - 0.22, 0.562]}
            font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf">
            Smart-UPS SRT 3000VA
          </Text>
          <BrandStrip position={[-0.5, h / 2 - 0.1, 0.558]} color={0x00aa44} width={0.15} />
          
          {/* Front battery bank vent slots */}
          {Array.from({ length: 12 }).map((_, vx) => (
            <mesh key={`upsv${vx}`} position={[-0.95 + vx * 0.08, -0.1, 0.552]}>
              <boxGeometry args={[0.04, 0.4, 0.015]} />
              <meshStandardMaterial color={0x06080a} />
            </mesh>
          ))}
          
          {/* LCD Status Control Panel */}
          <mesh position={[0.2, 0.1, 0.555]}>
            <boxGeometry args={[0.38, 0.28, 0.02]} />
            <meshStandardMaterial color={0x040506} roughness={0.6} />
          </mesh>
          <mesh position={[0.2, 0.1, 0.566]}>
            <boxGeometry args={[0.34, 0.22, 0.005]} />
            <meshBasicMaterial color={0x00ffaa} transparent opacity={0.75} />
          </mesh>
          {/* Control buttons below LCD */}
          {[-0.08, 0, 0.08].map((ox, bi) => (
            <mesh key={`btn${bi}`} position={[0.2 + ox, -0.08, 0.56]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.01, 8]} />
              <meshStandardMaterial color={0x2a2a2a} />
            </mesh>
          ))}
          
          {/* Load/Battery status bar graphs */}
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={`bat${i}`}>
              {/* Load % */}
              <LED position={[0.5, 0.2 - i * 0.04, 0.558]} baseColor={i < 3 ? 0x00ff00 : i === 3 ? 0xffaa00 : 0xff0000} altColor={0x001100} rate={i < 2 ? 0 : 0.5} offset={i * 0.3} size={0.01} />
              {/* Battery Charge % */}
              <LED position={[0.55, 0.2 - i * 0.04, 0.558]} baseColor={0x00ff00} altColor={0x002200} rate={0} size={0.01} />
            </group>
          ))}
          
          {/* Outlet banks */}
          {Array.from({ length: 8 }).map((_, o) => {
            const ox = 0.7 + (o % 2) * 0.18
            const oy = 0.15 - Math.floor(o / 2) * 0.15
            return (
              <group key={`out${o}`}>
                <mesh position={[ox, oy, 0.558]}>
                  <boxGeometry args={[0.12, 0.1, 0.015]} />
                  <meshStandardMaterial color={0x181a1c} />
                </mesh>
                <mesh position={[ox, oy, 0.566]}>
                  <boxGeometry args={[0.06, 0.08, 0.005]} />
                  <meshStandardMaterial color={0x040404} />
                </mesh>
              </group>
            )
          })}
          
          {/* Rear exhaust cooling fans */}
          <SpinningFan position={[-0.7, 0, -0.53]} size={0.12} />
          <SpinningFan position={[-0.4, 0, -0.53]} size={0.12} />
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
      {/* Outer frame posts */}
      {[-1.225, 1.225].map((ex, i) => (
        <mesh key={`fp${i}`} position={[ex, 0, 0]} castShadow>
          <boxGeometry args={[0.055, 10.4, 1.58]} />
          <meshPhysicalMaterial color={0x0d1a24} roughness={0.5} metalness={0.7} clearcoat={0.5} />
        </mesh>
      ))}
      {/* Top & bottom bars */}
      {[5.175, -5.175].map((ty, i) => (
        <mesh key={`tb${i}`} position={[0, ty, 0]} castShadow>
          <boxGeometry args={[2.45, 0.06, 1.58]} />
          <meshPhysicalMaterial color={0x0d1a24} roughness={0.5} metalness={0.7} clearcoat={0.5} />
        </mesh>
      ))}
      {/* Front rails with 42U cage-nut notches */}
      {[-1.1, 1.1].map((rx, ri) => (
        <group key={`fr${ri}`}>
          <mesh position={[rx, 0, 0.56]}>
            <boxGeometry args={[0.055, 10.2, 0.05]} />
            <meshPhysicalMaterial color={0x2a3a4a} roughness={0.3} metalness={0.9} clearcoat={0.6} />
          </mesh>
          {Array.from({ length: 42 }).map((_, u) => (
            <mesh key={u} position={[rx, -4.9 + u * 0.245, 0.588]}>
              <boxGeometry args={[0.016, 0.01, 0.007]} />
              <meshStandardMaterial color={0x404850} metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Rear rails */}
      {[-1.1, 1.1].map((rx, ri) => (
        <mesh key={`rr${ri}`} position={[rx, 0, -0.56]}>
          <boxGeometry args={[0.055, 10.2, 0.05]} />
          <meshPhysicalMaterial color={0x1e2c38} roughness={0.3} metalness={0.9} />
        </mesh>
      ))}
      {/* Perforated side panels */}
      {[-1.26, 1.26].map((sx, si) => (
        <mesh key={`sp${si}`} position={[sx, 0, 0]}>
          <boxGeometry args={[0.01, 10.3, 1.5]} />
          <meshPhysicalMaterial color={0x0a1218} roughness={0.6} metalness={0.4} transparent opacity={0.88} />
        </mesh>
      ))}
      {[-1.26, 1.26].map((sx, si) =>
        Array.from({ length: 28 }).map((_, pi) => (
          <mesh key={`pf${si}-${pi}`} position={[sx, -4.2 + pi * 0.31, 0]}>
            <boxGeometry args={[0.014, 0.04, 1.3]} />
            <meshStandardMaterial color={0x111820} />
          </mesh>
        ))
      )}
      {/* Vertical PDU strip */}
      <mesh position={[1.08, 0, -0.38]}>
        <boxGeometry args={[0.05, 9.8, 0.05]} />
        <meshPhysicalMaterial color={0x0e1820} roughness={0.5} metalness={0.65} />
      </mesh>
      {Array.from({ length: 10 }).map((_, o) => (
        <group key={`pdu${o}`} position={[1.08, -4.2 + o * 0.95, -0.38]}>
          <mesh>
            <boxGeometry args={[0.05, 0.065, 0.05]} />
            <meshStandardMaterial color={0x18242e} />
          </mesh>
          <LED position={[0, 0.038, 0.028]} baseColor={0x00ff88} altColor={0x002200} rate={0.4} offset={o * 0.6} size={0.005} />
        </group>
      ))}
      {/* Blanking panels */}
      {[3.72, 3.04, -0.18, -0.83].map((by, bi) => (
        <group key={`bl${bi}`}>
          <mesh position={[0, by, 0.545]}>
            <boxGeometry args={[2.08, 0.23, 0.01]} />
            <meshPhysicalMaterial color={0x141c24} roughness={0.7} metalness={0.5} />
          </mesh>
          {Array.from({ length: 8 }).map((_, s) => (
            <mesh key={s} position={[-0.72 + s * 0.21, by, 0.551]}>
              <boxGeometry args={[0.13, 0.055, 0.004]} />
              <meshStandardMaterial color={0x090e14} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Cable management D-ring strip */}
      {Array.from({ length: 11 }).map((_, r) => (
        <mesh key={`dr${r}`} position={[1.13, -4.5 + r * 0.9, 0.6]}>
          <torusGeometry args={[0.028, 0.006, 6, 10, Math.PI]} />
          <meshStandardMaterial color={0x2e3840} metalness={0.8} roughness={0.3} />
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

  const lastDraw = useRef(0)

  useFrame(({ clock }) => {
    if (clock.elapsedTime - lastDraw.current > 0.066) { // ~15 FPS
      if (canvasRef.current && texRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          draw(ctx, clock.elapsedTime)
          texRef.current.needsUpdate = true
        }
      }
      lastDraw.current = clock.elapsedTime
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
      
      {/* Monitor bezels/frames - behind screens */}
      {[[-4.2, 2.8], [0, 2.8], [4.2, 2.8], [-4.2, -0.4], [0, -0.4], [4.2, -0.4]].map(([x, y], i) => (
        <mesh key={`bezel${i}`} position={[x, y, -0.02]}>
          <boxGeometry args={[3.95, 2.55, 0.04]} />
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
    ctx.font = "bold 36px Arial"
    ctx.fillText("MOHAMMAD YASSIN // PROFILE", 20, 55)
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
    <group position={[7.5, 1.2, 3.5]} rotation={[0, Math.PI, 0]} scale={1.6}>
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
      position={[14.0, 5.5, -12.7]} 
      scale={1.2}
      onPointerOver={() => onHover?.("Lebanon Internet Traffic")} 
      onPointerOut={() => onHover?.(null)} 
      onClick={() => onClick?.("contact")}
    >
      {/* Monitor frame - larger */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[7.6, 5.6, 0.18]} />
        <meshStandardMaterial color={0x181c20} roughness={0.7} />
      </mesh>
      
      {/* Monitor bezel with LED strip */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[7.4, 5.4, 0.1]} />
        <meshStandardMaterial color={0x101418} roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* LED accent strip around bezel */}
      <mesh position={[0, 2.65, 0.06]}>
        <boxGeometry args={[7.2, 0.02, 0.01]} />
        <meshBasicMaterial color={0x00ffe7} />
      </mesh>
      <mesh position={[0, -2.65, 0.06]}>
        <boxGeometry args={[7.2, 0.02, 0.01]} />
        <meshBasicMaterial color={0x00ffe7} />
      </mesh>
      
      {/* Screen with canvas texture */}
      {tex && (
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[7.0, 5.2]} />
          <meshStandardMaterial map={tex} emissiveMap={tex} emissive={0xffffff} emissiveIntensity={1.3} />
        </mesh>
      )}
      
      {/* LED indicator lights */}
      <mesh position={[3.5, -2.7, 0.06]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={0x00ff88} />
      </mesh>
      <mesh position={[3.3, -2.7, 0.06]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={0x0088ff} />
      </mesh>
      
      {/* Status bar below */}
      <mesh position={[0, -2.95, 0.03]}>
        <boxGeometry args={[3.5, 0.15, 0.02]} />
        <meshStandardMaterial color={0x00ff88} emissive={0x00ff88} emissiveIntensity={0.4} transparent opacity={0.9} />
      </mesh>
      
      {/* Monitor stand/mount */}
      <mesh position={[0, -3.2, -0.3]}>
        <boxGeometry args={[1.5, 0.15, 0.6]} />
        <meshStandardMaterial color={0x202428} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

// Dust mote particles - realistic floating dust in datacenter
function Particles() {
  const ref = useRef<THREE.Points>(null)
  const vels = useRef<THREE.Vector3[]>([])
  const phases = useRef<number[]>([])
  const count = 300

  const pos = useMemo(() => {
    const p = new Float32Array(count * 3)
    const v: THREE.Vector3[] = []
    const ph: number[] = []
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40
      p[i * 3 + 1] = Math.random() * 9.5
      p[i * 3 + 2] = (Math.random() - 0.5) * 22
      v.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.008, 
        (Math.random() - 0.5) * 0.004 + 0.002, // slight upward drift from heat
        (Math.random() - 0.5) * 0.008
      ))
      ph.push(Math.random() * Math.PI * 2)
    }
    vels.current = v
    phases.current = ph
    return p
  }, [])
  
  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = 0.02 + Math.random() * 0.04
    }
    return s
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      const p = ref.current.geometry.attributes.position.array as Float32Array
      const v = vels.current
      const ph = phases.current
      const t = clock.elapsedTime
      for (let i = 0; i < count; i++) {
        // Gentle sinusoidal drift for realistic floating motion
        const wobble = Math.sin(t * 0.5 + ph[i]) * 0.003
        p[i * 3] += v[i].x + wobble
        p[i * 3 + 1] += v[i].y + Math.sin(t * 0.3 + ph[i]) * 0.001
        p[i * 3 + 2] += v[i].z + Math.cos(t * 0.4 + ph[i]) * 0.002
        if (Math.abs(p[i * 3]) > 20) v[i].x *= -1
        if (p[i * 3 + 1] > 9.5 || p[i * 3 + 1] < 0.5) v[i].y *= -1
        if (Math.abs(p[i * 3 + 2]) > 11) v[i].z *= -1
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} args={[pos, 3]} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial color={0xffffff} size={0.03} transparent opacity={0.25} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}

// Data flow visualization - network packets moving through the air
function NetworkFlowParticles() {
  const ref = useRef<THREE.Points>(null)
  const vels = useRef<THREE.Vector3[]>([])
  const count = 50

  const pos = useMemo(() => {
    const p = new Float32Array(count * 3)
    const v: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      // Start near rack area
      p[i * 3] = -12 + Math.random() * 8
      p[i * 3 + 1] = 3 + Math.random() * 5
      p[i * 3 + 2] = -2 + Math.random() * 4
      // Move towards monitors/workstation
      v.push(new THREE.Vector3(0.05 + Math.random() * 0.03, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02))
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
        // Reset when reaching destination
        if (p[i * 3] > 15) {
          p[i * 3] = -12 + Math.random() * 2
          p[i * 3 + 1] = 3 + Math.random() * 5
          p[i * 3 + 2] = -2 + Math.random() * 4
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color={0x00ffe7} size={0.08} transparent opacity={0.7} blending={THREE.AdditiveBlending} />
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
      <directionalLight color={0xffffff} intensity={1.4} position={[0, 14, 2]} castShadow shadow-mapSize={[1024, 1024]} />
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
      {/* Per-rack cable management systems */}
      <RackCableSystem rackX={-11} />
      <RackCableSystem rackX={-8} />
      <RackCableSystem rackX={-5} />
      {/* Cross-rack high-bandwidth fiber interconnects */}
      <CrossRackFiber rack1X={-11} rack2X={-8} />
      <CrossRackFiber rack1X={-8} rack2X={-5} />
      <WallMonitors onHover={onHover} onClick={onSectionClick} />
      <Workstation onHover={onHover} onClick={onSectionClick} />
      <Chair />
  <LebanonTrafficMap onHover={onHover} onClick={onSectionClick} />
  <Particles />
  <NetworkFlowParticles />
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
      <div className="text-[clamp(3rem,10vw,8rem)] font-bold tracking-[0.05em] text-[#00ffe7] leading-[0.9] text-center" style={{ textShadow: "0 0 18px #00ffe7aa" }}>
        MOHAMMAD<span className="text-[#ff4d00]">.</span>
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
      <div className="text-[1.5rem] tracking-[0.08em] text-[#00ffe7] font-bold" style={{ textShadow: "0 0 18px #00ffe7aa" }}>
        MOHAMMAD<span className="text-[#ff4d00]">.</span>YASSIN
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
  { id: "experience", label: "Experience" },
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
      <Canvas dpr={[1, 1.5]} camera={{ fov: 52, near: 0.1, far: 200, position: [6, 5, 10] }} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1, powerPreference: "high-performance" }} style={{ opacity: booting ? 0 : 1, transition: "opacity 0.8s" }}>
        <Suspense fallback={null}>
          <BakeShadows />
          <SceneContent onHover={setHovered} onSectionClick={setActiveSection} />
          <Preload all />
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
