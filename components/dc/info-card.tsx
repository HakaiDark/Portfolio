"use client"

import { useEffect, useRef } from "react"
import type { RackCard } from "@/content/rack-cards"

/** Side card on desktop, bottom sheet on phones. */
export function InfoCard({ card: current, onClose }: { card: RackCard | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  // keep showing the last card while it animates out
  const last = useRef<RackCard | null>(null)
  if (current) last.current = current
  const card = current ? current : null
  const shown = last.current
  useEffect(() => {
    if (card) closeRef.current?.focus({ preventScroll: true })
  }, [card])

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-hidden={!card}
      aria-label={card?.title}
      className={`absolute z-30 border-white/10 bg-[#0b1014]/90 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out
        max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[58%] max-md:overflow-y-auto max-md:rounded-t-2xl max-md:border-t max-md:pb-[env(safe-area-inset-bottom)]
        md:right-6 md:top-1/2 md:w-[380px] md:-translate-y-1/2 md:rounded-xl md:border
        ${card ? "opacity-100 max-md:translate-y-0 md:translate-x-0" : "pointer-events-none opacity-0 max-md:translate-y-full md:translate-x-8"}`}
    >
      {shown && (
        <div className="p-6">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 md:hidden" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#ff6a2b] uppercase">{shown.eyebrow}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{shown.title}</h3>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-2 -mt-1 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-white/85">{shown.summary}</p>
          {shown.points && (
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
              {shown.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00ffe7]" />
                  {p}
                </li>
              ))}
            </ul>
          )}
          {shown.tags && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {shown.tags.map((t) => (
                <span key={t} className="rounded border border-white/12 px-2 py-1 font-mono text-[10px] tracking-wider text-white/70 uppercase">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
