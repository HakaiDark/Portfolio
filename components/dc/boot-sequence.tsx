"use client"

import { useEffect, useRef, useState } from "react"

export interface BootSignals {
  /** the 3D engine chunk has loaded and the scene component mounted */
  engine: boolean
  /** asset download progress, 0..100 */
  progress: number
  /** textures/models all downloaded */
  assets: boolean
  /** shaders compiled and first frame ready */
  ready: boolean
}

type Line = { text: string; status?: string; dim?: boolean }

const HOST = "dc1-core.yassin.net"
const SESSION_KEY = "dc-boot-seen"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Matrix-style glyph rain on a canvas. */
function MatrixRain({ burst }: { burst: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const burstRef = useRef(burst)
  burstRef.current = burst
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext("2d")!
    const glyphs = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}#$"
    const size = 16
    let cols = 0
    let drops: number[] = []
    const resize = () => {
      c.width = c.clientWidth * Math.min(devicePixelRatio, 1.5)
      c.height = c.clientHeight * Math.min(devicePixelRatio, 1.5)
      ctx.setTransform(Math.min(devicePixelRatio, 1.5), 0, 0, Math.min(devicePixelRatio, 1.5), 0, 0)
      cols = Math.ceil(c.clientWidth / size)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
    }
    resize()
    window.addEventListener("resize", resize)
    let raf = 0
    let last = 0
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last < 33) return
      last = t
      ctx.fillStyle = burstRef.current ? "rgba(2,8,6,0.18)" : "rgba(2,8,6,0.1)"
      ctx.fillRect(0, 0, c.clientWidth, c.clientHeight)
      ctx.font = `${size}px ui-monospace, Consolas, monospace`
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * size
        ctx.fillStyle = Math.random() > 0.975 ? "#d8ffe8" : burstRef.current ? "#5dffa8" : "#1fd46f"
        ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, y)
        if (y > c.clientHeight && Math.random() > 0.975) drops[i] = 0
        drops[i] += burstRef.current ? 1.6 : 1
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-35" aria-hidden />
}

/**
 * Loading screen: a short "breaking into the data centre" terminal session whose steps
 * are tied to real loading progress, ending in ACCESS GRANTED. Skippable; returning
 * visitors get a one-line reconnect; reduced motion drops the rain and typing.
 */
export function BootSequence({
  signals,
  reducedMotion,
  rain = true,
  onDone,
}: {
  signals: BootSignals
  reducedMotion: boolean
  /** glyph rain behind the terminal; off on weaker devices so loading gets the whole CPU */
  rain?: boolean
  onDone: () => void
}) {
  const sig = useRef(signals)
  sig.current = signals
  const [lines, setLines] = useState<Line[]>([])
  const [granted, setGranted] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [returning] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1"
    } catch {
      return false
    }
  })
  const skip = useRef(false)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLines([]) // dev strict mode runs this effect twice
    const until = async (cond: () => boolean) => {
      while (!cond() && !cancelled) await wait(50)
    }
    const push = (l: Line) => !cancelled && setLines((ls) => [...ls, l])
    const patchLast = (p: Partial<Line>) => !cancelled && setLines((ls) => [...ls.slice(0, -1), { ...ls[ls.length - 1], ...p }])
    const type = async (text: string) => {
      if (reducedMotion || skip.current) return push({ text })
      push({ text: "" })
      for (let i = 1; i <= text.length && !cancelled && !skip.current; i++) {
        patchLast({ text: text.slice(0, i) })
        await wait(14)
      }
      patchLast({ text })
    }
    const step = async (text: string, cond: () => boolean, status = "ok", minMs = 160) => {
      push({ text, status: "…" })
      const t0 = performance.now()
      await until(cond)
      if (!skip.current && !reducedMotion) await wait(Math.max(0, minMs - (performance.now() - t0)))
      patchLast({ status })
    }

    ;(async () => {
      if (returning) {
        push({ text: `Reconnecting to ${HOST}`, status: "…" })
        await until(() => sig.current.ready)
        patchLast({ status: "ok" })
      } else {
        await type(`$ ssh -i ~/.ssh/recruiter_ed25519 guest@${HOST}`)
        await step(`Resolving ${HOST}`, () => true, "10.20.0.1", 140)
        await step("Negotiating cipher chacha20-poly1305", () => true, "ok", 160)
        await step("Authenticating (publickey)", () => true, "ok", 180)
        await step("Downloading 3D engine", () => sig.current.engine, "ok", 120)
        push({ text: "Loading rack assets", status: "0%" })
        while (!sig.current.assets && !cancelled) {
          patchLast({ status: `${Math.round(sig.current.progress)}%` })
          await wait(60)
        }
        patchLast({ status: "100%" })
        await step("Compiling shaders", () => sig.current.ready, "ok", 120)
        await step("Bringing up port1-48, ha1, fortilink", () => true, "up", 220)
      }
      if (cancelled) return
      try {
        sessionStorage.setItem(SESSION_KEY, "1")
      } catch {
        /* storage blocked: fine */
      }
      if (!skip.current) {
        setGranted(true)
        await wait(returning || reducedMotion ? 350 : 900)
      }
      if (cancelled) return
      setLeaving(true)
      await wait(500)
      if (!cancelled) onDone()
    })()
    return () => {
      cancelled = true
    }
    // run once; live signals are read through the ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        skip.current = true
        setSkipped(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020806] transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      role="status"
      aria-live="polite"
      aria-label={granted ? "Access granted" : "Loading the data centre"}
    >
      {rain && !reducedMotion && <MatrixRain burst={granted} />}
      <div className="relative w-full max-w-[680px] px-6">
        <div className="rounded-lg border border-[#1fd46f]/25 bg-black/70 p-5 font-mono text-[12px] leading-[1.9] text-[#3ee07a] shadow-[0_0_60px_rgba(31,212,111,0.12)] backdrop-blur-sm md:text-[13px]">
          {lines.map((l, i) => (
            <div key={i} className="flex gap-3">
              <span className="min-w-0 flex-1 truncate">{l.text}</span>
              {l.status && <span className={l.status === "…" ? "text-white/40 motion-safe:animate-pulse" : "text-white/70"}>{l.status}</span>}
            </div>
          ))}
          {!granted && (
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-[#3ee07a] motion-safe:animate-pulse" aria-hidden />
          )}
        </div>
        <div
          className={`pointer-events-none mt-8 text-center font-mono text-[28px] font-bold tracking-[0.4em] text-[#5dffa8] transition-all duration-500 md:text-[40px] ${
            granted ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ textShadow: "0 0 24px rgba(93,255,168,0.6)" }}
          aria-hidden={!granted}
        >
          ACCESS GRANTED
        </div>
      </div>
      {!granted && !skipped && (
        <button
          type="button"
          onClick={() => {
            skip.current = true
            setSkipped(true)
          }}
          className="absolute bottom-6 right-6 rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase hover:border-white/40 hover:text-white"
        >
          Skip ›
        </button>
      )}
    </div>
  )
}
