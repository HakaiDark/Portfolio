"use client"

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { detectQuality, type Quality } from "@/lib/dc/quality"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { BootSequence, type BootSignals } from "./boot-sequence"
import type { RackSceneSignals } from "./rack-scene"

const RackScene = dynamic(() => import("./rack-scene"), { ssr: false })

export const FALLBACK_IMAGE = "/3d/rack-fallback.webp"

function StaticRack({ note }: { note?: string }) {
  return (
    <div className="relative h-full w-full bg-[#0b0e11]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK_IMAGE}
        alt="Network rack with a FortiGate 601F HA pair, FortiSwitch 448E, Cisco Catalyst 9300, FortiManager, FortiAnalyzer and HPE servers, cabled with copper and fibre"
        className="h-full w-full object-cover"
      />
      {note && (
        <p className="absolute inset-x-0 bottom-4 text-center font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">{note}</p>
      )}
    </div>
  )
}

class WebGLBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? <StaticRack note="3D view unavailable on this device" /> : this.props.children
  }
}

/** Mounts the 3D rack once it scrolls near the viewport, behind a loading sequence; falls back to a still on weak devices. */
export function RackSection({ className = "", overlay }: { className?: string; overlay?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [quality, setQuality] = useState<Quality | null>(null)
  const [capture, setCapture] = useState(false)
  const [bootDone, setBootDone] = useState(false)
  const [boot, setBoot] = useState<BootSignals>({ engine: false, progress: 0, assets: false, ready: false })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setQuality(detectQuality())
    if (new URLSearchParams(window.location.search).has("capture")) {
      setCapture(true)
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const signals = useMemo<RackSceneSignals>(
    () => ({
      onEngine: () => setBoot((b) => ({ ...b, engine: true })),
      onProgress: (progress) => setBoot((b) => ({ ...b, progress })),
      onAssets: () => setBoot((b) => ({ ...b, assets: true, progress: 100 })),
      onReady: () => setBoot((b) => ({ ...b, ready: true })),
    }),
    []
  )
  // if 3D fails, release the loading screen so the still image shows
  const onError = () => setBoot({ engine: true, progress: 100, assets: true, ready: true })

  const forceBoot = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("boot")
  const showBoot = quality !== null && quality !== "static" && (!capture || forceBoot) && !bootDone

  return (
    <div ref={ref} className={`relative ${className}`}>
      {quality === "static" ? (
        <StaticRack />
      ) : visible && quality ? (
        <WebGLBoundary onError={onError}>
          <RackScene quality={quality} reducedMotion={reducedMotion} signals={signals} />
        </WebGLBoundary>
      ) : (
        <div className="h-full w-full bg-[#0b0e11]" />
      )}
      {overlay}
      {showBoot && visible && <BootSequence signals={boot} reducedMotion={reducedMotion} rain={quality === "high"} onDone={() => setBootDone(true)} />}
    </div>
  )
}
