// Flattens an angled product photo's faceplate into a straight-on WebP texture (perspective warp).
// Usage: node tools/warp-faceplate.mjs <src> <out.webp> <outW> <outH> x0,y0 x1,y1 x2,y2 x3,y3 [quality]
// Corners are the faceplate's top-left, top-right, bottom-right, bottom-left in source pixels.
import { createRequire } from "node:module"
import path from "node:path"

const [src, out, w, h, ...rest] = process.argv.slice(2)
const corners = rest.slice(0, 4).map((c) => c.split(",").map(Number))
const quality = Number(rest[4] ?? 88)
if (!src || !out || corners.length !== 4) throw new Error("usage: see header")
const require = createRequire(path.resolve("package.json"))
const sharp = require("sharp")
const W = Number(w)
const H = Number(h)

// homography mapping the unit square (u,v) to the source quad
function squareToQuad([[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3
  const den = dx1 * dy2 - dx2 * dy1
  const g = (sx * dy2 - dx2 * sy) / den
  const hh = (dx1 * sy - sx * dy1) / den
  return [x1 - x0 + g * x1, x3 - x0 + hh * x3, x0, y1 - y0 + g * y1, y3 - y0 + hh * y3, y0, g, hh]
}
const [a, b, c, d, e, f, g, hh] = squareToQuad(corners)

const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const outBuf = Buffer.alloc(W * H * 3)
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const u = (x + 0.5) / W
    const v = (y + 0.5) / H
    const z = g * u + hh * v + 1
    const sxp = (a * u + b * v + c) / z - 0.5
    const syp = (d * u + e * v + f) / z - 0.5
    // bilinear sample
    const x0 = Math.max(0, Math.min(info.width - 2, Math.floor(sxp)))
    const y0 = Math.max(0, Math.min(info.height - 2, Math.floor(syp)))
    const fx = sxp - x0
    const fy = syp - y0
    for (let ch = 0; ch < 3; ch++) {
      const p = (yy, xx) => data[(yy * info.width + xx) * 3 + ch]
      const top = p(y0, x0) * (1 - fx) + p(y0, x0 + 1) * fx
      const bot = p(y0 + 1, x0) * (1 - fx) + p(y0 + 1, x0 + 1) * fx
      outBuf[(y * W + x) * 3 + ch] = Math.round(top * (1 - fy) + bot * fy)
    }
  }
}
await sharp(outBuf, { raw: { width: W, height: H, channels: 3 } }).sharpen({ sigma: 0.5 }).webp({ quality, effort: 6 }).toFile(out)
console.log(`${path.basename(out)}: ${W}x${H}`)
