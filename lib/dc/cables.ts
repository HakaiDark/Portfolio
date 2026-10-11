// Cable routing for the hero rack. Pure three.js, no React.
import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { heroRack } from "./devices"
import { FACE_Z, mountedDevices, patchPanelJacks, slotCenterY } from "./layout"
import { rng } from "./textures"

export const CABLE_COLORS = {
  blue: "#1f5fbf",
  grey: "#8d9298",
  yellow: "#e2b41b",
  green: "#2f9a4c",
  red: "#b8322a",
  aqua: "#1cbcc4", // OM4 multimode fibre
  fiberYellow: "#f0c419", // single-mode fibre
} as const
export type CableColor = keyof typeof CABLE_COLORS

const COPPER_R = 0.0029
const FIBER_R = 0.0016
const QSFP_R = 0.0024

export interface Plug {
  kind: "rj45" | "sfp" | "lc" | "qsfp"
  color: CableColor
  position: [number, number, number]
}

export interface CableSet {
  tubes: { color: CableColor; geometry: THREE.BufferGeometry }[]
  plugs: Plug[]
  ties: [number, number, number][]
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/** Insert sag midpoints between control points whose horizontal span is long. */
function withSag(pts: THREE.Vector3[], amount: number) {
  const out: THREE.Vector3[] = [pts[0]]
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const horiz = Math.hypot(b.x - a.x, b.z - a.z)
    const vert = Math.abs(b.y - a.y)
    if (horiz > 0.04 && vert < horiz) {
      const m = a.clone().lerp(b, 0.5)
      m.y -= horiz * amount
      out.push(m)
    }
    out.push(b)
  }
  return out
}

function tube(points: THREE.Vector3[], radius: number) {
  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5)
  const len = curve.getLength()
  return new THREE.TubeGeometry(curve, Math.max(24, Math.round(len * 160)), radius, 6, false)
}

/** Position inside a vertical cable bundle on one side of the rack. */
function bundleSlot(side: 1 | -1, i: number): [number, number] {
  const a = i * 2.399963 // golden angle
  const r = 0.004 + Math.sqrt(i) * 0.0045
  return [side * (0.305 + Math.cos(a) * r * 0.7), 0.035 + Math.sin(a) * r]
}

export function buildHeroCables(quality: "high" | "low"): CableSet {
  const r = rng(2024)
  const byColor = new Map<CableColor, THREE.BufferGeometry[]>()
  const plugs: Plug[] = []
  const ties: [number, number, number][] = []
  const add = (color: CableColor, g: THREE.BufferGeometry) => {
    if (!byColor.has(color)) byColor.set(color, [])
    byColor.get(color)!.push(g)
  }
  const copperColor = (): CableColor => {
    const p = r()
    return p < 0.58 ? "blue" : p < 0.74 ? "grey" : p < 0.86 ? "yellow" : p < 0.95 ? "green" : "red"
  }

  const mounted = mountedDevices()
  const pp = heroRack.find((s) => s.kind === "patch-panel")
  const jacks = pp && pp.kind === "patch-panel" ? patchPanelJacks(pp.u, pp.ports) : []
  const usedJacks = new Set<number>()
  const sideCount = { [1]: 0, [-1]: 0 } as Record<1 | -1, number>
  const fiberCount = { n: 0 }
  const plugZ = FACE_Z + 0.024

  for (const dev of mounted) {
    const below = slotCenterY(dev.u, 0) - 0.03 // just under the device
    for (const p of dev.ports) {
      if (!p.patched) continue
      const x = p.x
      const y = p.wy

      if (p.kind === "rj45") {
        const color = copperColor()
        plugs.push({ kind: "rj45", color, position: [x, y, FACE_Z + 0.011] })
        const goUp = dev.cfg.id === "fortiswitch-448e" && p.row === 0 && jacks.length > 0
        if (goUp) {
          // short patch up to the nearest free patch-panel jack, looping through the cable manager
          let best = -1
          let bestD = Infinity
          jacks.forEach((j, ji) => {
            if (usedJacks.has(ji)) return
            const d = Math.abs(j.x - x)
            if (d < bestD) {
              bestD = d
              best = ji
            }
          })
          if (best >= 0) {
            usedJacks.add(best)
            const j = jacks[best]
            const reach = 0.075 + r() * 0.025
            const pts = [
              v(x, y, plugZ),
              v(x, y + 0.004, plugZ + 0.02),
              v((x + j.x) / 2 + (r() - 0.5) * 0.01, (y + j.y) / 2, reach),
              v(j.x, j.y - 0.004, plugZ + 0.02),
              v(j.x, j.y, plugZ),
            ]
            add(color, tube(pts, COPPER_R))
            plugs.push({ kind: "rj45", color, position: [j.x, j.y, FACE_Z + 0.011] })
            continue
          }
        }
        // drop down through the lower cable manager and out to the nearest side
        const side: 1 | -1 = x >= 0 ? 1 : -1
        const [bx, bz] = bundleSlot(side, sideCount[side]++)
        const yMgr = below - 0.012 - r() * 0.01
        const pts = withSag(
          [
            v(x, y, plugZ),
            v(x, y - 0.006, plugZ + 0.025),
            v(x * 0.97, yMgr, 0.085 + r() * 0.01),
            v(side * 0.255, yMgr - 0.01, 0.07),
            v(bx, yMgr - 0.09, bz + 0.01),
            v(bx, 0.35, bz),
            v(bx, 0.12, bz - 0.15),
          ],
          0.16 + r() * 0.08
        )
        add(color, tube(pts, COPPER_R))
        continue
      }

      // fibre / optics: route to the right side and up to the overhead fibre runner
      const qsfp = p.kind === "qsfp"
      const color: CableColor = qsfp ? "aqua" : r() > 0.3 ? "aqua" : "fiberYellow"
      plugs.push({ kind: qsfp ? "qsfp" : "sfp", color, position: [x, y, FACE_Z + 0.008] })
      if (!qsfp) plugs.push({ kind: "lc", color, position: [x, y, FACE_Z + 0.03] })
      const [bx, bz] = bundleSlot(1, 40 + fiberCount.n++)
      const z0 = FACE_Z + (qsfp ? 0.03 : 0.042)
      const pts = withSag(
        [
          v(x, y, z0),
          v(x, y - 0.002, z0 + 0.03),
          v((x + 0.26) / 2, y - 0.03 - r() * 0.02, 0.1),
          v(0.27, y + 0.01, 0.075),
          v(bx, y + 0.12, bz),
          v(bx, 2.02, bz - 0.02),
          v(bx * 0.9, 2.34, -0.2),
        ],
        0.1
      )
      add(color, tube(pts, qsfp ? QSFP_R : FIBER_R))
    }
  }

  // velcro ties on the vertical bundles
  const tieStep = quality === "high" ? 0.22 : 0.33
  for (const side of [1, -1] as const) {
    if (sideCount[side] === 0) continue
    for (let y = 0.4; y < 1.36; y += tieStep) ties.push([side * 0.305, y, 0.035])
  }
  for (let y = 1.7; y < 2.0; y += tieStep) ties.push([0.305, y, 0.035])

  const tubes = [...byColor.entries()].map(([color, geos]) => ({ color, geometry: mergeGeometries(geos)! }))
  geosDispose(byColor)
  return { tubes, plugs, ties }
}

function geosDispose(map: Map<CableColor, THREE.BufferGeometry[]>) {
  for (const list of map.values()) list.forEach((g) => g.dispose())
}
