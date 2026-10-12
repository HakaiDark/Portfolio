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
  // pause rendering while the hero is scrolled out of view (smooth scrolling, less battery)
  const [onScreen, setOnScreen] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // phones: the name card slides away once the visitor starts exploring the rack;
  // every screen: it also steps aside while a view is open or the camera is zoomed in
  const [exploring, setExploring] = useState(false)
  const [focused, setFocused] = useState(false)
  const [resetNonce, setResetNonce] = useState(0)
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
      onExplore: () => setExploring(true),
      onFocus: setFocused,
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
  // The loading screen only mounts after hydration; keep the name card hidden until then (and
  // until the scene is ready) so it doesn't flash for a frame before the loading screen covers it.
  const overlayPending = quality === null || (showBoot && !boot.ready)

  return (
    <div ref={ref} className={`relative ${className}`}>
      {quality === "static" ? (
        <StaticRack />
      ) : visible && quality ? (
        <WebGLBoundary onError={onError}>
          <RackScene quality={quality} reducedMotion={reducedMotion} signals={signals} active={onScreen} resetNonce={resetNonce} />
        </WebGLBoundary>
      ) : (
        <div className="h-full w-full bg-[#0b0e11]" />
      )}
      {overlay && (
        <div
          // positioned so the slide doesn't re-anchor the absolutely positioned card
          className={`hero-overlay pointer-events-none absolute inset-x-0 top-0 z-[35] transition-[opacity,transform] duration-300 ease-out ${
            overlayPending ? "invisible opacity-0" : ""
          } ${
            focused
              ? "-translate-y-6 opacity-0 [&_*]:pointer-events-none"
              : exploring
                ? "max-md:-translate-y-6 max-md:opacity-0 max-md:[&_*]:pointer-events-none"
                : ""
          }`}
        >
          {overlay}
          {/* without JavaScript there is no loading screen: show the card */}
          <noscript>
            <style>{".hero-overlay{visibility:visible!important;opacity:1!important}"}</style>
          </noscript>
        </div>
      )}
      {overlay && (focused || exploring) && (
        <button
          type="button"
          onClick={() => {
            setExploring(false)
            // inside a view or zoomed in: take the visitor back to the overview, card and all
            if (focused) setResetNonce((n) => n + 1)
          }}
          aria-label="Back to the overview and the intro card"
          className={`absolute top-3 left-3 z-[36] flex items-center gap-2 rounded-full border border-white/15 bg-[#0b0e11]/80 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md ${focused ? "" : "md:hidden"}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ee07a]" aria-hidden />
          Mohammad Yassin
          <span className="text-white/50" aria-hidden>▾</span>
        </button>
      )}
      {showBoot && visible && <BootSequence signals={boot} reducedMotion={reducedMotion} rain={quality === "high"} onDone={() => setBootDone(true)} />}
    </div>
  )
}
