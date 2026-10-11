// Procedural canvas textures for the data-centre scene.
// Everything here is drawn at runtime, so it costs no download bytes.
import * as THREE from "three"
import { timed } from "./perf"

export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const cache = new Map<string, THREE.Texture>()

function canvasTex(
  key: string,
  w: number,
  h: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  opts: { srgb?: boolean; repeat?: [number, number]; anisotropy?: number } = {}
) {
  const hit = cache.get(key)
  if (hit) return hit
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  const ctx = c.getContext("2d")!
  timed("tex:" + key.split("-")[0], () => draw(ctx, w, h))
  const t = new THREE.CanvasTexture(c)
  if (opts.srgb !== false) t.colorSpace = THREE.SRGBColorSpace
  if (opts.repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(...opts.repeat)
  }
  t.anisotropy = opts.anisotropy ?? 8
  cache.set(key, t)
  return t
}

let noiseTile: HTMLCanvasElement | null = null
/** One small grain tile, generated once and reused by every texture. */
function getNoiseTile() {
  if (noiseTile) return noiseTile
  const s = 128
  const c = document.createElement("canvas")
  c.width = c.height = s
  const ctx = c.getContext("2d")!
  const img = ctx.createImageData(s, s)
  const r = rng(1)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = r() > 0.5 ? 255 : 0
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v
    img.data[i + 3] = Math.round(r() * 255)
  }
  ctx.putImageData(img, 0, 0)
  noiseTile = c
  return c
}

/**
 * Fine surface grain. Paints a tiled noise pattern instead of touching every pixel
 * (getImageData over large canvases blocked the main thread during loading).
 */
function noise(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number, seed: number) {
  const pattern = ctx.createPattern(getNoiseTile(), "repeat")
  if (!pattern) return
  const offset = (seed * 37) % 128
  ctx.save()
  ctx.globalAlpha = Math.min(1, amount / 160)
  ctx.translate(-offset, -offset)
  ctx.fillStyle = pattern
  ctx.fillRect(offset, offset, w, h)
  ctx.restore()
}

/** Brushed-metal roughness map (linear). Horizontal streaks. */
export function brushedRoughness() {
  return canvasTex(
    "brushed",
    256,
    256,
    (ctx, w, h) => {
      ctx.fillStyle = "#8a8a8a"
      ctx.fillRect(0, 0, w, h)
      const r = rng(7)
      for (let i = 0; i < 900; i++) {
        const y = r() * h
        const g = 100 + r() * 70
        ctx.strokeStyle = `rgba(${g},${g},${g},0.35)`
        ctx.lineWidth = r() * 1.2 + 0.3
        ctx.beginPath()
        const x = r() * w
        ctx.moveTo(x - 60, y)
        ctx.lineTo(x + 60 + r() * 120, y)
        ctx.stroke()
      }
    },
    { srgb: false, repeat: [2, 2] }
  )
}

/** Rack rail: black steel with square cage-nut holes, 3 per U, U numbers every 1U. Map spans `units`. */
export function railTexture(units: number) {
  const pxPerU = 48
  return canvasTex(`rail-${units}`, 32, units * pxPerU, (ctx, w, h) => {
    ctx.fillStyle = "#1b1d20"
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 10, 3)
    for (let u = 0; u < units; u++) {
      const top = h - (u + 1) * pxPerU
      // hole pattern within a U: 6.35 / 22.225 / 38.1 mm of 44.45
      for (const f of [0.143, 0.5, 0.857]) {
        const y = top + (1 - f) * pxPerU
        ctx.fillStyle = "#020203"
        ctx.fillRect(w * 0.56 - 4, y - 4, 8, 8)
        ctx.strokeStyle = "rgba(255,255,255,0.08)"
        ctx.strokeRect(w * 0.56 - 4.5, y - 4.5, 9, 9)
      }
      // U marking line + number
      ctx.fillStyle = "rgba(220,220,220,0.55)"
      ctx.fillRect(2, top, 8, 1)
      ctx.font = "bold 9px monospace"
      ctx.fillText(String(u + 1), 2, top + 26)
    }
  })
}

/** Hex perforation alpha map for cabinet doors. */
export function perforationAlpha() {
  return canvasTex(
    "perf",
    128,
    128,
    (ctx, w, h) => {
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = "#000"
      const s = 16
      for (let y = 0; y <= h / (s * 0.866) + 1; y++) {
        for (let x = 0; x <= w / s + 1; x++) {
          const cx = x * s + (y % 2 ? s / 2 : 0)
          const cy = y * s * 0.866
          ctx.beginPath()
          for (let k = 0; k < 6; k++) {
            const a = (Math.PI / 3) * k + Math.PI / 6
            ctx.lineTo(cx + Math.cos(a) * 6.2, cy + Math.sin(a) * 6.2)
          }
          ctx.fill()
        }
      }
    },
    { srgb: false, repeat: [1, 1] }
  )
}

/** Raised-floor tile (600 mm). `perforated` gives the cold-aisle airflow tile. */
export function floorTile(perforated: boolean) {
  return canvasTex(
    `floor-${perforated}`,
    512,
    512,
    (ctx, w, h) => {
      ctx.fillStyle = "#7f848a"
      ctx.fillRect(0, 0, w, h)
      noise(ctx, w, h, 14, perforated ? 11 : 12)
      // faint mottling
      const r = rng(perforated ? 5 : 6)
      for (let i = 0; i < 60; i++) {
        ctx.fillStyle = `rgba(${r() > 0.5 ? 255 : 0},${r() > 0.5 ? 255 : 0},${r() > 0.5 ? 255 : 0},0.015)`
        ctx.beginPath()
        ctx.arc(r() * w, r() * h, 20 + r() * 80, 0, Math.PI * 2)
        ctx.fill()
      }
      if (perforated) {
        ctx.fillStyle = "#2a2d31"
        for (let y = 0; y < 22; y++)
          for (let x = 0; x < 22; x++) {
            ctx.beginPath()
            ctx.arc(40 + x * 20.8, 40 + y * 20.8, 6.5, 0, Math.PI * 2)
            ctx.fill()
          }
      }
      // tile edge trim
      ctx.strokeStyle = "#3b3f44"
      ctx.lineWidth = 6
      ctx.strokeRect(3, 3, w - 6, h - 6)
      ctx.strokeStyle = "rgba(255,255,255,0.25)"
      ctx.lineWidth = 1
      ctx.strokeRect(7, 7, w - 14, h - 14)
    },
    { anisotropy: 16 }
  )
}

/** Chassis side panel: sheet metal with vent slots near the front. */
export function chassisSide(color: string, depth: number, height: number) {
  const key = `side-${color}-${depth.toFixed(2)}-${height.toFixed(3)}`
  const pw = 512
  const ph = Math.max(16, Math.round((pw * height) / depth))
  return canvasTex(key, pw, ph, (ctx, w, h) => {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 8, 21)
    ctx.fillStyle = "rgba(10,10,12,0.85)"
    const slotH = Math.max(2, h * 0.08)
    for (let x = w * 0.62; x < w * 0.95; x += 7) {
      for (let y = h * 0.25; y < h * 0.8; y += slotH * 2) ctx.fillRect(x, y, 3, slotH)
    }
    // seam
    ctx.fillStyle = "rgba(0,0,0,0.25)"
    ctx.fillRect(0, h * 0.5, w * 0.58, 1)
  })
}

/** Rear panel: PSUs, fan grilles, management ports. */
export function rearPanel(units: number, seed: number) {
  return canvasTex(`rear-${units}-${seed}`, 1024, Math.round((1024 * units * 0.04445) / 0.438), (ctx, w, h) => {
    ctx.fillStyle = "#4b4e53"
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 10, seed)
    const r = rng(seed)
    // two PSUs on the right
    for (let i = 0; i < 2; i++) {
      const x = w - (i + 1) * 150
      ctx.fillStyle = "#26282b"
      ctx.fillRect(x, h * 0.12, 136, h * 0.76)
      ctx.fillStyle = "#111"
      ctx.beginPath()
      ctx.arc(x + 40, h * 0.5, Math.min(h * 0.3, 30), 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#0b0b0b"
      ctx.fillRect(x + 82, h * 0.35, 34, h * 0.3)
      ctx.fillStyle = "#3fbf5a"
      ctx.fillRect(x + 120, h * 0.2, 6, 6)
    }
    // fan grilles
    const fans = units > 1 ? 4 : 3
    for (let i = 0; i < fans; i++) {
      const cx = 90 + i * 130
      const rad = Math.min(h * 0.4, 55)
      ctx.strokeStyle = "#1a1b1d"
      ctx.lineWidth = 3
      for (let k = rad; k > 4; k -= 7) {
        ctx.beginPath()
        ctx.arc(cx, h / 2, k, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
    // console / mgmt ports
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = "#151515"
      ctx.fillRect(w * 0.55 + i * 40, h * 0.4, 30, h * 0.24)
    }
    // label sticker
    ctx.fillStyle = "#e8e6df"
    ctx.fillRect(w * 0.5 - r() * 20, h * 0.12, 70, h * 0.18)
  })
}

const SERVER_BEZELS = ["#1d1f23", "#2a2d31", "#15171a"]

/** Generic server faceplate. Returns colour + emissive (status LEDs) maps. */
export function serverFront(units: number, variant: number) {
  const w = 1024
  const h = Math.round((w * units * 0.04445) / 0.438)
  const color = canvasTex(`srv-${units}-${variant}`, w, h, (ctx) => {
    ctx.fillStyle = SERVER_BEZELS[variant % SERVER_BEZELS.length]
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 8, 30 + variant)
    // drive bays
    const bays = units === 1 ? 10 : 12
    const rows = units === 1 ? 1 : 2
    const bw = (w * 0.66) / bays
    for (let r = 0; r < rows; r++)
      for (let i = 0; i < bays; i++) {
        const x = w * 0.17 + i * bw
        const y = h * 0.1 + (r * h * 0.8) / rows
        const bh = (h * 0.8) / rows - 4
        ctx.fillStyle = "#0e0f11"
        ctx.fillRect(x + 2, y, bw - 4, bh)
        ctx.fillStyle = "#3a3d42"
        ctx.fillRect(x + 4, y + 2, bw - 8, bh * 0.22)
        ctx.fillStyle = "#26282c"
        for (let s = 0; s < 5; s++) ctx.fillRect(x + 6, y + bh * 0.35 + s * (bh * 0.11), bw - 12, 1.5)
      }
    // vents left/right
    ctx.fillStyle = "#08090a"
    for (const x0 of [w * 0.02, w * 0.85])
      for (let x = x0; x < x0 + w * 0.12; x += 9)
        for (let y = h * 0.15; y < h * 0.85; y += 9) ctx.fillRect(x, y, 5, 5)
    // ears handles
    ctx.fillStyle = "#3d4046"
    ctx.fillRect(0, 0, w * 0.012, h)
    ctx.fillRect(w * 0.988, 0, w * 0.012, h)
  })
  const emissive = canvasTex(`srv-e-${units}-${variant}`, w, h, (ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, w, h)
    const bays = units === 1 ? 10 : 12
    const rows = units === 1 ? 1 : 2
    const bw = (w * 0.66) / bays
    const r = rng(90 + variant)
    for (let rr = 0; rr < rows; rr++)
      for (let i = 0; i < bays; i++) {
        const x = w * 0.17 + i * bw
        const y = h * 0.1 + (rr * h * 0.8) / rows
        ctx.fillStyle = r() > 0.15 ? "#2dff6a" : "#ffb02e"
        ctx.fillRect(x + bw - 14, y + 4, 5, 4)
      }
    ctx.fillStyle = "#4aa8ff"
    ctx.fillRect(w * 0.84 - 10, h * 0.45, 7, 7)
  })
  return { color, emissive }
}

/** Patch panel: black, keystone jacks, port numbers. */
export function patchPanelFront(ports: number) {
  const w = 1024
  const h = Math.round((w * 0.04445) / 0.4826)
  return canvasTex(`pp-${ports}`, w, h, (ctx) => {
    ctx.fillStyle = "#16171a"
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 8, 40)
    const groups = ports / 6
    const gw = (w * 0.8) / groups
    for (let g = 0; g < groups; g++)
      for (let i = 0; i < 6; i++) {
        const x = w * 0.1 + g * gw + i * (gw / 6.4) + gw * 0.04
        ctx.fillStyle = "#050505"
        ctx.fillRect(x, h * 0.38, gw / 8, h * 0.4)
        ctx.fillStyle = "#c9c9c9"
        ctx.font = "9px sans-serif"
        ctx.fillText(String(g * 6 + i + 1), x + 2, h * 0.3)
      }
    // label strip
    ctx.fillStyle = "#a9a59b"
    ctx.fillRect(w * 0.1, h * 0.08, w * 0.8, h * 0.08)
    // screw holes
    ctx.fillStyle = "#000"
    for (const x of [w * 0.02, w * 0.98]) {
      ctx.beginPath()
      ctx.arc(x, h / 2, 6, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}

/** Tall texture of a cabinet interior: stacked server faces + emissive status LEDs. */
export function cabinetInterior(seed: number) {
  const w = 256
  const h = 1024
  const r = rng(seed)
  const layout: { y: number; hh: number; kind: number }[] = []
  let y = h * 0.03
  while (y < h * 0.97) {
    const units = r() > 0.7 ? 2 : r() > 0.85 ? 4 : 1
    const hh = (units * h) / 44
    if (r() > 0.12) layout.push({ y, hh, kind: Math.floor(r() * 3) })
    y += hh
  }
  const color = canvasTex(`cab-${seed}`, w, h, (ctx) => {
    ctx.fillStyle = "#050607"
    ctx.fillRect(0, 0, w, h)
    for (const s of layout) {
      ctx.fillStyle = ["#1a1c20", "#23262a", "#2e3136"][s.kind]
      ctx.fillRect(8, s.y + 1, w - 16, s.hh - 2)
      ctx.fillStyle = "#0b0c0e"
      for (let x = 30; x < w - 40; x += 18) ctx.fillRect(x, s.y + 3, 14, s.hh - 6)
    }
  })
  const emissive = canvasTex(`cab-e-${seed}`, w, h, (ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, w, h)
    for (const s of layout) {
      for (let x = 40; x < w - 40; x += 18) {
        if (r() > 0.55) continue
        ctx.fillStyle = r() > 0.12 ? "#26ff60" : r() > 0.5 ? "#ffae1a" : "#3d9bff"
        ctx.fillRect(x, s.y + 3, 3, 2)
      }
    }
  })
  return { color, emissive }
}

/** Horizontal 1U cable manager: finger duct. */
export function cableManagerFront() {
  const w = 1024
  const h = Math.round((w * 0.04445) / 0.4826)
  return canvasTex("cm", w, h, (ctx) => {
    ctx.fillStyle = "#0d0e10"
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = "#1f2125"
    for (let x = w * 0.06; x < w * 0.94; x += 26) ctx.fillRect(x, 0, 16, h)
    ctx.fillStyle = "#2b2e33"
    ctx.fillRect(0, h * 0.82, w, h * 0.18)
  })
}

/** UPS front bezel (3U): vents, LCD panel, buttons. Returns colour + emissive maps. */
export function upsFront(units: number) {
  const w = 1024
  const h = Math.round((w * units * 0.04445) / 0.4826)
  const lcd = { x: w * 0.06, y: h * 0.28, w: w * 0.2, h: h * 0.3 }
  const color = canvasTex(`ups-${units}`, w, h, (ctx) => {
    ctx.fillStyle = "#121315"
    ctx.fillRect(0, 0, w, h)
    noise(ctx, w, h, 8, 77)
    // vent field
    ctx.fillStyle = "#050506"
    for (let x = w * 0.33; x < w * 0.95; x += 12)
      for (let y = h * 0.12; y < h * 0.88; y += 12) ctx.fillRect(x, y, 7, 7)
    // control panel
    ctx.fillStyle = "#1d1f22"
    ctx.fillRect(w * 0.04, h * 0.14, w * 0.26, h * 0.72)
    ctx.fillStyle = "#0a0f12"
    ctx.fillRect(lcd.x, lcd.y, lcd.w, lcd.h)
    ctx.fillStyle = "#2b2e33"
    for (let i = 0; i < 4; i++) {
      ctx.beginPath()
      ctx.arc(w * 0.08 + i * 40, h * 0.74, 9, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = "#cfd2d6"
    ctx.font = "bold 20px sans-serif"
    ctx.fillText("Smart-UPS 3000", w * 0.06, h * 0.22)
  })
  const emissive = canvasTex(`ups-e-${units}`, w, h, (ctx) => {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = "#4fa3ff"
    ctx.font = "bold 22px monospace"
    ctx.fillText("ONLINE  LOAD 38%", lcd.x + 10, lcd.y + 30)
    ctx.fillText("BATT 100%  14 min", lcd.x + 10, lcd.y + 60)
    ctx.fillStyle = "#33ff66"
    ctx.beginPath()
    ctx.arc(w * 0.08, h * 0.74, 5, 0, Math.PI * 2)
    ctx.fill()
  })
  return { color, emissive }
}

/** Small printed asset label for cabinet doors. */
export function assetLabel(text: string) {
  return canvasTex(`lbl-${text}`, 256, 64, (ctx, w, h) => {
    ctx.fillStyle = "#f1efe8"
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = "#111"
    ctx.font = "bold 30px monospace"
    ctx.fillText(text, 14, 42)
  })
}
