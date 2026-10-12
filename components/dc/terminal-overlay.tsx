"use client"

import { useEffect, useRef, useState } from "react"
import { PROMPT, QUICK_COMMANDS, WELCOME, runCommand, type TermLine } from "@/lib/dc/terminal"

const KIND_CLASS: Record<NonNullable<TermLine["kind"]>, string> = {
  cmd: "text-white",
  out: "text-[#a9b7c4]",
  err: "text-[#ff7a6b]",
  link: "text-[#00ffe7] underline decoration-[#00ffe7]/40 underline-offset-2 hover:decoration-[#00ffe7]",
  dim: "text-white/45",
  accent: "text-[#3ee07a]",
}

/** The laptop's console, as a real terminal visitors can type into. */
export function TerminalOverlay({ open, onClose, onAction }: { open: boolean; onClose: () => void; onAction?: (action: "failover") => void }) {
  const [lines, setLines] = useState<(TermLine & { prompt?: boolean })[]>(WELCOME)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    // don't pop the phone keyboard straight away; focus on desktop only
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus({ preventScroll: true })
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const run = (raw: string) => {
    const res = runCommand(raw)
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 50))
    setHIdx(-1)
    setInput("")
    if (res.clear) return setLines([])
    if (res.exit) {
      setLines((l) => [...l, { text: raw, kind: "cmd", prompt: true }, ...res.lines, { text: "Connection closed.", kind: "dim" }])
      const action = res.action
      setTimeout(() => (action && onAction ? onAction(action) : onClose()), res.action ? 900 : 350)
      return
    }
    setLines((l) => [...l, { text: raw, kind: "cmd", prompt: true }, ...res.lines])
    if (res.open) window.open(res.open, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className={`absolute inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 md:items-center ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!open}
      // closed: not just transparent but unreachable by Tab / screen readers
      inert={!open}
    >
      <div
        role="dialog"
        aria-label="Console session to FGT-01"
        onClick={(e) => e.stopPropagation()}
        className={`flex h-[78%] w-full flex-col overflow-hidden border border-white/10 bg-[#06090c]/95 shadow-2xl transition-transform duration-300 max-md:rounded-t-2xl md:h-[min(560px,80%)] md:w-[min(820px,92%)] md:rounded-xl ${
          open ? "translate-y-0" : "translate-y-6"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#151b22] px-4 py-2.5">
          <span className="font-mono text-[11px] tracking-wide text-[#8aa0b4]">COM3 · FGT-01 console · 9600 8N1</span>
          <button type="button" onClick={onClose} className="rounded px-2 py-1 font-mono text-[11px] text-white/60 hover:bg-white/10 hover:text-white">
            exit ✕
          </button>
        </div>
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed md:text-[14px]"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {l.prompt && <span className="text-[#3ee07a]">{PROMPT} </span>}
              {l.href ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={KIND_CLASS.link}>
                  {l.text}
                </a>
              ) : (
                <span className={KIND_CLASS[l.kind ?? "out"]}>{l.text}</span>
              )}
            </div>
          ))}
          <form
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault()
              run(input)
            }}
          >
            <span className="shrink-0 text-[#3ee07a]">{PROMPT}&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && history.length) {
                  e.preventDefault()
                  const n = Math.min(hIdx + 1, history.length - 1)
                  setHIdx(n)
                  setInput(history[n])
                } else if (e.key === "ArrowDown") {
                  e.preventDefault()
                  const n = hIdx - 1
                  setHIdx(n)
                  setInput(n >= 0 ? history[n] : "")
                } else if (e.key === "Escape") {
                  onClose()
                }
              }}
              aria-label="Command"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="send"
              className="min-w-0 flex-1 bg-transparent text-white caret-[#3ee07a] outline-none"
            />
          </form>
        </div>
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          {QUICK_COMMANDS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] text-white/75 hover:border-[#3ee07a]/60 hover:text-[#3ee07a]"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
