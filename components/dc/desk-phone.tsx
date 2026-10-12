"use client"

import { useLayoutEffect, useMemo } from "react"
import { RoundedBox, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { unitY } from "@/lib/dc/devices"

/** On the shelf in the neighbouring right-hand rack, under the monitor pair. */
export const PHONE = {
  /** sits on the 1U shelf at U19 of the right rack (its tray top is the bottom of U20) */
  position: [0.74, unitY(20), -0.075] as [number, number, number],
  rotationY: -0.38,
  /** face plate (the cut-out photo), metres */
  w: 0.24,
  h: 0.2135,
  /** stand angle of the face from horizontal */
  tilt: (40 * Math.PI) / 180,
}

// texture is 768 x 683; helpers map its pixels onto the face plate
const TW = 768
const TH = 683
const px = (x: number) => (x / TW - 0.5) * PHONE.w
const py = (y: number) => (0.5 - y / TH) * PHONE.h + PHONE.h / 2

/** Our own screen in place of the photo's stock contacts: speed dials for the NOC. */
function screenTexture() {
  const c = document.createElement("canvas")
  c.width = 640
  c.height = 380
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#f4f6f8"
  ctx.fillRect(0, 0, 640, 380)
  ctx.fillStyle = "#1d2733"
  ctx.font = "500 22px system-ui, sans-serif"
  ctx.fillText("2401 · NOC DC1", 18, 34)
  const now = new Date()
  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
  ctx.fillText(time, 560, 34)
  ctx.fillStyle = "#d5dbe1"
  ctx.fillRect(0, 48, 640, 1)
  const left = ["Mohammad Yassin", "NOC on-call", "Fortinet TAC", "Facilities", "Security desk"]
  const right = ["WhatsApp", "IDF-02", "ISP NOC", "Help desk", "Data hall"]
  left.forEach((l, i) => {
    const y = 88 + i * 48
    if (i === 0) {
      ctx.fillStyle = "#1f9d55"
      ctx.fillRect(10, y - 30, 300, 42)
      ctx.fillStyle = "#ffffff"
    } else ctx.fillStyle = "#1d2733"
    ctx.font = `${i === 0 ? 600 : 400} 22px system-ui, sans-serif`
    ctx.fillText(l, 24, y)
    ctx.fillStyle = i === 0 ? "#1f9d55" : "#1d2733"
    ctx.font = `${i === 0 ? 600 : 400} 22px system-ui, sans-serif`
    ctx.fillText(right[i], 640 - 24 - ctx.measureText(right[i]).width, y)
  })
  ctx.fillStyle = "#e6eaee"
  ctx.fillRect(0, 334, 640, 46)
  ctx.fillStyle = "#1d2733"
  ctx.font = "20px system-ui, sans-serif"
  ;["Message", "Recents", "Contacts", "•••"].forEach((k, i) => ctx.fillText(k, 36 + i * 160, 365))
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

/** A helix wound along a path: the handset's coiled cord. */
function coiledCord(points: THREE.Vector3[], turns: number, radius: number) {
  const path = new THREE.CatmullRomCurve3(points)
  const frames = path.computeFrenetFrames(400, false)
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= 400; i++) {
    const t = i / 400
    const a = t * turns * Math.PI * 2
    const p = path.getPointAt(t)
    p.addScaledVector(frames.normals[i], Math.cos(a) * radius).addScaledVector(frames.binormals[i], Math.sin(a) * radius)
    pts.push(p)
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 900, 0.0016, 6, false)
}

/**
 * Cisco 8800-series desk phone, from a straight-on product photo cut out on its background:
 * the face is the photo on a tilted plate, with a real 3D handset and coiled cord on top.
 */
export function DeskPhone() {
  const face = useTexture("/3d/devices/cisco-8800-face.webp")
  useLayoutEffect(() => {
    face.colorSpace = THREE.SRGBColorSpace
    face.anisotropy = 8
    face.needsUpdate = true
  }, [face])
  const screen = useMemo(() => screenTexture(), [])
  const { w, h, tilt } = PHONE
  const cord = useMemo(
    () =>
      coiledCord(
        [
          new THREE.Vector3(px(106), py(668), 0.012),
          new THREE.Vector3(px(40), py(700) - 0.01, 0.03),
          new THREE.Vector3(px(-60), 0.02, 0.05),
          new THREE.Vector3(px(-40), 0.02, -0.02),
          new THREE.Vector3(px(10), py(420), -0.03),
        ],
        26,
        0.0055
      ),
    []
  )
  const body = "#2f3033"
  return (
    <group position={PHONE.position} rotation={[0, PHONE.rotationY, 0]}>
      {/* foot / stand */}
      <mesh position={[0, 0.012, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[w * 0.9, 0.024, 0.13]} />
        <meshStandardMaterial color={body} roughness={0.6} metalness={0.15} />
      </mesh>
      {/* face plate pivots on its front edge */}
      <group position={[0, 0.02, 0.085]} rotation={[-(Math.PI / 2 - tilt), 0, 0]}>
        {/* bodies behind the cut-out: keypad + cradle, and the screen module */}
        <mesh position={[0, (py(683) + py(290)) / 2, -0.013]} castShadow>
          <boxGeometry args={[w * 0.995, py(290) - py(683), 0.024]} />
          <meshStandardMaterial color={body} roughness={0.55} metalness={0.15} />
        </mesh>
        <mesh position={[(px(222) + px(745)) / 2, (py(0) + py(290)) / 2, -0.012]} castShadow>
          <boxGeometry args={[px(745) - px(222), py(0) - py(290), 0.022]} />
          <meshStandardMaterial color={body} roughness={0.55} metalness={0.15} />
        </mesh>
        <mesh position={[(px(0) + px(215)) / 2, (py(85) + py(290)) / 2, -0.013]} castShadow>
          <boxGeometry args={[px(215) - px(0), py(85) - py(290), 0.024]} />
          <meshStandardMaterial color={body} roughness={0.55} metalness={0.15} />
        </mesh>
        <mesh position={[0, h / 2, 0.0004]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial map={face} transparent alphaTest={0.4} roughness={0.5} metalness={0.1} />
        </mesh>
        {/* our screen over the photo's */}
        <mesh position={[(px(328) + px(655)) / 2, (py(44) + py(238)) / 2, 0.0012]}>
          <planeGeometry args={[px(655) - px(328), py(44) - py(238)]} />
          <meshBasicMaterial map={screen} toneMapped={false} color={[0.92, 0.92, 0.92]} />
        </mesh>
        {/* handset, resting in the cradle */}
        <RoundedBox args={[px(178) - px(36), py(44) - py(670), 0.024]} radius={0.009} smoothness={4} position={[(px(36) + px(178)) / 2, (py(44) + py(670)) / 2, 0.012]} castShadow>
          <meshStandardMaterial color="#45464a" roughness={0.42} metalness={0.1} />
        </RoundedBox>
        <mesh geometry={cord} castShadow>
          <meshStandardMaterial color="#2a2b2e" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
