// The two monitors on the neighbouring rack: a FortiAnalyzer-style log/threat view and an
// AirWave-style wireless view. Drawn on canvases a couple of times a second; both react to the
// HA failover demo. All data is simulated (documentation IP ranges, generic AP names).
import { haBadges, HA_PRIMARY, HA_SECONDARY, type HaPhase, type HaStep } from "./ha"
import { rng } from "./textures"

export const SCREEN_W = 1024
export const SCREEN_H = 576
/** canvases are allocated at this multiple of the layout size, so text stays crisp up close */
export const SCREEN_SCALE = 1.6

/** Backlight falloff + faint vignette, drawn last, so the panel reads as a lit LCD, not a sticker. */
export function panelFinish(ctx: CanvasRenderingContext2D) {
  const g = ctx.createRadialGradient(SCREEN_W / 2, SCREEN_H * 0.45, SCREEN_H * 0.2, SCREEN_W / 2, SCREEN_H / 2, SCREEN_W * 0.62)
  g.addColorStop(0, "rgba(255,255,255,0.025)")
  g.addColorStop(1, "rgba(0,0,0,0.16)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H)
}

const SIGS = [
  "HTTP.URI.SQL.Injection",
  "SSH.Brute.Force.Login",
  "Apache.Log4j.Remote.Code.Execution",
  "Mirai.Botnet.Telnet.Scan",
  "SMB.Remote.Code.Execution",
  "DNS.Tunneling.Suspicious.TXT",
  "WordPress.XMLRPC.Brute.Force",
  "TLS.Invalid.Certificate.Chain",
]
const APPS = ["Microsoft.Teams", "Google.Workspace", "Zoom", "YouTube", "Office365", "Windows.Update", "SSL_TLSv1.3"]
const TONE = { good: "#3ee07a", bad: "#ff6b5b", warn: "#ffb020", idle: "#8fa3b5" }

export interface ScreenState {
  phase: HaPhase
  haLog: NonNullable<HaStep["log"]>[]
}

const pad = (n: number) => String(n).padStart(2, "0")
const clock = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

function panel(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, title: string, light = false) {
  ctx.fillStyle = light ? "#ffffff" : "#16212c"
  ctx.fillRect(x, y, w, h)
  ctx.strokeStyle = light ? "#d5dbe1" : "#243444"
  ctx.lineWidth = 1
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1)
  ctx.fillStyle = light ? "#33475b" : "#9fb3c8"
  ctx.font = "600 13px system-ui, sans-serif"
  ctx.fillText(title, x + 10, y + 19)
}

// rolling FortiAnalyzer log, kept between redraws
const fazLines: { text: string; color: string }[] = []
let fazSeed = 7
let lastHaLen = 0

/** FortiAnalyzer-style: cluster status, threat bars, bandwidth, real-time log. */
export function drawFortiAnalyzer(ctx: CanvasRenderingContext2D, t: number, s: ScreenState) {
  const W = SCREEN_W
  const H = SCREEN_H
  const r = rng(Math.floor(t * 2) + 11)
  const down = s.phase === "down" || s.phase === "election"
  ctx.fillStyle = "#0e161f"
  ctx.fillRect(0, 0, W, H)
  // title bar
  ctx.fillStyle = "#1c2b3b"
  ctx.fillRect(0, 0, W, 40)
  ctx.fillStyle = "#e8eef4"
  ctx.font = "700 17px system-ui, sans-serif"
  ctx.fillText("FortiAnalyzer", 16, 26)
  ctx.fillStyle = "#8fa3b5"
  ctx.font = "14px system-ui, sans-serif"
  ctx.fillText("FAZ-400E  ›  Log View  ›  Real-time", 140, 26)
  ctx.fillStyle = "#c9d6e2"
  ctx.font = "14px ui-monospace, monospace"
  ctx.fillText(clock(new Date()), W - 90, 26)

  // HA cluster tile
  panel(ctx, 12, 52, 300, 120, "HA cluster · FGT-601F")
  const badges = haBadges(s.phase)
  ;[HA_PRIMARY, HA_SECONDARY].forEach((key, i) => {
    const b = badges[key]
    const y = 82 + i * 42
    ctx.fillStyle = TONE[b.tone]
    ctx.beginPath()
    ctx.arc(30, y + 10, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#e8eef4"
    ctx.font = "600 16px ui-monospace, monospace"
    ctx.fillText(b.name, 46, y + 16)
    ctx.fillStyle = TONE[b.tone]
    ctx.fillText(b.role.toUpperCase(), 140, y + 16)
  })

  // threats by category (bars wobble a little, jump during the failover)
  panel(ctx, 12, 184, 300, 180, "Threats · last 60 min")
  const cats = [
    ["IPS", 64],
    ["Botnet C&C", 18],
    ["Malware", 9],
    ["Web filter", 122],
    ["App control", 47],
  ] as const
  cats.forEach(([name, base], i) => {
    const v = base * (0.92 + r() * 0.16)
    const y = 210 + i * 30
    ctx.fillStyle = "#8fa3b5"
    ctx.font = "13px system-ui, sans-serif"
    ctx.fillText(name, 22, y + 13)
    ctx.fillStyle = i === 1 ? "#ff6b5b" : i === 2 ? "#ffb020" : "#3c8ee0"
    ctx.fillRect(118, y + 2, Math.min(180, v * 1.35), 14)
  })

  // bandwidth sparkline: dips while the cluster fails over
  panel(ctx, 12, 376, 300, 188, "Bandwidth · port1 (Mbps)")
  ctx.strokeStyle = "#3ee07a"
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i <= 56; i++) {
    const tt = t - (56 - i) * 0.5
    let v = 0.55 + 0.18 * Math.sin(tt * 0.4) + 0.08 * Math.sin(tt * 1.7)
    if (down && i > 50) v *= 0.15
    const x = 24 + i * 4.9
    const y = 548 - v * 140
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // real-time log
  panel(ctx, 324, 52, W - 336, H - 64, "Log View · traffic + UTM (FGT cluster)")
  if (s.haLog.length < lastHaLen) lastHaLen = 0
  for (const l of s.haLog.slice(lastHaLen)) {
    fazLines.push({ text: `type=event subtype=ha devname=${l.unit} msg="${l.text}"`, color: l.tone ? TONE[l.tone] : "#c9d6e2" })
  }
  lastHaLen = s.haLog.length
  if (!down || r() > 0.7) {
    const lr = rng(fazSeed++)
    const now = new Date()
    const src = `10.20.${Math.floor(lr() * 40)}.${Math.floor(lr() * 250) + 2}`
    const dst = lr() > 0.5 ? `203.0.113.${Math.floor(lr() * 250) + 2}` : `198.51.100.${Math.floor(lr() * 250) + 2}`
    const dev = s.phase === "failed-over" || s.phase === "rejoining" ? "FGT-02" : "FGT-01"
    if (lr() > 0.62) {
      fazLines.push({
        text: `${clock(now)} ${dev} utm/ips action=dropped srcip=${dst} dstip=${src} attack="${SIGS[Math.floor(lr() * SIGS.length)]}"`,
        color: "#ffb020",
      })
    } else {
      fazLines.push({
        text: `${clock(now)} ${dev} traffic/forward action=accept srcip=${src} dstip=${dst} app="${APPS[Math.floor(lr() * APPS.length)]}"`,
        color: "#a9b7c4",
      })
    }
  }
  while (fazLines.length > 22) fazLines.shift()
  ctx.font = "13px ui-monospace, monospace"
  fazLines.forEach((l, i) => {
    ctx.fillStyle = l.color
    ctx.fillText(l.text.slice(0, 92), 336, 86 + i * 21.5)
  })
}

const APS = Array.from({ length: 12 }, (_, i) => ({
  name: i === 0 ? "AP-DC1-01" : `AP-${i < 6 ? "1F" : "2F"}-${pad(i)}`,
  x: 0.12 + (i % 4) * 0.25,
  y: 0.18 + Math.floor(i / 4) * 0.32,
  ch: [1, 6, 11, 36, 44, 149][i % 6],
  clients: 8 + ((i * 7) % 23),
}))

/** AirWave-style: floor plan with AP coverage, AP table, client graph, alert banner. */
export function drawAirWave(ctx: CanvasRenderingContext2D, t: number, s: ScreenState) {
  const W = SCREEN_W
  const H = SCREEN_H
  const r = rng(Math.floor(t * 2) + 101)
  const failover = s.phase !== "idle"
  ctx.fillStyle = "#eef2f6"
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = "#0b4f8a"
  ctx.fillRect(0, 0, W, 40)
  ctx.fillStyle = "#ffffff"
  ctx.font = "700 17px system-ui, sans-serif"
  ctx.fillText("AirWave", 16, 26)
  ctx.font = "14px system-ui, sans-serif"
  ctx.fillStyle = "#cfe0f1"
  ctx.fillText("Home  ›  VisualRF  ›  Campus · Floor 1–2", 104, 26)
  ctx.fillStyle = "#ffffff"
  ctx.font = "14px ui-monospace, monospace"
  ctx.fillText(clock(new Date()), W - 90, 26)

  // summary tiles
  const up = APS.length
  const clients = APS.reduce((n, a) => n + a.clients, 0) + Math.floor(r() * 9)
  const tiles: [string, string, string][] = [
    ["APs up", `${up}/${up}`, "#1f9d55"],
    ["Clients", String(clients), "#0b4f8a"],
    ["802.1X (ClearPass)", failover ? "re-auth…" : "OK", failover ? "#c47f00" : "#1f9d55"],
    ["Rogue APs", "0", "#1f9d55"],
  ]
  tiles.forEach(([label, value, color], i) => {
    const x = 12 + i * 251
    panel(ctx, x, 50, 241, 66, label, true)
    ctx.fillStyle = color
    ctx.font = "700 24px system-ui, sans-serif"
    ctx.fillText(value, x + 10, 104)
  })

  // floor plan with coverage
  const fx = 12
  const fy = 126
  const fw = 560
  const fh = 438
  panel(ctx, fx, fy, fw, fh, "VisualRF · 5 GHz coverage", true)
  ctx.strokeStyle = "#9aa7b4"
  ctx.lineWidth = 3
  ctx.strokeRect(fx + 16, fy + 32, fw - 32, fh - 48)
  ctx.lineWidth = 1.5
  for (const gx of [0.33, 0.62]) {
    ctx.beginPath()
    ctx.moveTo(fx + 16 + (fw - 32) * gx, fy + 32)
    ctx.lineTo(fx + 16 + (fw - 32) * gx, fy + 32 + (fh - 48) * 0.45)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.moveTo(fx + 16, fy + 32 + (fh - 48) * 0.5)
  ctx.lineTo(fx + 16 + (fw - 32) * 0.75, fy + 32 + (fh - 48) * 0.5)
  ctx.stroke()
  for (const ap of APS) {
    const x = fx + 16 + (fw - 32) * ap.x
    const y = fy + 32 + (fh - 48) * ap.y
    const g = ctx.createRadialGradient(x, y, 4, x, y, 78)
    g.addColorStop(0, "rgba(31,157,85,0.35)")
    g.addColorStop(1, "rgba(31,157,85,0)")
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, 78, 0, Math.PI * 2)
    ctx.fill()
  }
  // clients drift around their AP
  const cr = rng(5)
  for (const ap of APS) {
    for (let k = 0; k < Math.min(10, ap.clients / 2); k++) {
      const a = cr() * Math.PI * 2 + t * 0.05 * (cr() - 0.5)
      const d = 14 + cr() * 40
      ctx.fillStyle = "#3c8ee0"
      ctx.fillRect(fx + 16 + (fw - 32) * ap.x + Math.cos(a) * d, fy + 32 + (fh - 48) * ap.y + Math.sin(a) * d, 4, 4)
    }
  }
  for (const ap of APS) {
    const x = fx + 16 + (fw - 32) * ap.x
    const y = fy + 32 + (fh - 48) * ap.y
    ctx.fillStyle = "#1f9d55"
    ctx.beginPath()
    ctx.arc(x, y, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#33475b"
    ctx.font = "11px system-ui, sans-serif"
    ctx.fillText(ap.name, x + 10, y + 4)
  }

  // AP table
  panel(ctx, 584, 126, W - 596, 270, "Access points", true)
  ctx.font = "600 12px system-ui, sans-serif"
  ctx.fillStyle = "#6b7c8d"
  ;["Name", "Status", "Ch", "Clients"].forEach((h, i) => ctx.fillText(h, 596 + [0, 128, 210, 262][i], 166))
  ctx.font = "13px system-ui, sans-serif"
  APS.slice(0, 9).forEach((ap, i) => {
    const y = 190 + i * 22.5
    ctx.fillStyle = "#33475b"
    ctx.fillText(ap.name, 596, y)
    ctx.fillStyle = "#1f9d55"
    ctx.fillText("● Up", 724, y)
    ctx.fillStyle = "#33475b"
    ctx.fillText(String(ap.ch), 806, y)
    ctx.fillText(String(ap.clients + Math.floor(r() * 3)), 858, y)
  })

  // client count graph
  panel(ctx, 584, 406, W - 596, 158, "Clients · last 30 min", true)
  ctx.strokeStyle = "#0b4f8a"
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let i = 0; i <= 40; i++) {
    const tt = t - (40 - i) * 0.6
    const v = 0.6 + 0.15 * Math.sin(tt * 0.21) + 0.05 * Math.sin(tt * 1.3)
    const x = 600 + i * 10
    const y = 552 - v * 110
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  // failover banner: the wireless side notices the gateway change
  if (failover) {
    ctx.fillStyle = "rgba(196,127,0,0.95)"
    ctx.fillRect(0, 40, W, 30)
    ctx.fillStyle = "#ffffff"
    ctx.font = "600 14px system-ui, sans-serif"
    const msg =
      s.phase === "down" || s.phase === "election"
        ? "⚠ Upstream gateway unreachable · firewall cluster failing over · APs still up"
        : s.phase === "failed-over"
          ? "Gateway restored via FGT-02 · clients re-authenticating through ClearPass"
          : "FGT-01 rejoining the cluster · no wireless impact"
    ctx.fillText(msg, 16, 60)
  }
}
