import { BODY_WIDTH, PANEL_WIDTH, U, unitY, devices, heroRack, type DeviceConfig, type PortKind } from "./devices"

export const FACE_Z = 0.0035 // faceplate sits just proud of the rail face (z = 0)

export interface PortInstance {
  kind: PortKind
  /** position on the faceplate, metres, origin at faceplate centre */
  x: number
  y: number
  row: number
  col: number
  patched: boolean
  led?: [number, number]
  w: number
  h: number
}

export const faceSize = (cfg: DeviceConfig): [number, number] => [
  cfg.faceIncludesEars ? PANEL_WIDTH : BODY_WIDTH,
  cfg.rackUnits * U - 0.0008,
]

/** Texture fraction to faceplate-local metres. */
export function facePoint(cfg: DeviceConfig, u: number, v: number): [number, number] {
  const [fw, fh] = faceSize(cfg)
  return [(u - 0.5) * fw, (0.5 - v) * fh]
}

export function devicePorts(cfg: DeviceConfig): PortInstance[] {
  const [fw, fh] = faceSize(cfg)
  const out: PortInstance[] = []
  for (const g of cfg.ports) {
    for (let r = 0; r < g.rows; r++)
      for (let c = 0; c < g.cols; c++) {
        const i = r * g.cols + c
        const [x, y] = facePoint(cfg, g.u0 + c * g.du, g.v0 + r * g.dv)
        out.push({
          kind: g.kind,
          x,
          y,
          row: r,
          col: c,
          patched: g.patched.includes(i),
          led: g.led ? [x + g.led.du * fw, y - g.led.dv * fh] : undefined,
          w: g.w * fw,
          h: g.h * fh,
        })
      }
  }
  return out
}

/** Centre height of a slot's faceplate above the floor. */
export const slotCenterY = (u: number, units: number) => unitY(u) + (units * U) / 2

export interface MountedDevice {
  /** unique per mounted unit, e.g. "fortigate-601f@34" */
  key: string
  cfg: DeviceConfig
  u: number
  centerY: number
  hotspot: boolean
  tag?: string
  ports: (PortInstance & { wy: number })[]
}

export function mountedDevices(): MountedDevice[] {
  const out: MountedDevice[] = []
  for (const s of heroRack) {
    if (s.kind !== "device") continue
    const cfg = devices[s.id]
    if (!cfg) continue
    const centerY = slotCenterY(s.u, cfg.rackUnits)
    out.push({
      key: `${s.id}@${s.u}`,
      cfg,
      u: s.u,
      centerY,
      hotspot: s.hotspot !== false && !!cfg.cardId,
      tag: s.tag,
      ports: devicePorts(cfg).map((p) => ({ ...p, wy: centerY + p.y })),
    })
  }
  return out
}

/** Patch-panel jack positions (rack space). */
export function patchPanelJacks(u: number, ports: number) {
  const panelW = PANEL_WIDTH
  const groups = ports / 6
  const gw = (panelW * 0.8) / groups
  const cy = slotCenterY(u, 1)
  const jacks: { x: number; y: number }[] = []
  for (let g = 0; g < groups; g++)
    for (let i = 0; i < 6; i++) {
      // mirrors the canvas layout in textures.patchPanelFront
      const x = -panelW / 2 + panelW * 0.1 + g * gw + i * (gw / 6.4) + gw * 0.04 + gw / 16
      jacks.push({ x, y: cy - 0.0035 })
    }
  return jacks
}
