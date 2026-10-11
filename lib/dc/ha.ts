// HA failover demo for the FortiGate pair: a scripted timeline, and what each unit's LEDs and
// cables show at every phase. The two units are the hero rack's FGT-01 (U34) and FGT-02 (U33).

export const HA_PRIMARY = "fortigate-601f@34"
export const HA_SECONDARY = "fortigate-601f@33"

export type HaPhase = "idle" | "down" | "election" | "failed-over" | "rejoining" | "preempt"

/** How a unit's LEDs behave: passing traffic, linked but idle, powered off, or booting/electing. */
export type LedState = "active" | "standby" | "off" | "booting"

export interface HaView {
  leds: Record<string, LedState>
  /** cable owners whose packet pulses stop (unit off or passive) */
  paused: string[]
}

export function haView(phase: HaPhase): HaView {
  switch (phase) {
    case "down":
      return { leds: { [HA_PRIMARY]: "off", [HA_SECONDARY]: "standby" }, paused: [HA_PRIMARY, HA_SECONDARY, "ha", "console"] }
    case "election":
      return { leds: { [HA_PRIMARY]: "off", [HA_SECONDARY]: "booting" }, paused: [HA_PRIMARY, HA_SECONDARY, "ha", "console"] }
    case "failed-over":
      return { leds: { [HA_PRIMARY]: "off", [HA_SECONDARY]: "active" }, paused: [HA_PRIMARY, "ha", "console"] }
    case "rejoining":
      return { leds: { [HA_PRIMARY]: "booting", [HA_SECONDARY]: "active" }, paused: [HA_PRIMARY] }
    case "preempt":
      return { leds: { [HA_PRIMARY]: "booting", [HA_SECONDARY]: "standby" }, paused: [HA_PRIMARY, HA_SECONDARY] }
    default:
      // normal active-passive: the secondary's links are up but it passes no traffic
      return { leds: { [HA_SECONDARY]: "standby" }, paused: [HA_SECONDARY] }
  }
}

export interface HaStep {
  at: number // seconds from the start
  phase?: HaPhase
  log?: { unit: string; text: string; tone?: "bad" | "warn" | "good" }
}

/** Modelled on FortiOS HA (active-passive, session pickup, override enabled on FGT-01). */
export const HA_TIMELINE: HaStep[] = [
  { at: 0, phase: "down", log: { unit: "FGT-01", text: "power lost (simulated pulled plug)", tone: "bad" } },
  { at: 0.9, log: { unit: "FGT-02", text: "heartbeat lost on ha1 · peer FGT-01 unreachable", tone: "warn" } },
  { at: 1.5, phase: "election", log: { unit: "FGT-02", text: "cluster member FGT-01 removed · electing new primary", tone: "warn" } },
  { at: 2.6, phase: "failed-over", log: { unit: "FGT-02", text: "HA state changed: secondary → primary", tone: "good" } },
  { at: 3.2, log: { unit: "FGT-02", text: "gratuitous ARPs sent · sessions picked up (session-pickup enable)" } },
  { at: 3.9, log: { unit: "FGT-02", text: "traffic flowing through FGT-02 · VPNs and BGP kept up", tone: "good" } },
  { at: 7.5, phase: "rejoining", log: { unit: "FGT-01", text: "power restored · booting, joining cluster as secondary" } },
  { at: 9.6, log: { unit: "FGT-01", text: "configuration in sync (checksum match)" } },
  { at: 10.6, phase: "preempt", log: { unit: "FGT-01", text: "override enabled, priority 200 > 100 · reclaiming primary", tone: "warn" } },
  { at: 12.0, phase: "idle", log: { unit: "cluster", text: "healthy · FGT-01 primary, FGT-02 secondary", tone: "good" } },
]

export type BadgeTone = "good" | "bad" | "warn" | "idle"

/** Role badges shown next to each unit. */
export function haBadges(phase: HaPhase): Record<string, { name: string; role: string; tone: BadgeTone }> {
  const p = (role: string, tone: BadgeTone) => ({ name: "FGT-01", role, tone })
  const s = (role: string, tone: BadgeTone) => ({ name: "FGT-02", role, tone })
  const pair = (a: ReturnType<typeof p>, b: ReturnType<typeof s>) => ({ [HA_PRIMARY]: a, [HA_SECONDARY]: b })
  switch (phase) {
    case "down":
      return pair(p("offline", "bad"), s("secondary", "idle"))
    case "election":
      return pair(p("offline", "bad"), s("electing", "warn"))
    case "failed-over":
      return pair(p("offline", "bad"), s("primary", "good"))
    case "rejoining":
      return pair(p("syncing", "warn"), s("primary", "good"))
    case "preempt":
      return pair(p("electing", "warn"), s("secondary", "idle"))
    default:
      return pair(p("primary", "good"), s("secondary", "idle"))
  }
}
