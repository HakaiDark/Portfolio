// Rear power for the hero rack: two vertical 0U PDUs (A feed red, B feed blue) on the back
// posts, and a dual-PSU cord pair from every powered unit. Pure three.js, cached like the cables.
import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { devices, heroRack, type RackSlot } from "./devices"
import { FACE_Z, slotCenterY } from "./layout"

export const PDU = {
  /** centre x of each strip (A on the left, B on the right), just inside the rear posts */
  x: 0.268,
  z: -0.752,
  bottom: 0.22,
  top: 1.98,
  width: 0.05,
  depth: 0.056,
}
export const FEED_COLORS = { A: "#a3271f", B: "#1f4fa8" } as const

export interface PowerSet {
  cords: { feed: keyof typeof FEED_COLORS; geometry: THREE.BufferGeometry }[]
  /** C13/C14 plug bodies at both ends of every cord */
  plugs: { position: [number, number, number]; along: "z" | "x" }[]
}

const CORD_R = 0.0032

function slotPower(s: RackSlot): { centerY: number; depth: number } | null {
  if (s.kind === "device") {
    const cfg = devices[s.id]
    return cfg ? { centerY: slotCenterY(s.u, cfg.rackUnits), depth: cfg.depth } : null
  }
  if (s.kind === "server") return { centerY: slotCenterY(s.u, s.units), depth: 0.72 }
  if (s.kind === "ups") return { centerY: slotCenterY(s.u, s.units), depth: 0.66 }
  return null
}

let cache: PowerSet | null = null

export function buildRearPower(): PowerSet {
  if (cache) return cache
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
  const byFeed = { A: [] as THREE.BufferGeometry[], B: [] as THREE.BufferGeometry[] }
  const plugs: PowerSet["plugs"] = []
  const used = new Set<string>()
  const outletY = (want: number, side: number) => {
    // outlets every 65 mm; take the nearest free one at or below the unit
    for (let k = 0; k < 40; k++) {
      for (const dir of [-1, 1]) {
        const y = Math.round((want + dir * k * 0.065 - PDU.bottom) / 0.065) * 0.065 + PDU.bottom + 0.04
        const key = `${side}:${y.toFixed(3)}`
        if (y > PDU.bottom + 0.03 && y < PDU.top - 0.05 && !used.has(key)) {
          used.add(key)
          return y
        }
      }
    }
    return want
  }
  for (const s of heroRack) {
    const pw = slotPower(s)
    if (!pw) continue
    const rearZ = FACE_Z - pw.depth
    for (const [feed, side] of [
      ["A", -1],
      ["B", 1],
    ] as const) {
      const sx = side * 0.13 // dual hot-plug PSUs either side of the rear panel
      const y = pw.centerY
      const yo = outletY(y - 0.02, side)
      const px = side * (PDU.x - PDU.width / 2) // inner face of the strip
      const pts = [
        v(sx, y, rearZ - 0.012),
        v(sx, y - 0.004, rearZ - 0.06),
        v(side * 0.2, (y + yo) / 2 - 0.03, (rearZ - 0.06 + PDU.z) / 2),
        v(px - side * 0.05, yo, PDU.z + 0.004),
        v(px - side * 0.012, yo, PDU.z),
      ]
      const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5)
      byFeed[feed].push(new THREE.TubeGeometry(curve, 28, CORD_R, 6, false))
      plugs.push({ position: [sx, y, rearZ - 0.012], along: "z" })
      plugs.push({ position: [px - side * 0.008, yo, PDU.z], along: "x" })
    }
  }
  // each strip's input whip drops through the floor tile under the rack
  for (const [feed, side] of [
    ["A", -1],
    ["B", 1],
  ] as const) {
    const x = side * PDU.x
    const curve = new THREE.CatmullRomCurve3([v(x, PDU.bottom, PDU.z), v(x, PDU.bottom - 0.08, PDU.z + 0.01), v(x - side * 0.03, 0.04, PDU.z + 0.06), v(x - side * 0.05, -0.05, PDU.z + 0.08)])
    byFeed[feed].push(new THREE.TubeGeometry(curve, 16, 0.006, 8, false))
  }
  const cords = (Object.keys(byFeed) as (keyof typeof byFeed)[]).map((feed) => {
    const merged = mergeGeometries(byFeed[feed])!
    byFeed[feed].forEach((g) => g.dispose())
    return { feed, geometry: merged }
  })
  cache = { cords, plugs }
  return cache
}
