// "Follow a packet": a short click-to-play film that leaves the 3D rack through a FortiGate
// fibre port and comes back. The footage is AI-generated photoreal video (Seedance 2.5 via
// ElevenLabs), cut and re-timed with ffmpeg into the files in /public/cinematic/.
// The visitor makes the firewall decision (ACCEPT / DENY) half-way through.

export type Shot = "dive" | "accept" | "deny" | "world" | "return"

/** Where the 3D camera parks before the hand-off; the first frame of the film matches this view. */
export const TRACE_POSE = { position: [0.13, 1.625, 0.27] as [number, number, number], target: [0.045, 1.59, 0] as [number, number, number] }

export const MEDIA = {
  /** first frame of the dive: the 3D view re-shot as a macro photograph */
  start: "/cinematic/start.webp",
  /** the firewall chip, where the visitor decides */
  chip: "/cinematic/chip.webp",
  shots: {
    dive: "/cinematic/dive.mp4",
    accept: "/cinematic/accept.mp4",
    deny: "/cinematic/deny.mp4",
    world: "/cinematic/world.mp4",
    return: "/cinematic/return.mp4",
  } satisfies Record<Shot, string>,
}

export type Cue = "boom" | "zap" | "whoosh" | "slam" | "alarm" | "rise" | "shimmer" | "pad"

export interface Caption {
  at: number
  text: string
  tone?: "good" | "bad" | "dim"
}

/** captions and sound cues, in seconds from the start of each shot (times match the cut files) */
export const SCRIPT: Record<Shot, { captions: Caption[]; cues: { at: number; cue: Cue }[] }> = {
  dive: {
    captions: [
      { at: 0, text: "FGT-01 · FortiGate 601F · SFP+ port" },
      { at: 2.9, text: "10GBASE-SR · laser fires at 850 nm" },
      { at: 4.3, text: "Inside the glass · OM4 multimode fibre", tone: "dim" },
    ],
    // dive.mp4: 0-2.6 s push in (1.6x), 2.6-3.8 s laser (slow motion), 3.8 s on: inside the fibre
    cues: [
      { at: 3.0, cue: "zap" },
      { at: 4.15, cue: "boom" },
      { at: 4.2, cue: "whoosh" },
    ],
  },
  accept: {
    captions: [
      { at: 0, text: "policy 12 · action: accept", tone: "good" },
      { at: 2.4, text: "IPS: clean · forwarding to the WAN", tone: "good" },
    ],
    cues: [
      { at: 0, cue: "shimmer" },
      { at: 2.3, cue: "whoosh" },
    ],
  },
  deny: {
    captions: [
      { at: 0.7, text: "IPS signature match · action: deny", tone: "bad" },
      { at: 3.2, text: "Session dropped · logged to FortiAnalyzer", tone: "bad" },
    ],
    cues: [
      { at: 0.7, cue: "slam" },
      { at: 3.4, cue: "alarm" },
    ],
  },
  world: {
    captions: [
      { at: 0, text: "Out over BGP · subsea cables" },
      { at: 3.4, text: "Every hop, secured — from the rack to the region." },
    ],
    cues: [
      { at: 0, cue: "rise" },
      { at: 3.4, cue: "pad" },
    ],
  },
  return: {
    captions: [],
    cues: [
      { at: 0, cue: "whoosh" },
      { at: 2.0, cue: "boom" },
    ],
  },
}

/** the packet the visitor is judging (203.0.113.0/24 is a documentation range) */
export const PACKET = "TCP 443 · 203.0.113.24 → 10.20.0.15"
