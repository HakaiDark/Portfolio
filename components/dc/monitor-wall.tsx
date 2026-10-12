"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { drawAirWave, drawFortiAnalyzer, SCREEN_H, SCREEN_W, type ScreenState } from "@/lib/dc/noc-screens"

/** Where the pair of monitors hangs: in front of the neighbouring rack on the right. */
export const MONITORS = {
  position: [0.74, 0, 0.17] as [number, number, number],
  /** turned a little toward the hero rack and the aisle */
  rotationY: -0.32,
  /** centre heights of the top and bottom screens */
  tops: [1.9, 1.56],
  width: 0.548,
  height: 0.326,
}

const POWDER = { color: "#141518", roughness: 0.55, metalness: 0.45 }

function useScreen(draw: (ctx: CanvasRenderingContext2D, t: number, s: ScreenState) => void) {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = SCREEN_W
    canvas.height = SCREEN_H
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return { canvas, ctx: canvas.getContext("2d")!, tex, draw }
  }, [draw])
}

/**
 * Two 24" monitors on a rack-mounted arm: FortiAnalyzer above, AirWave below. Redrawn twice a
 * second (once on low quality), so they cost a canvas upload, not a render pass.
 */
export function MonitorWall({ state, quality }: { state: ScreenState; quality: "high" | "low" }) {
  const top = useScreen(drawFortiAnalyzer)
  const bottom = useScreen(drawAirWave)
  const screens = [top, bottom]
  const stateRef = useRef(state)
  stateRef.current = state
  const next = useRef(0)
  useEffect(() => () => screens.forEach((s) => s.tex.dispose()), []) // eslint-disable-line react-hooks/exhaustive-deps
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (t < next.current) return
    next.current = t + (quality === "high" ? 0.5 : 1)
    for (const s of screens) {
      s.draw(s.ctx, t, stateRef.current)
      s.tex.needsUpdate = true
    }
  })
  // redraw at once when the failover phase changes, not up to a second later
  useEffect(() => {
    next.current = 0
  }, [state.phase])

  const { width: w, height: h } = MONITORS
  const poleTop = MONITORS.tops[0] + h / 2 + 0.03
  const poleBottom = MONITORS.tops[1] - h / 2 - 0.05
  return (
    <group position={MONITORS.position}>
      {/* rack-mount pole: two cross-bars bolted across the front rails, each with a stand-off arm */}
      {[poleBottom + 0.06, poleTop - 0.06].map((y) => (
        <group key={y}>
          <mesh position={[0, y, -MONITORS.position[2] + 0.008]} castShadow>
            <boxGeometry args={[0.5, 0.03, 0.01]} />
            <meshStandardMaterial {...POWDER} />
          </mesh>
          <mesh position={[0, y, -MONITORS.position[2] / 2]} castShadow>
            <boxGeometry args={[0.03, 0.03, MONITORS.position[2]]} />
            <meshStandardMaterial {...POWDER} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, (poleTop + poleBottom) / 2, 0]} castShadow>
        <cylinderGeometry args={[0.016, 0.016, poleTop - poleBottom, 16]} />
        <meshStandardMaterial color="#2a2c30" metalness={0.7} roughness={0.35} />
      </mesh>
      <group rotation={[0, MONITORS.rotationY, 0]}>
        {MONITORS.tops.map((y, i) => (
          <group key={y} position={[0, y, 0.045]}>
            {/* short VESA arm */}
            <mesh position={[0, 0, -0.03]}>
              <boxGeometry args={[0.1, 0.1, 0.03]} />
              <meshStandardMaterial {...POWDER} />
            </mesh>
            {/* body + glass */}
            <mesh castShadow>
              <boxGeometry args={[w, h, 0.028]} />
              <meshStandardMaterial color="#0d0e10" roughness={0.45} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0.004, 0.0145]}>
              <planeGeometry args={[w - 0.014, h - 0.024]} />
              <meshBasicMaterial map={screens[i].tex} toneMapped={false} color={[0.92, 0.92, 0.92]} />
            </mesh>
            {/* power LED */}
            <mesh position={[w / 2 - 0.02, -h / 2 + 0.006, 0.0145]}>
              <planeGeometry args={[0.004, 0.0025]} />
              <meshBasicMaterial color={[0.6, 2.2, 3]} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
