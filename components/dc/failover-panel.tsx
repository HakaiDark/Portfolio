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
    <div className="mt-4 rounded-lg border border-white/10 bg-black/35 p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">HA cluster · FGT-01 / FGT-02</p>
        <button
          type="button"
          onClick={onRun}
          disabled={running}
          className="shrink-0 rounded-full border border-[#ff6a2b]/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#ff8a55] uppercase transition-colors hover:bg-[#ff6a2b] hover:text-black disabled:border-white/15 disabled:text-white/40 disabled:hover:bg-transparent"
        >
          {running ? "Failing over…" : log.length ? "Run again" : "Pull FGT-01's plug"}
        </button>
      </div>
      {log.length === 0 ? (
        <p className="mt-2 text-[13px] leading-relaxed text-white/60">
          Cut power to the primary firewall and watch the secondary take over, then FGT-01 come back and reclaim primary.
        </p>
      ) : (
        <div ref={scrollRef} className="mt-2 max-h-40 space-y-1 overflow-y-auto font-mono text-[11px] leading-snug" aria-live="polite">
          {log.map((l, i) => (
            <div key={i} className="flex gap-2">
              <span className="w-14 shrink-0 text-white/40">{l.unit}</span>
              <span className={l.tone ? TONE[l.tone] : "text-[#a9b7c4]"}>{l.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
