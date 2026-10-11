"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { LAPTOP } from "@/lib/dc/laptop"
import { AUTO_SESSION, PROMPT } from "@/lib/dc/terminal"

const W = 1024
const H = 660
const ROWS = 20
const FONT = "22px ui-monospace, 'Cascadia Mono', Consolas, monospace"

interface Line {
  text: string
  kind: "cmd" | "out"
}

function drawScreen(ctx: CanvasRenderingContext2D, lines: Line[], cursorOn: boolean) {
  ctx.fillStyle = "#06090c"
  ctx.fillRect(0, 0, W, H)
  // title bar
  ctx.fillStyle = "#151b22"
  ctx.fillRect(0, 0, W, 34)
  ctx.fillStyle = "#8aa0b4"
  ctx.font = "18px ui-monospace, Consolas, monospace"
  ctx.fillText("COM3 - PuTTY   FGT-01 console 9600 8N1", 16, 23)
  for (const [i, c] of ["#ff5f57", "#febc2e", "#28c840"].entries()) {
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(W - 70 + i * 22, 17, 6, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.font = FONT
  const top = 70
  const lh = 29
  lines.slice(-ROWS).forEach((l, i) => {
    const y = top + i * lh
    if (l.kind === "cmd") {
      ctx.fillStyle = "#3ee07a"
      ctx.fillText(PROMPT, 18, y)
      ctx.fillStyle = "#e8edf2"
      ctx.fillText(" " + l.text, 18 + ctx.measureText(PROMPT).width, y)
    } else {
      ctx.fillStyle = "#a9b7c4"
      ctx.fillText(l.text, 18, y)
    }
  })
  if (cursorOn) {
    const last = lines.slice(-ROWS)
    const i = Math.max(0, last.length - 1)
    const l = last[i]
    const y = top + i * lh
    const x = 18 + (l ? ctx.measureText((l.kind === "cmd" ? PROMPT + " " : "") + l.text).width : 0)
    ctx.fillStyle = "#3ee07a"
    ctx.fillRect(x + 2, y - 20, 12, 24)
  }
  // subtle scanline / glass falloff
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, "rgba(255,255,255,0.03)")
  g.addColorStop(1, "rgba(0,0,0,0.25)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
}

/** Live auto-typed FortiOS session on a canvas texture. */
function useTerminalTexture(animate: boolean) {
  const canvas = useMemo(() => {
    const c = document.createElement("canvas")
    c.width = W
    c.height = H
    return c
  }, [])
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [canvas])
  const state = useRef({ lines: [] as Line[], step: 0, char: 0, outIdx: 0, phase: "type" as "type" | "out" | "pause", next: 0, cursor: true })

  useEffect(() => {
    const ctx = canvas.getContext("2d")!
    if (!animate) {
      const lines: Line[] = []
      for (const s of AUTO_SESSION.slice(0, 3)) {
        lines.push({ text: s.cmd, kind: "cmd" })
        s.out.forEach((o) => lines.push({ text: o, kind: "out" }))
      }
      lines.push({ text: "", kind: "cmd" })
      drawScreen(ctx, lines, false)
      texture.needsUpdate = true
      return
    }
    state.current.lines = [{ text: "", kind: "cmd" }]
    drawScreen(ctx, state.current.lines, true)
    texture.needsUpdate = true
  }, [animate, canvas, texture])

  useFrame(({ clock }) => {
    if (!animate) return
    const s = state.current
    const t = clock.elapsedTime
    if (t < s.next) return
    const session = AUTO_SESSION[s.step % AUTO_SESSION.length]
    const cur = s.lines[s.lines.length - 1]
    if (s.phase === "type") {
      if (s.char < session.cmd.length) {
        s.char++
        cur.text = session.cmd.slice(0, s.char)
        s.next = t + 0.035 + Math.random() * 0.07
      } else {
        s.phase = "out"
        s.outIdx = 0
        s.next = t + 0.25
      }
    } else if (s.phase === "out") {
      if (s.outIdx < session.out.length) {
        s.lines.push({ text: session.out[s.outIdx++], kind: "out" })
        s.next = t + 0.05 + Math.random() * 0.08
      } else {
        s.lines.push({ text: "", kind: "cmd" })
        s.phase = "pause"
        s.next = t + 1.6 + Math.random()
      }
    } else {
      s.step++
      s.char = 0
      s.phase = "type"
      s.next = t
      if (s.lines.length > 200) s.lines = s.lines.slice(-ROWS)
    }
    s.cursor = Math.floor(t * 2) % 2 === 0
    drawScreen(canvas.getContext("2d")!, s.lines, s.cursor)
    texture.needsUpdate = true
  })

  return texture
}

function keyboardTexture() {
  const c = document.createElement("canvas")
  c.width = 1024
  c.height = 420
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#1c1e21"
  ctx.fillRect(0, 0, c.width, c.height)
  const rows = [14, 14, 13, 12, 11]
  const kw = 62
  rows.forEach((n, r) => {
    const off = (14 - n) * (kw / 2)
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = "#0c0d0f"
      ctx.fillRect(70 + off + i * (kw + 4), 30 + r * 68, kw, 60)
      ctx.fillStyle = "#16181b"
      ctx.fillRect(72 + off + i * (kw + 4), 32 + r * 68, kw - 4, 54)
    }
  })
  ctx.fillStyle = "#0c0d0f"
  ctx.fillRect(330, 30 + 5 * 68, 360, 50) // space bar
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export function Laptop({ animate, onOpen, highlighted }: { animate: boolean; onOpen: () => void; highlighted: boolean }) {
  const screenTex = useTerminalTexture(animate)
  const keys = useMemo(() => keyboardTexture(), [])
  const [hover, setHover] = useState(false)
  const { w, d, h } = LAPTOP.size
  const { screen } = LAPTOP
  const [bx, by, bz] = LAPTOP.base
  const [hx, hy, hz] = LAPTOP.hinge

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : ""
    return () => {
      document.body.style.cursor = ""
    }
  }, [hover])

  const shell = { color: "#2b2d31", metalness: 0.35, roughness: 0.5 }

  return (
    <group
      onClick={(e) => {
        e.stopPropagation()
        onOpen()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
      }}
      onPointerOut={() => setHover(false)}
    >
      {/* base */}
      <RoundedBox args={[w, h, d]} radius={0.004} smoothness={3} position={[bx, by, bz]} castShadow receiveShadow>
        <meshStandardMaterial {...shell} />
      </RoundedBox>
      {/* keyboard deck */}
      <mesh position={[bx, by + h / 2 + 0.0004, bz - 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w * 0.88, d * 0.42]} />
        <meshStandardMaterial map={keys} roughness={0.7} />
      </mesh>
      {/* trackpad */}
      <mesh position={[bx, by + h / 2 + 0.0004, bz + 0.07]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 0.06]} />
        <meshStandardMaterial color="#323439" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* lid */}
      <group position={[hx, hy, hz]} rotation={[-screen.tilt, 0, 0]}>
        <RoundedBox args={[screen.w, screen.h, 0.006]} radius={0.003} smoothness={3} position={[0, screen.h / 2, -0.003]} castShadow>
          <meshStandardMaterial {...shell} />
        </RoundedBox>
        {/* bezel */}
        <mesh position={[0, screen.h / 2, 0.0002]}>
          <planeGeometry args={[screen.w - 0.006, screen.h - 0.006]} />
          <meshStandardMaterial color="#0b0c0e" roughness={0.3} />
        </mesh>
        {/* display: emissive panel with glossy glass, so the room reflects in it */}
        <mesh position={[0, screen.h / 2 + 0.004, 0.0006]}>
          <planeGeometry args={[screen.w - 0.026, screen.h - 0.034]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffffff"
            emissiveMap={screenTex}
            emissiveIntensity={highlighted || hover ? 1.6 : 1.25}
            roughness={0.9}
            metalness={0}
            envMapIntensity={0}
            toneMapped={false}
          />
        </mesh>
      </group>
      {/* USB-serial adapter where the console cable lands */}
      <mesh position={LAPTOP.consolePort}>
        <boxGeometry args={[0.03, 0.009, 0.016]} />
        <meshStandardMaterial color="#d9dadc" roughness={0.9} />
      </mesh>
    </group>
  )
}
