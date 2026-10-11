"use client"

import { Component, useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { detectQuality, type Quality } from "@/lib/dc/quality"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const RackScene = dynamic(() => import("./rack-scene"), { ssr: false })

export const FALLBACK_IMAGE = "/3d/rack-fallback.webp"

function StaticRack({ note }: { note?: string }) {
  return (
    <div className="relative h-full w-full bg-[#0b0e11]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK_IMAGE}
        alt="Network rack with a Fortinet FortiSwitch 448E and a Cisco Secure Firewall 6100, cabled with copper patch leads and fibre"
        className="h-full w-full object-cover"
      />
      {note && (
        <p className="absolute inset-x-0 bottom-4 text-center font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">{note}</p>
      )}
    </div>
  )
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <StaticRack note="3D view unavailable on this device" /> : this.props.children
  }
}

/** Mounts the 3D rack only once it scrolls near the viewport; falls back to a still image on weak devices. */
export function RackSection({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [quality, setQuality] = useState<Quality | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setQuality(detectQuality())
    if (new URLSearchParams(window.location.search).has("capture")) {
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

  return (
    <div ref={ref} className={`relative ${className}`}>
      {quality === "static" ? (
        <StaticRack />
      ) : visible && quality ? (
        <WebGLBoundary>
          <RackScene quality={quality} reducedMotion={reducedMotion} />
        </WebGLBoundary>
      ) : (
        <div className="h-full w-full bg-[#0b0e11]" />
      )}
    </div>
  )
}
