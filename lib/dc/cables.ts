// Cable routing for the hero rack. Pure three.js, no React.
import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { heroRack } from "./devices"
import { FACE_Z, facePoint, mountedDevices, patchPanelJacks, slotCenterY } from "./layout"
import { LAPTOP } from "./laptop"
import { rng } from "./textures"

export const CABLE_COLORS = {
  blue: "#1f5fbf",
  grey: "#8d9298",
  yellow: "#e2b41b",
  green: "#2f9a4c",
  red: "#b8322a",
  aqua: "#1cbcc4", // OM4 multimode fibre
  fiberYellow: "#f0c419", // single-mode fibre
  console: "#79b8e3", // light-blue rollover cable
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

/** A short printed label sleeve wrapped around a cable near its connector. */
export interface Sleeve {
  position: THREE.Vector3
  quaternion: THREE.Quaternion
}

export interface CableSet {
  tubes: { color: CableColor; geometry: THREE.BufferGeometry }[]
  plugs: Plug[]
  ties: [number, number, number][]
  sleeves: Sleeve[]
  /** cable paths, used by the packet-flow view */
  paths: { curve: THREE.CatmullRomCurve3; kind: "copper" | "fiber" | "console" }[]
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
const UP = new THREE.Vector3(0, 1, 0)

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
  const sleeves: Sleeve[] = []
  const paths: CableSet["paths"] = []

  const addCable = (color: CableColor, pts: THREE.Vector3[], radius: number, kind: "copper" | "fiber" | "console", sleeveEnds: boolean) => {
    const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5)
    const len = curve.getLength()
    const geo = new THREE.TubeGeometry(curve, Math.max(24, Math.round(len * 150)), radius, 6, false)
    if (!byColor.has(color)) byColor.set(color, [])
    byColor.get(color)!.push(geo)
    paths.push({ curve, kind })
    if (sleeveEnds && quality === "high") {
      for (const d of [0.045, len - 0.045]) {
        if (d <= 0 || d >= len) continue
        const t = d / len
        const q = new THREE.Quaternion().setFromUnitVectors(UP, curve.getTangentAt(t).normalize())
        sleeves.push({ position: curve.getPointAt(t), quaternion: q })
      }
    }
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
  let fiberCount = 0
  let highestDrop = 0
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
            addCable(
              color,
              [
                v(x, y, plugZ),
                v(x, y + 0.004, plugZ + 0.02),
                v((x + j.x) / 2 + (r() - 0.5) * 0.01, (y + j.y) / 2, reach),
                v(j.x, j.y - 0.004, plugZ + 0.02),
                v(j.x, j.y, plugZ),
              ],
              COPPER_R,
              "copper",
              true
            )
            plugs.push({ kind: "rj45", color, position: [j.x, j.y, FACE_Z + 0.011] })
            continue
          }
        }
        // drop down and out to the nearest side, then down the vertical manager
        const side: 1 | -1 = x >= 0 ? 1 : -1
        const [bx, bz] = bundleSlot(side, sideCount[side]++)
        const yMgr = below - 0.012 - r() * 0.01
        highestDrop = Math.max(highestDrop, yMgr - 0.09)
        addCable(
          color,
          withSag(
            [
              v(x, y, plugZ),
              v(x, y - 0.006, plugZ + 0.025),
              v(x * 0.97, yMgr, 0.085 + r() * 0.01),
              v(side * 0.255, yMgr - 0.01, 0.07),
              v(bx, yMgr - 0.09, bz + 0.01),
              v(bx, 0.35, bz),
              v(bx, 0.12, bz - 0.15),
            ],
            0.05 + r() * 0.05
          ),
          COPPER_R,
          "copper",
          true
        )
        continue
      }

      // fibre / optics: route to the right side and up to the overhead fibre runner
      const qsfp = p.kind === "qsfp"
      const color: CableColor = qsfp ? "aqua" : r() > 0.3 ? "aqua" : "fiberYellow"
      plugs.push({ kind: qsfp ? "qsfp" : "sfp", color, position: [x, y, FACE_Z + 0.008] })
      if (!qsfp) plugs.push({ kind: "lc", color, position: [x, y, FACE_Z + 0.03] })
      const [bx, bz] = bundleSlot(1, 40 + fiberCount++)
      const z0 = FACE_Z + (qsfp ? 0.03 : 0.042)
      addCable(
        color,
        withSag(
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
        ),
        qsfp ? QSFP_R : FIBER_R,
        "fiber",
        false
      )
    }
  }

  // HA heartbeat between stacked units of the same model (e.g. the FortiGate pair)
  for (let i = 0; i + 1 < mounted.length; i++) {
    const a = mounted[i]
    const b = mounted[i + 1]
    if (a.cfg.id !== b.cfg.id || !a.cfg.ha || Math.abs(a.u - b.u) !== a.cfg.rackUnits) continue
    const [hx, hy] = facePoint(a.cfg, a.cfg.ha.u, a.cfg.ha.v)
    const ya = a.centerY + hy
    const yb = b.centerY + hy
    plugs.push({ kind: "rj45", color: "red", position: [hx, ya, FACE_Z + 0.011] })
    plugs.push({ kind: "rj45", color: "red", position: [hx, yb, FACE_Z + 0.011] })
    addCable(
      "red",
      [v(hx, ya, plugZ), v(hx - 0.012, ya - 0.004, plugZ + 0.035), v(hx - 0.02, (ya + yb) / 2, plugZ + 0.05), v(hx - 0.012, yb + 0.004, plugZ + 0.035), v(hx, yb, plugZ)],
      COPPER_R,
      "copper",
      false
    )
  }

  // console cable: primary FortiGate console port -> USB-serial adapter on the laptop
  const consoleDev = mounted.find((m) => m.cfg.console)
  if (consoleDev && consoleDev.cfg.console) {
    const [cx, cy] = facePoint(consoleDev.cfg, consoleDev.cfg.console.u, consoleDev.cfg.console.v)
    const y = consoleDev.centerY + cy
    const end = LAPTOP.consolePort
    plugs.push({ kind: "rj45", color: "console", position: [cx, y, FACE_Z + 0.011] })
    addCable(
      "console",
      withSag(
        [
          v(cx, y, plugZ),
          v(cx, y - 0.01, plugZ + 0.04),
          v(cx - 0.04, y - 0.12, 0.11),
          v(end[0] - 0.02, end[1] + 0.12, 0.09),
          v(end[0] - 0.035, end[1] + 0.01, end[2] + 0.06),
          v(end[0] - 0.03, end[1], end[2] + 0.02),
          v(end[0], end[1], end[2]),
        ],
        0.05
      ),
      0.0024,
      "console",
      false
    )
  }

  // velcro ties on the vertical bundles, from the floor up to the highest drop
  const tieStep = quality === "high" ? 0.2 : 0.32
  const top = highestDrop - 0.05
  for (const side of [1, -1] as const) {
    if (sideCount[side] === 0) continue
    for (let y = 0.4; y < top; y += tieStep) ties.push([side * 0.305, y, 0.035])
  }
  for (let y = 1.75; y < 2.0; y += tieStep) ties.push([0.305, y, 0.035])

  const tubes = [...byColor.entries()].map(([color, geos]) => {
    const merged = mergeGeometries(geos)!
    geos.forEach((g) => g.dispose())
    return { color, geometry: merged }
  })
  return { tubes, plugs, ties, sleeves, paths }
}
