"use client"

import { useEffect, useRef } from "react"
import type { HaStep } from "@/lib/dc/ha"

const TONE: Record<string, string> = { bad: "text-[#ff7a6b]", warn: "text-[#ffb020]", good: "text-[#3ee07a]" }

/** FortiGate card extra: run the HA failover demo and watch its event log. */
export function FailoverPanel({ running, log, onRun }: { running: boolean; log: NonNullable<HaStep["log"]>[]; onRun: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [log.length])
  return (
    <div className="mt-3">
      {/* as prominent as the film button: the demo is the card's main action */}
      <button
        type="button"
        onClick={onRun}
        disabled={running}
        className="group flex w-full items-center gap-3 rounded-lg border border-[#ff6a2b]/60 bg-[#ff6a2b]/[0.08] p-3 text-left transition-colors hover:border-[#ff6a2b] hover:bg-[#ff6a2b]/20 disabled:cursor-default disabled:border-[#ffb020]/50 disabled:bg-[#ffb020]/[0.06]"
      >
        <span
          className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-black transition-transform group-hover:scale-105 ${running ? "bg-[#ffb020]" : "bg-[#ff6a2b]"}`}
          aria-hidden
        >
          {!running && <span className="absolute inset-0 rounded-full bg-[#ff6a2b] opacity-60 motion-safe:animate-ping" />}
          {/* power plug */}
          <svg className="relative" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.5 1.5v3.5M10.5 1.5v3.5M3.5 5h9v2.5a4.5 4.5 0 01-9 0V5zM8 12v2.5" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className={`block font-mono text-[10px] tracking-[0.2em] uppercase ${running ? "text-[#ffb020]" : "text-[#ff8a55]"}`}>
            {running ? "Failing over · watch the rack" : log.length ? "Run the failover again" : "Live HA failover · 12 s"}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-white/75">
            {running ? "FGT-02 is taking over. FGT-01 comes back and reclaims primary." : "Pull FGT-01's plug and watch FGT-02 take over without dropping traffic."}
          </span>
        </span>
      </button>
      {log.length > 0 && (
        <div className="mt-2 rounded-lg border border-white/10 bg-black/35 p-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">HA cluster · FGT-01 / FGT-02</p>
          <div ref={scrollRef} className="mt-2 max-h-40 space-y-1 overflow-y-auto font-mono text-[11px] leading-snug" aria-live="polite">
            {log.map((l, i) => (
              <div key={i} className="flex gap-2">
                <span className="w-14 shrink-0 text-white/40">{l.unit}</span>
                <span className={l.tone ? TONE[l.tone] : "text-[#a9b7c4]"}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
