"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { drawAirWave, drawFortiAnalyzer, panelFinish, SCREEN_H, SCREEN_SCALE, SCREEN_W, type ScreenState } from "@/lib/dc/noc-screens"

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
    canvas.width = Math.round(SCREEN_W * SCREEN_SCALE)
    canvas.height = Math.round(SCREEN_H * SCREEN_SCALE)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 16
    const ctx = canvas.getContext("2d")!
    // layout code works in SCREEN_W x SCREEN_H units; the canvas is denser for sharp text
    const render = (t: number, s: ScreenState) => {
      ctx.setTransform(SCREEN_SCALE, 0, 0, SCREEN_SCALE, 0, 0)
      draw(ctx, t, s)
      panelFinish(ctx)
    }
    return { canvas, ctx, tex, render }
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
      s.render(t, stateRef.current)
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
            {/* slim front frame, tapered back housing */}
            <RoundedBox args={[w, h, 0.012]} radius={0.003} smoothness={3} castShadow>
              <meshStandardMaterial color="#0c0d0f" roughness={0.4} metalness={0.35} />
            </RoundedBox>
            <RoundedBox args={[w * 0.78, h * 0.74, 0.028]} radius={0.01} smoothness={3} position={[0, -0.01, -0.016]} castShadow>
              <meshStandardMaterial color="#17181b" roughness={0.55} metalness={0.2} />
            </RoundedBox>
            {/* lit panel: thin bezels, slightly wider chin */}
            <mesh position={[0, 0.0025, 0.0062]}>
              <planeGeometry args={[w - 0.011, h - 0.016]} />
              <meshBasicMaterial map={screens[i].tex} toneMapped={false} color={[0.95, 0.95, 0.95]} />
            </mesh>
            {/* cover glass: dark, glossy, catches the room's lights and racks */}
            <mesh position={[0, 0, 0.0066]}>
              <planeGeometry args={[w - 0.002, h - 0.002]} />
              <meshStandardMaterial color="#000000" metalness={1} roughness={0.07} transparent opacity={0.13} envMapIntensity={1.4} depthWrite={false} />
            </mesh>
            {/* power LED */}
            <mesh position={[w / 2 - 0.02, -h / 2 + 0.004, 0.0066]}>
              <planeGeometry args={[0.004, 0.0025]} />
              <meshBasicMaterial color={[0.6, 2.2, 3]} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
