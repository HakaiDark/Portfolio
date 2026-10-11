// Data-hall ambience, synthesised with Web Audio (no audio files to download):
// low air-handling rumble, mains hum, and server fan noise that rises as the camera gets close.

export class Ambience {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private fan: GainNode | null = null
  private fanFilter: BiquadFilterNode | null = null
  private wanted = false

  /** Must be called from a user gesture (iOS Safari only unlocks audio inside one). */
  start() {
    this.wanted = true
    if (!this.ctx) this.build()
    const ctx = this.ctx!
    void ctx.resume()
    this.master!.gain.cancelScheduledValues(ctx.currentTime)
    this.master!.gain.setTargetAtTime(0.9, ctx.currentTime, 0.35)
  }

  stop() {
    this.wanted = false
    const ctx = this.ctx
    if (!ctx || !this.master) return
    this.master.gain.cancelScheduledValues(ctx.currentTime)
    this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.2)
    setTimeout(() => !this.wanted && void ctx.suspend(), 900)
  }

  /** Pause/resume without changing the visitor's choice (hero off screen, tab hidden). */
  setPaused(paused: boolean) {
    if (!this.ctx || !this.wanted) return
    void (paused ? this.ctx.suspend() : this.ctx.resume())
  }

  dispose() {
    this.wanted = false
    void this.ctx?.close()
    this.ctx = this.master = this.fan = this.fanFilter = null
  }

  /** 0 = across the aisle, 1 = face to face with the fans. */
  setProximity(p: number) {
    const ctx = this.ctx
    if (!ctx || !this.fan || !this.fanFilter) return
    this.fan.gain.setTargetAtTime(0.025 + p * 0.11, ctx.currentTime, 0.25)
    this.fanFilter.frequency.setTargetAtTime(1500 + p * 1600, ctx.currentTime, 0.3)
  }

  private build() {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = (this.ctx = new Ctx())
    const master = (this.master = ctx.createGain())
    master.gain.value = 0
    master.connect(ctx.destination)

    // shared noise buffers, looped
    const seconds = 4
    const white = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const brown = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const w = white.getChannelData(0)
    const b = brown.getChannelData(0)
    let last = 0
    for (let i = 0; i < w.length; i++) {
      w[i] = Math.random() * 2 - 1
      last = (last + 0.02 * w[i]) / 1.02
      b[i] = last * 3.5
    }
    const loop = (buf: AudioBuffer) => {
      const s = ctx.createBufferSource()
      s.buffer = buf
      s.loop = true
      s.start()
      return s
    }

    // air handling: deep, steady rumble
    const rumbleLp = ctx.createBiquadFilter()
    rumbleLp.type = "lowpass"
    rumbleLp.frequency.value = 320
    const rumble = ctx.createGain()
    rumble.gain.value = 0.32
    loop(brown).connect(rumbleLp).connect(rumble).connect(master)

    // mains hum (50 Hz grid: 100 Hz and 150 Hz harmonics), barely there
    for (const [f, g] of [
      [100, 0.012],
      [150, 0.006],
    ]) {
      const o = ctx.createOscillator()
      o.frequency.value = f
      const og = ctx.createGain()
      og.gain.value = g
      o.connect(og).connect(master)
      o.start()
    }

    // server fans: band of airy noise whose level and pitch follow the camera distance,
    // with a slow wobble like fans ramping against each other
    const fanFilter = (this.fanFilter = ctx.createBiquadFilter())
    fanFilter.type = "bandpass"
    fanFilter.frequency.value = 1800
    fanFilter.Q.value = 0.9
    const fan = (this.fan = ctx.createGain())
    fan.gain.value = 0.03
    loop(white).connect(fanFilter).connect(fan).connect(master)
    const wobble = ctx.createOscillator()
    wobble.frequency.value = 0.13
    const wobbleDepth = ctx.createGain()
    wobbleDepth.gain.value = 140
    wobble.connect(wobbleDepth).connect(fanFilter.frequency)
    wobble.start()
  }
}
