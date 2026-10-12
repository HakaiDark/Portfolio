"use client"

import { useMemo } from "react"
import * as THREE from "three"
import { FACE_Z, slotCenterY } from "@/lib/dc/layout"
import { LAPTOP, MUG } from "@/lib/dc/laptop"

const HAND = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive"

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  draw(c.getContext("2d")!)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** Handwritten VLAN plan on a notepad; the mug sits on it. */
function notepadTexture() {
  return canvasTexture(256, 352, (ctx) => {
    ctx.fillStyle = "#f6f2e4"
    ctx.fillRect(0, 0, 256, 352)
    ctx.strokeStyle = "rgba(90,130,200,0.35)"
    for (let y = 46; y < 352; y += 26) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(256, y)
      ctx.stroke()
    }
    ctx.strokeStyle = "rgba(200,70,70,0.45)"
    ctx.beginPath()
    ctx.moveTo(30, 0)
    ctx.lineTo(30, 352)
    ctx.stroke()
    ctx.fillStyle = "#1d2a5a"
    ctx.font = `bold 19px ${HAND}`
    ctx.fillText("VLAN plan · IDF-02", 38, 36)
    ctx.font = `16px ${HAND}`
    const lines = ["10  STAFF   10.10/16", "20  STUDENT 10.20/16", "30  VOIP    10.30/22", "40  WIFI    10.40/16", "99  MGMT    10.99/24", "trunk Po1 → FGT pair ✓", "802.1X on 20 + 40!"]
    lines.forEach((l, i) => ctx.fillText(l, 38, 66 + i * 26))
  })
}

/** Yellow sticky note on a server's faceplate. */
function stickyTexture() {
  return canvasTexture(192, 192, (ctx) => {
    ctx.fillStyle = "#ffe46b"
    ctx.fillRect(0, 0, 192, 192)
    ctx.fillStyle = "rgba(0,0,0,0.06)"
    ctx.fillRect(0, 0, 192, 26)
    ctx.fillStyle = "#b3261e"
    ctx.font = `bold 30px ${HAND}`
    ctx.fillText("DO NOT", 26, 74)
    ctx.fillText("REBOOT", 22, 112)
    ctx.fillStyle = "#1d2a5a"
    ctx.font = `18px ${HAND}`
    ctx.fillText("patching Sat 02:00", 14, 156)
  })
}

/** Cable tester screen: a passing Cat6 link test. */
function testerScreen() {
  return canvasTexture(128, 160, (ctx) => {
    ctx.fillStyle = "#0b1a10"
    ctx.fillRect(0, 0, 128, 160)
    ctx.fillStyle = "#3ee07a"
    ctx.font = "bold 30px system-ui, sans-serif"
    ctx.fillText("PASS", 26, 52)
    ctx.font = "15px system-ui, sans-serif"
    ctx.fillStyle = "#cfe9d6"
    ctx.fillText("Cat6 · 1 Gb/s", 16, 86)
    ctx.fillText("Length 37.4 m", 16, 108)
    ctx.fillText("Wiremap ✓", 16, 130)
  })
}

/** Printed label on the box of spare optics. */
function boxLabel() {
  return canvasTexture(256, 96, (ctx) => {
    ctx.fillStyle = "#f2f2ee"
    ctx.fillRect(0, 0, 256, 96)
    ctx.fillStyle = "#111"
    ctx.font = "bold 26px system-ui, sans-serif"
    ctx.fillText("SFP-10G-SR", 16, 40)
    ctx.font = "18px system-ui, sans-serif"
    ctx.fillText("10GBASE-SR · 850 nm · ×4", 16, 72)
  })
}

/**
 * The engineer's clutter: VLAN-plan notepad under the mug, a cable tester mid-test, a box of
 * spare optics, a coil of patch lead, and a sticky note on the second server.
 */
export function DeskProps() {
  const tex = useMemo(() => ({ pad: notepadTexture(), sticky: stickyTexture(), screen: testerScreen(), box: boxLabel() }), [])
  const y = LAPTOP.shelfTop
  const [mx, , mz] = MUG.position
  const stickyY = slotCenterY(19, 1)
  return (
    <group>
      {/* notepad under the mug, a little skewed */}
      <mesh position={[mx - 0.004, y + 0.0012, mz - 0.012]} rotation={[-Math.PI / 2, 0, 0.12]} receiveShadow>
        <planeGeometry args={[0.1, 0.137]} />
        <meshStandardMaterial map={tex.pad} roughness={0.85} />
      </mesh>
      {/* cable tester, yellow rubber boot, propped up on its end behind the mug, screen to the front */}
      <group position={[0.17, y + 0.075, -0.2]} rotation={[Math.PI / 2 - 0.22, 0, 0]} >
        <mesh position={[0, 0.011, 0]} castShadow>
          <boxGeometry args={[0.064, 0.022, 0.15]} />
          <meshStandardMaterial color="#e8b511" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.0222, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.042, 0.052]} />
          <meshBasicMaterial map={tex.screen} toneMapped={false} />
        </mesh>
        {/* keypad */}
        <mesh position={[0, 0.0222, 0.034]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.044, 0.04]} />
          <meshStandardMaterial color="#202226" roughness={0.7} />
        </mesh>
        {/* RJ45 test port + a short patch lead still plugged in */}
        <mesh position={[0, 0.011, -0.078]}>
          <boxGeometry args={[0.014, 0.01, 0.01]} />
          <meshStandardMaterial color="#1f5fbf" roughness={0.4} />
        </mesh>
      </group>
      {/* coil of blue patch lead next to the tester */}
      <mesh position={[0.11, y + 0.004, -0.31]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.04, 0.0035, 8, 32]} />
        <meshStandardMaterial color="#1f5fbf" roughness={0.55} />
      </mesh>
      <mesh position={[0.11, y + 0.0105, -0.31]} rotation={[-Math.PI / 2, 0, 0.6]} castShadow>
        <torusGeometry args={[0.037, 0.0035, 8, 32]} />
        <meshStandardMaterial color="#1f5fbf" roughness={0.55} />
      </mesh>
      {/* box of spare optics */}
      <group position={[0.18, y + 0.017, -0.33]} rotation={[0, 0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.034, 0.1]} />
          <meshStandardMaterial color="#d9d4c6" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.0172, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.08, 0.03]} />
          <meshStandardMaterial map={tex.box} roughness={0.7} />
        </mesh>
      </group>
      {/* sticky note on the second ProLiant (the top one slides out, this one stays) */}
      <mesh position={[-0.15, stickyY - 0.004, FACE_Z + 0.0024]} rotation={[0, 0, -0.07]}>
        <planeGeometry args={[0.042, 0.042]} />
        <meshStandardMaterial map={tex.sticky} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
