// Crops device faceplates out of product photos into WebP textures for public/3d/devices/.
// Usage: node tools/crop-faceplates.mjs <imageDir> <spec.json> [outDir=public/3d/devices]
// spec.json: [{ "src": "photo.png", "name": "fortigate-601f-front", "left": 124, "top": 245,
//              "width": 573, "height": 59, "outW": 1280, "outH": 125, "sharpen": true, "q": 88 }]
// Tips: crop exactly to the faceplate (zoom in on the edges first); make outW/outH match the real
// ratio (1U ~ 10.2:1 without ears, ~11:1 with ears; 2U ~ 5:1); also emit a "-1k" copy (outW 1024).
import { createRequire } from "node:module"
import fs from "node:fs"
import path from "node:path"

const [imgDir, specFile, outArg] = process.argv.slice(2)
if (!imgDir || !specFile) throw new Error("usage: node tools/crop-faceplates.mjs <imageDir> <spec.json> [outDir]")
const require = createRequire(path.resolve("package.json"))
const sharp = require("sharp")
const outDir = path.resolve(outArg ?? "public/3d/devices")
fs.mkdirSync(outDir, { recursive: true })

for (const s of JSON.parse(fs.readFileSync(specFile, "utf8"))) {
  let img = sharp(path.join(imgDir, s.src)).extract({ left: s.left, top: s.top, width: s.width, height: s.height })
  if (s.outW) img = img.resize({ width: s.outW, height: s.outH, fit: "fill", kernel: "lanczos3" })
  if (s.sharpen) img = img.sharpen({ sigma: 0.6 })
  const out = path.join(outDir, `${s.name}.webp`)
  await img.webp({ quality: s.q ?? 88, effort: 6 }).toFile(out)
  const m = await sharp(out).metadata()
  console.log(`${s.name}: ${m.width}x${m.height} ${(fs.statSync(out).size / 1024).toFixed(0)}KB`)
}
