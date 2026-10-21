// Sound design for the packet film, synthesised with Web Audio like the data-hall ambience
// (no audio files): bass hits, laser zap, whooshes, the gate slam, an alarm and a soft pad.
import type { Cue } from "./journey"

export class JourneySound {
  private ctx: AudioContext | null = null
  private out: GainNode | null = null
  private noise: AudioBuffer | null = null
  private padNodes: AudioScheduledSourceNode[] = []
  muted = false

  /** Call from the click that starts the film (iOS only unlocks audio inside a user gesture). */
  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = (this.ctx = new Ctx())
      const out = (this.out = ctx.createGain())
      out.gain.value = this.muted ? 0 : 0.55
      out.connect(ctx.destination)
      const buf = (this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate))
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    }
    void this.ctx.resume()
  }

  setMuted(m: boolean) {
    this.muted = m
    if (this.ctx && this.out) this.out.gain.setTargetAtTime(m ? 0 : 0.55, this.ctx.currentTime, 0.05)
  }

  stopPad() {
    const t = this.ctx?.currentTime ?? 0
    this.padNodes.forEach((n) => {
      try {
        n.stop(t + 0.6)
      } catch {}
    })
    this.padNodes = []
  }

  dispose() {
    this.stopPad()
    void this.ctx?.close()
    this.ctx = this.out = this.noise = null
  }

  play(cue: Cue) {
    const ctx = this.ctx
    const out = this.out
    if (!ctx || !out || this.muted) return
    const t = ctx.currentTime
    const env = (g: GainNode, peak: number, attack: number, decay: number) => {
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(peak, t + attack)
      g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay)
    }
    const noise = (filterType: BiquadFilterType, f0: number, f1: number, dur: number, peak: number, attack = 0.02) => {
      const s = ctx.createBufferSource()
      s.buffer = this.noise
      s.loop = true
      const f = ctx.createBiquadFilter()
      f.type = filterType
      f.Q.value = 1.2
      f.frequency.setValueAtTime(f0, t)
      f.frequency.exponentialRampToValueAtTime(f1, t + dur)
      const g = ctx.createGain()
      env(g, peak, attack, dur)
      s.connect(f).connect(g).connect(out)
      s.start(t)
      s.stop(t + attack + dur + 0.05)
    }
    const tone = (type: OscillatorType, f0: number, f1: number, dur: number, peak: number, attack = 0.005) => {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.setValueAtTime(f0, t)
      o.frequency.exponentialRampToValueAtTime(f1, t + dur)
      const g = ctx.createGain()
      env(g, peak, attack, dur)
      o.connect(g).connect(out)
      o.start(t)
      o.stop(t + attack + dur + 0.05)
    }

    switch (cue) {
      case "boom": // sub drop with a soft click on top
        tone("sine", 110, 32, 1.4, 0.9)
        noise("lowpass", 900, 120, 0.25, 0.25)
        break
      case "zap": // the laser: a bright downward chirp
        tone("sawtooth", 3800, 900, 0.35, 0.12)
        tone("sine", 1900, 420, 0.5, 0.18)
        break
      case "whoosh":
        noise("bandpass", 300, 4200, 0.9, 0.35, 0.25)
        break
      case "rise":
        noise("bandpass", 200, 2400, 2.6, 0.18, 2.2)
        tone("sine", 55, 110, 2.6, 0.25, 2.2)
        break
      case "shimmer": // gates open: a glassy major chord
        ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone("triangle", f, f * 1.003, 1.8 + i * 0.2, 0.07, 0.04))
        break
      case "slam": // gates crash shut: metal thud and a spray of noise
        tone("square", 70, 38, 0.6, 0.35)
        noise("highpass", 2500, 6000, 0.7, 0.3, 0.005)
        noise("lowpass", 600, 80, 0.5, 0.45, 0.005)
        break
      case "alarm":
        ;[0, 0.32].forEach((d) => {
          const o = ctx.createOscillator()
          o.type = "square"
          o.frequency.value = 220
          const g = ctx.createGain()
          g.gain.setValueAtTime(0.0001, t + d)
          g.gain.exponentialRampToValueAtTime(0.06, t + d + 0.02)
          g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.22)
          o.connect(g).connect(out)
          o.start(t + d)
          o.stop(t + d + 0.3)
        })
        break
      case "pad": {
        // a slow, wide chord under the Earth shot, held until stopPad()
        this.stopPad()
        ;[110, 164.81, 220, 277.18].forEach((f) => {
          const o = ctx.createOscillator()
          o.type = "sine"
          o.frequency.value = f
          o.detune.value = Math.random() * 8 - 4
          const g = ctx.createGain()
          g.gain.setValueAtTime(0.0001, t)
          g.gain.exponentialRampToValueAtTime(0.05, t + 1.2)
          o.connect(g).connect(out)
          o.start(t)
          this.padNodes.push(o)
        })
        break
      }
    }
  }
}
