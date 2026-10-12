"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { BODY_WIDTH, PANEL_WIDTH, U } from "@/lib/dc/devices"
import { FACE_Z, slotCenterY } from "@/lib/dc/layout"
import { ALUMINIUM, useMacDeck } from "./laptop"

/** How far the drawer travels out of the rack, and where its lid hinges (from the drawer front). */
// lid stays under 0.23 m so the raised screen clears the laptop shelf above (U22)
export const KVM = { slide: 0.36, hingeBack: 0.27, lidDepth: 0.225, openAngle: (100 * Math.PI) / 180 }

const SCRIPT: { text: string; color?: string }[] = [
  { text: "PS C:\\ops> .\\Test-SiteConfig.ps1 -Sites (Get-Content .\\sites.txt) -Report", color: "#ffffff" },
  { text: "Validating FortiGate baselines against the golden config…", color: "#9fd3ff" },
  { text: "  site-001  policy pkg ✓   VPN ✓   NTP ✓   SNMPv3 ✓" },
  { text: "  site-002  policy pkg ✓   VPN ✓   NTP ✓   SNMPv3 ✓" },
  { text: "  site-003  policy pkg ✓   VPN ✓   NTP ⚠ drift 3s", color: "#ffe066" },
  { text: "  site-004  policy pkg ✓   VPN ✓   NTP ✓   SNMPv3 ✓" },
  { text: "  …" },
  { text: "  site-100  policy pkg ✓   VPN ✓   NTP ✓   SNMPv3 ✓" },
  { text: "Checked 100 sites · 1 warning · report saved:", color: "#7dffa8" },
  { text: "  \\\\ops\\reports\\config-validation.html", color: "#7dffa8" },
  { text: "PS C:\\ops> _", color: "#ffffff" },
]

/**
 * 1U rack console (KVM drawer). Closed it's a slim black panel; on its stop the tray slides out,
 * the screen flips up and a PowerShell config-validation run types itself out.
 */
export function KvmDrawer({ u, open }: { u: number; open: boolean }) {
  const y = slotCenterY(u, 1)
  const h = U - 0.0008
  const trayH = 0.016
  const depth = 0.55
  const deck = useMacDeck()
  const screen = useMemo(() => {
    const c = document.createElement("canvas")
    c.width = 768
    c.height = 420
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return { c, ctx: c.getContext("2d")!, tex }
  }, [])
  useEffect(() => () => screen.tex.dispose(), [screen])

  const slider = useRef<THREE.Group>(null)
  const lid = useRef<THREE.Group>(null)
  const progress = useRef(0)
  const openedAt = useRef(-1)
  const shownLines = useRef(-1)
  const [mounted, setMounted] = useState(false)

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05)
    const goal = open ? 1 : 0
    const p = progress.current
    if (Math.abs(goal - p) > 0.0005) {
      progress.current = goal > p ? Math.min(1, p + dt / 1.3) : Math.max(0, p - dt / 0.9)
      // first the tray rolls out; only once it's clear of the rack does the screen swing up
      const slide = THREE.MathUtils.smoothstep(progress.current, 0, 0.55)
      const swing = THREE.MathUtils.smoothstep(progress.current, 0.56, 1)
      if (slider.current) slider.current.position.z = slide * KVM.slide
      if (lid.current) lid.current.rotation.x = -swing * KVM.openAngle
      if ((progress.current > 0) !== mounted) setMounted(progress.current > 0)
    }
    // type the script out once the screen is up
    if (open && progress.current > 0.95 && openedAt.current < 0) openedAt.current = clock.elapsedTime
    if (!open) openedAt.current = -1
    const lines = openedAt.current < 0 ? 0 : Math.min(SCRIPT.length, Math.floor((clock.elapsedTime - openedAt.current) / 0.28) + 1)
    if (lines !== shownLines.current) {
      shownLines.current = lines
      const { ctx } = screen
      ctx.fillStyle = "#012456"
      ctx.fillRect(0, 0, 768, 420)
      ctx.fillStyle = "#0b3a7a"
      ctx.fillRect(0, 0, 768, 30)
      ctx.fillStyle = "#dbe7ff"
      ctx.font = "15px system-ui, sans-serif"
      ctx.fillText("Windows PowerShell · ops-jump01", 12, 20)
      ctx.font = "17px Consolas, ui-monospace, monospace"
      SCRIPT.slice(0, lines).forEach((l, i) => {
        ctx.fillStyle = l.color ?? "#e6edf7"
        ctx.fillText(l.text, 14, 56 + i * 32)
      })
      screen.tex.needsUpdate = true
    }
  })

  return (
    <group position={[0, y, 0]}>
      {/* fixed outer chassis inside the rack */}
      <mesh position={[0, 0, FACE_Z - depth / 2 - 0.004]}>
        <boxGeometry args={[BODY_WIDTH, h, depth]} />
        <meshStandardMaterial color="#121315" metalness={0.5} roughness={0.5} />
      </mesh>
      <group ref={slider}>
        {/* front panel with handles, travels with the tray */}
        <mesh position={[0, 0, FACE_Z + 0.0015]} castShadow>
          <boxGeometry args={[PANEL_WIDTH, h, 0.003]} />
          <meshStandardMaterial color="#17181b" metalness={0.45} roughness={0.5} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.205, 0, FACE_Z + 0.012]} castShadow>
            <boxGeometry args={[0.012, h * 0.7, 0.018]} />
            <meshStandardMaterial color="#8d9196" metalness={0.85} roughness={0.3} />
          </mesh>
        ))}
        <mesh position={[0.17, 0.008, FACE_Z + 0.0032]}>
          <planeGeometry args={[0.004, 0.003]} />
          <meshBasicMaterial color={[0.4, 2.6, 0.8]} toneMapped={false} />
        </mesh>
        {mounted && (
          <>
            {/* tray: MacBook-style aluminium deck with a real keyboard + trackpad */}
            <mesh position={[0, -h / 2 + trayH / 2 + 0.002, FACE_Z - depth / 2]} castShadow receiveShadow>
              <boxGeometry args={[BODY_WIDTH - 0.01, trayH, depth]} />
              <meshStandardMaterial {...ALUMINIUM} />
            </mesh>
            <mesh position={[0, -h / 2 + trayH + 0.0025, FACE_Z - KVM.hingeBack / 2 - 0.004]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.38, KVM.hingeBack - 0.012]} />
              <meshStandardMaterial map={deck} metalness={0.35} roughness={0.5} />
            </mesh>
            {/* screen lid, hinged behind the keyboard */}
            <group ref={lid} position={[0, -h / 2 + trayH + 0.003, FACE_Z - KVM.hingeBack]}>
              <mesh position={[0, 0.003, KVM.lidDepth / 2]} castShadow>
                <boxGeometry args={[0.39, 0.006, KVM.lidDepth]} />
                <meshStandardMaterial {...ALUMINIUM} />
              </mesh>
              {/* black glass with thin bezels, then the LCD: faces the visitor once the lid is up */}
              <mesh position={[0, -0.0003, KVM.lidDepth / 2]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.386, KVM.lidDepth - 0.003]} />
                <meshStandardMaterial color="#050506" roughness={0.12} metalness={0.2} />
              </mesh>
              <mesh position={[0, -0.0008, KVM.lidDepth / 2 + 0.002]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.372, 0.207]} />
                <meshBasicMaterial map={screen.tex} toneMapped={false} color={[0.95, 0.95, 0.95]} />
              </mesh>
            </group>
          </>
        )}
      </group>
    </group>
  )
}
