"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { MEDIA, PACKET, SCRIPT, type Caption, type Shot } from "@/lib/dc/journey"
import { JourneySound } from "@/lib/dc/journey-sound"

type Phase = "shift" | Shot | "choose" | "denied" | "out"

const CHAPTER: Partial<Record<Phase, string>> = {
  shift: "01 · The port",
  dive: "01 · The port",
  choose: "02 · The firewall",
  accept: "02 · The firewall",
  deny: "02 · The firewall",
  denied: "02 · The firewall",
  world: "03 · The WAN",
  return: "03 · The WAN",
}
const TONE = { good: "text-[#3ee07a]", bad: "text-[#ff7a6b]", dim: "text-white/60" }

/** FortiGate card extra: start the film from here. */
export function TracePanel({ onRun, disabled }: { onRun: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onRun}
      disabled={disabled}
      className="group mt-4 flex w-full items-center gap-3 rounded-lg border border-[#00ffe7]/40 bg-[#00ffe7]/[0.06] p-3 text-left transition-colors hover:border-[#00ffe7] hover:bg-[#00ffe7]/15 disabled:opacity-40"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#00ffe7] text-black transition-transform group-hover:scale-105" aria-hidden>
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
        </svg>
      </span>
      <span>
        <span className="block font-mono text-[10px] tracking-[0.2em] text-[#00ffe7] uppercase">Follow a packet · 25 s film</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-white/70">Dive into this port, decide its fate at the firewall, ride it out to the world.</span>
      </span>
    </button>
  )
}

/** Hero card button: shown once the 3D rack (and so the film) is available on this device. */
export function TraceHeroButton({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const check = () => setReady(!!(window as unknown as { __dcTrace?: boolean }).__dcTrace)
    check()
    window.addEventListener("dc:trace-ready", check)
    return () => window.removeEventListener("dc:trace-ready", check)
  }, [])
  if (!ready) return null
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("dc:trace"))} className={className}>
      <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden>
        <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
      </svg>
      Follow a packet
    </button>
  )
}

/**
 * Click-to-play film layered over the 3D rack: the 3D view resolves into a photograph, dives
 * into the FortiGate's fibre port, lets the visitor ACCEPT or DENY the packet at the firewall
 * chip, rides out to the Earth and dives back into the live rack.
 */
export function PacketJourney({
  run,
  onCovered,
}: {
  /** bump to (re)start the film; 0 = never started */
  run: number
  /** true once the film fully covers the 3D canvas (pause rendering), false as it fades out */
  onCovered: (covered: boolean) => void
}) {
  const [phase, setPhase] = useState<Phase>("shift")
  const [caption, setCaption] = useState<Caption | null>(null)
  const [muted, setMuted] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const vids = useRef<Partial<Record<Shot, HTMLVideoElement | null>>>({})
  const flashRef = useRef<HTMLDivElement>(null)
  const sound = useRef<JourneySound | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const phaseRef = useRef<Phase>(phase)
  phaseRef.current = phase

  const later = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))
  const flash = (color = "#ffffff") => {
    flashRef.current?.animate([{ opacity: 1, background: color }, { opacity: 0, background: color }], { duration: 650, easing: "ease-out" })
  }

  const play = useCallback((shot: Shot) => {
    const v = vids.current[shot]
    setPhase(shot)
    setCaption(null)
    if (!v) return
    v.currentTime = 0
    void v.play().catch(() => {})
  }, [])

  // start: mount, unlock audio (we're inside the click), begin the reality shift
  useEffect(() => {
    if (!run) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (!sound.current) sound.current = new JourneySound()
    sound.current.setMuted(muted)
    sound.current.unlock()
    setMounted(true)
    setPhase("shift")
    setCaption(null)
    setBuffering(false)
    // a second viewing starts from the top (the choice screen shows the ACCEPT shot's first frame)
    Object.values(vids.current).forEach((v) => {
      if (!v) return
      v.pause()
      v.currentTime = 0
    })
    // let the camera glide to the port, then resolve the 3D view into the photograph
    later(900, () => {
      setShown(true)
      sound.current?.play("rise")
    })
    later(2300, () => onCovered(true))
    later(2600, () => play("dive"))
    // muted is read once per start; later changes go through toggleMute
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      sound.current?.dispose()
    },
    []
  )

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    Object.values(vids.current).forEach((v) => v?.pause())
    sound.current?.stopPad()
    setPhase("out")
    setCaption(null)
    onCovered(false)
    setShown(false)
    later(750, () => setMounted(false))
  }, [onCovered])

  // captions and sound cues follow the playing shot's clock
  useEffect(() => {
    if (!mounted) return
    let raf = 0
    let lastShot: Phase | null = null
    let fired = new Set<number>()
    const tick = () => {
      const p = phaseRef.current
      const shot = p in SCRIPT ? (p as Shot) : null
      if (p !== lastShot) {
        lastShot = p
        fired = new Set()
      }
      const v = shot ? vids.current[shot] : null
      if (shot && v) {
        const t = v.currentTime
        const s = SCRIPT[shot]
        s.cues.forEach((c, i) => {
          if (t >= c.at && !fired.has(i)) {
            fired.add(i)
            sound.current?.play(c.cue)
          }
        })
        const cap = [...s.captions].reverse().find((c) => t >= c.at) ?? null
        setCaption((cur) => (cur?.text === cap?.text ? cur : cap))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mounted])

  const onEnded = (shot: Shot) => {
    if (phaseRef.current !== shot) return
    if (shot === "dive") {
      flash()
      sound.current?.play("boom")
      setPhase("choose")
      setCaption(null)
    } else if (shot === "accept") {
      flash()
      play("world")
    } else if (shot === "deny") {
      setPhase("denied")
    } else if (shot === "world") {
      // hold on the Earth for a beat, then dive back home
      later(1600, () => {
        sound.current?.stopPad()
        play("return")
      })
    } else if (shot === "return") {
      flash()
      finish()
    }
  }

  const toggleMute = () => {
    const m = !muted
    setMuted(m)
    sound.current?.unlock()
    sound.current?.setMuted(m)
  }

  // Esc skips the film
  useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        finish()
      }
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [mounted, finish])

  if (!mounted) return null
  const isVideo = (s: Shot) => phase === s || (s === "accept" && phase === "choose") || (s === "deny" && phase === "denied")
  const decide = (accept: boolean) => {
    sound.current?.unlock()
    play(accept ? "accept" : "deny")
  }

  return (
    <div
      className={`absolute inset-0 z-[45] overflow-hidden bg-black transition-opacity duration-700 ${shown ? "opacity-100" : "pointer-events-none opacity-0"}`}
      role="dialog"
      aria-label="Follow a packet: a short film"
    >
      {/* the 3D view resolving into a photograph: a focus pull plus a scan line */}
      <div className={`absolute inset-0 transition-[filter,transform] duration-[1400ms] ease-out ${shown ? "scale-100 blur-0" : "scale-[1.06] blur-xl"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MEDIA.start} alt="" className={`absolute inset-0 h-full w-full object-cover ${phase === "shift" ? "" : "invisible"}`} />
        {(Object.keys(MEDIA.shots) as Shot[]).map((s) => (
          <video
            key={s}
            ref={(el) => {
              vids.current[s] = el
            }}
            src={MEDIA.shots[s]}
            poster={s === "dive" ? MEDIA.start : s === "accept" || s === "deny" ? MEDIA.chip : undefined}
            muted
            playsInline
            preload="auto"
            onEnded={() => onEnded(s)}
            onWaiting={() => phaseRef.current === s && setBuffering(true)}
            onPlaying={() => setBuffering(false)}
            onPause={() => setBuffering(false)}
            onError={() => phaseRef.current === s && finish()}
            className={`absolute inset-0 h-full w-full object-cover ${isVideo(s) ? "" : "invisible"}`}
          />
        ))}
      </div>
      {phase === "shift" && shown && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[#00ffe7] shadow-[0_0_24px_4px_rgba(0,255,231,0.6)] motion-safe:animate-[journey-scan_1.4s_ease-out_forwards]" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
      <div ref={flashRef} className="pointer-events-none absolute inset-0 opacity-0" />

      {/* chapter + controls */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-3 md:p-5">
        <p className="min-w-0 font-mono text-[10px] leading-snug tracking-[0.2em] text-[#00ffe7] uppercase md:text-[11px] md:tracking-[0.25em]">
          Trace · {CHAPTER[phase] ?? ""}
          {buffering && <span className="ml-3 text-white/50">buffering…</span>}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={!muted}
            aria-label={muted ? "Turn film sound on" : "Mute film sound"}
            className="whitespace-nowrap rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white/80 uppercase backdrop-blur-md hover:border-white/50"
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
          <button
            type="button"
            onClick={finish}
            className="whitespace-nowrap rounded-full border border-white/20 bg-black/50 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white/80 uppercase backdrop-blur-md hover:border-white/50"
          >
            Skip ✕
          </button>
        </div>
      </div>

      {/* caption */}
      {caption && (
        <p
          key={caption.text}
          aria-live="polite"
          className={`absolute bottom-6 left-4 right-4 font-mono text-[11px] tracking-[0.12em] uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] motion-safe:animate-[journey-cap_0.5s_ease-out] md:bottom-10 md:left-10 md:text-[13px] ${
            caption.tone ? TONE[caption.tone] : "text-white/90"
          }`}
        >
          {caption.text}
        </p>
      )}

      {/* the visitor's decision at the firewall */}
      {phase === "choose" && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-10">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0e11]/80 p-4 text-center shadow-2xl backdrop-blur-md motion-safe:animate-[journey-cap_0.5s_ease-out]">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#00ffe7] uppercase">Inbound packet · policy lookup</p>
            <p className="mt-1.5 font-mono text-[12px] text-white/80">{PACKET}</p>
            <p className="mt-2 text-sm text-white/70">You are the firewall. Your call:</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => decide(true)}
                className="rounded-full border border-[#3ee07a] bg-[#3ee07a]/15 py-2.5 font-mono text-[12px] font-semibold tracking-[0.15em] text-[#3ee07a] uppercase transition-colors hover:bg-[#3ee07a] hover:text-black"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => decide(false)}
                className="rounded-full border border-[#ff6b5b] bg-[#ff6b5b]/15 py-2.5 font-mono text-[12px] font-semibold tracking-[0.15em] text-[#ff7a6b] uppercase transition-colors hover:bg-[#ff6b5b] hover:text-black"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}
      {phase === "denied" && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-10">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0e11]/80 p-4 text-center shadow-2xl backdrop-blur-md motion-safe:animate-[journey-cap_0.5s_ease-out]">
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#ff7a6b] uppercase">Threat blocked</p>
            <p className="mt-2 text-sm text-white/75">That packet never reached the network.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => decide(true)}
                className="rounded-full border border-[#3ee07a] bg-[#3ee07a]/15 py-2.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-[#3ee07a] uppercase transition-colors hover:bg-[#3ee07a] hover:text-black"
              >
                Let one through
              </button>
              <button
                type="button"
                onClick={finish}
                className="rounded-full border border-white/25 py-2.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-white/80 uppercase transition-colors hover:bg-white hover:text-black"
              >
                Back to the rack
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
