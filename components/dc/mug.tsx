"use client"

import { useMemo } from "react"
import * as THREE from "three"
import { MUG } from "@/lib/dc/laptop"

const R = 0.041 // outer radius
const H = 0.096 // height
const WALL = 0.0042
const PRINT_ARC = (150 * Math.PI) / 180

/** Side profile of the mug, revolved by LatheGeometry: inside bottom -> inner wall -> rim -> outer wall -> foot. */
function mugProfile() {
  const p: THREE.Vector2[] = []
  const ri = R - WALL
  p.push(new THREE.Vector2(0.0001, 0.007))
  p.push(new THREE.Vector2(ri - 0.004, 0.007))
  p.push(new THREE.Vector2(ri, 0.011)) // inner fillet
  p.push(new THREE.Vector2(ri, H - 0.002))
  // rounded rim
  for (let i = 0; i <= 8; i++) {
    const a = Math.PI - (i / 8) * Math.PI
    p.push(new THREE.Vector2(ri + WALL / 2 + Math.cos(a) * (WALL / 2), H - 0.002 + Math.sin(a) * (WALL / 2)))
  }
  p.push(new THREE.Vector2(R, H - 0.004))
  p.push(new THREE.Vector2(R, 0.006))
  // softened outer bottom edge and recessed foot ring
  p.push(new THREE.Vector2(R - 0.0015, 0.0012))
  p.push(new THREE.Vector2(R - 0.004, 0))
  p.push(new THREE.Vector2(R - 0.009, 0))
  p.push(new THREE.Vector2(R - 0.0105, 0.0016))
  p.push(new THREE.Vector2(0.0001, 0.0016))
  return p
}

/** "In Kelly We Trust", set like banknote lettering, on a transparent canvas wrapped around the front. */
function printTexture() {
  const w = 1200
  const h = 560
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  const ctx = c.getContext("2d")!
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = "#16181b"
  ctx.strokeStyle = "#16181b"
  ctx.textAlign = "center"
  const serif = "Georgia, 'Times New Roman', 'Noto Serif', serif"
  // stars
  ctx.font = `44px ${serif}`
  ctx.fillText("★   ★   ★", w / 2, 92)
  // rules
  ctx.lineWidth = 5
  for (const y of [126, 454]) {
    ctx.beginPath()
    ctx.moveTo(w * 0.2, y)
    ctx.lineTo(w * 0.8, y)
    ctx.stroke()
  }
  ctx.lineWidth = 2
  for (const y of [138, 442]) {
    ctx.beginPath()
    ctx.moveTo(w * 0.24, y)
    ctx.lineTo(w * 0.76, y)
    ctx.stroke()
  }
  const spaced = (text: string, y: number, size: number, tracking: number) => {
    ctx.font = `bold ${size}px ${serif}`
    const chars = [...text]
    const widths = chars.map((ch) => ctx.measureText(ch).width)
    const total = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1)
    let x = w / 2 - total / 2
    ctx.textAlign = "left"
    chars.forEach((ch, i) => {
      ctx.fillText(ch, x, y)
      x += widths[i] + tracking
    })
    ctx.textAlign = "center"
  }
  spaced("IN KELLY", 268, 118, 14)
  spaced("WE TRUST", 410, 118, 14)
  ctx.font = `italic 30px ${serif}`
  ctx.fillText("— FGT-01 · Network Ops —", w / 2, 515)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** Glazed ceramic coffee mug on the laptop shelf. */
export function Mug() {
  const body = useMemo(() => new THREE.LatheGeometry(mugProfile(), 72), [])
  const handle = useMemo(() => new THREE.TorusGeometry(0.0215, 0.0052, 18, 40, Math.PI), [])
  const print = useMemo(() => printTexture(), [])
  const printGeo = useMemo(() => new THREE.CylinderGeometry(R + 0.00025, R + 0.00025, 0.058, 64, 1, true, -PRINT_ARC / 2, PRINT_ARC), [])
  const [x, y, z] = MUG.position

  return (
    <group position={[x, y, z]} rotation={[0, MUG.rotationY, 0]}>
      <mesh geometry={body} castShadow receiveShadow>
        <meshPhysicalMaterial color="#f3f2ee" roughness={0.2} clearcoat={1} clearcoatRoughness={0.06} side={THREE.DoubleSide} />
      </mesh>
      {/* print sits just proud of the glaze */}
      <mesh geometry={printGeo} position={[0, 0.05, 0]}>
        <meshPhysicalMaterial map={print} transparent alphaTest={0.4} roughness={0.25} clearcoat={0.6} clearcoatRoughness={0.08} />
      </mesh>
      {/* coffee */}
      <mesh position={[0, H - 0.017, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R - WALL - 0.0002, 48]} />
        <meshPhysicalMaterial color="#2b170d" roughness={0.06} clearcoat={1} clearcoatRoughness={0.02} />
      </mesh>
      {/* handle: half torus, ends sunk into the wall, turned toward the back */}
      <group rotation={[0, (60 * Math.PI) / 180, 0]}>
        <mesh geometry={handle} position={[R - 0.0035, H * 0.52, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <meshPhysicalMaterial color="#f3f2ee" roughness={0.2} clearcoat={1} clearcoatRoughness={0.06} />
        </mesh>
      </group>
    </group>
  )
}
