// Rack hardware configuration.
//
// To add a device (e.g. an Aruba AP or a FortiGate):
//   1. Put its front-panel photo in public/3d/devices/ as WebP (straight-on, cropped to the faceplate).
//   2. Add an entry to `devices` below: rack units, depth, texture paths, ports, and a `cardId`.
//   3. Add the card text to content/rack-cards.ts under the same `cardId`.
//   4. Mount it in `heroRack` at a free rack unit.
//
// Port positions are fractions of the front texture: u = 0 (left) .. 1 (right), v = 0 (top) .. 1 (bottom).

export const U = 0.04445 // one rack unit in metres
export const PANEL_WIDTH = 0.4826 // 19-inch faceplate incl. ears
export const BODY_WIDTH = 0.438 // chassis width between the ears

export type PortKind = "rj45" | "sfp" | "qsfp"

export interface PortGrid {
  kind: PortKind
  /** centre of the first (top-left) port */
  u0: number
  v0: number
  /** distance between port centres */
  du: number
  dv: number
  cols: number
  rows: number
  /** port opening size, as texture fractions */
  w: number
  h: number
  /** which ports (row-major index) have a cable plugged in */
  patched: number[]
  /** where the activity LED sits relative to the port centre, as texture fractions */
  led?: { du: number; dv: number }
}

export interface DeviceConfig {
  id: string
  name: string
  vendor: string
  rackUnits: number
  /** chassis depth in metres */
  depth: number
  textures: {
    front: string
    /** smaller version used on low-end devices */
    frontLow?: string
    top?: string
  }
  /** colour of the sheet-metal chassis */
  chassisColor: string
  ports: PortGrid[]
  /** key into content/rack-cards.ts; omit for decorative devices */
  cardId?: string
  /** hotspot position on the faceplate (texture fractions) */
  hotspot?: { u: number; v: number }
}

const fsRow = (u0: number, patched: number[]): PortGrid => ({
  kind: "rj45",
  u0,
  v0: 72 / 188,
  du: 65 / 2000,
  dv: 58 / 188,
  cols: 6,
  rows: 2,
  w: 54 / 2000,
  h: 40 / 188,
  patched,
  led: { du: -20 / 2000, dv: 24 / 188 },
})

export const devices: Record<string, DeviceConfig> = {
  "fortiswitch-448e": {
    id: "fortiswitch-448e",
    name: "FortiSwitch 448E",
    vendor: "Fortinet",
    rackUnits: 1,
    depth: 0.39,
    textures: {
      front: "/3d/devices/fortiswitch-448e-front.webp",
      frontLow: "/3d/devices/fortiswitch-448e-front-1k.webp",
      top: "/3d/devices/fortiswitch-448e-top.webp",
    },
    chassisColor: "#d9dadc",
    ports: [
      fsRow(235 / 2000, [0, 1, 2, 3, 4, 6, 7, 9, 10, 11]),
      fsRow(643 / 2000, [0, 1, 2, 3, 5, 6, 7, 8]),
      fsRow(1063 / 2000, [0, 2, 3, 4, 6, 8]),
      fsRow(1470 / 2000, [1, 3]),
      {
        kind: "sfp",
        u0: 1880 / 2000,
        v0: 75 / 188,
        du: 68 / 2000,
        dv: 54 / 188,
        cols: 2,
        rows: 2,
        w: 58 / 2000,
        h: 34 / 188,
        patched: [0, 1, 2],
        led: { du: 0, dv: -26 / 188 },
      },
    ],
    cardId: "fortinet",
    hotspot: { u: 0.045, v: 0.5 },
  },

  "cisco-secure-firewall-6100": {
    id: "cisco-secure-firewall-6100",
    name: "Cisco Secure Firewall 6100",
    vendor: "Cisco",
    rackUnits: 2,
    depth: 0.74,
    textures: {
      front: "/3d/devices/cisco-6100-front.webp",
      frontLow: "/3d/devices/cisco-6100-front-1k.webp",
    },
    chassisColor: "#c9cacd",
    ports: [
      {
        kind: "sfp",
        u0: 865 / 1924,
        v0: 258 / 390,
        du: 65 / 1924,
        dv: 64 / 390,
        cols: 6,
        rows: 2,
        w: 56 / 1924,
        h: 40 / 390,
        patched: [0, 1, 2, 3, 6, 7, 8],
        led: { du: 0, dv: -36 / 390 },
      },
      {
        kind: "qsfp",
        u0: 1300 / 1924,
        v0: 327 / 390,
        du: 85 / 1924,
        dv: 0,
        cols: 4,
        rows: 1,
        w: 74 / 1924,
        h: 30 / 390,
        patched: [0, 1],
        led: { du: -20 / 1924, dv: -36 / 390 },
      },
      {
        kind: "rj45",
        u0: 1097 / 1924,
        v0: 87 / 390,
        du: 65 / 1924,
        dv: 53 / 390,
        cols: 4,
        rows: 2,
        w: 52 / 1924,
        h: 38 / 390,
        patched: [0, 1, 4],
        led: { du: 0, dv: -26 / 390 },
      },
    ],
    cardId: "cisco",
    hotspot: { u: 0.29, v: 0.62 },
  },
}

/** Mounted equipment in the hero rack. `u` is the lowest rack unit the device occupies (1 = bottom). */
export type RackSlot =
  | { kind: "device"; id: string; u: number }
  /** jacks are patched automatically to the switch ports below it */
  | { kind: "patch-panel"; u: number; ports: number }
  | { kind: "cable-manager"; u: number }
  | { kind: "server"; u: number; units: number; variant: number }
  | { kind: "blank"; u: number; units: number }

export const RACK_UNITS = 42

export const heroRack: RackSlot[] = [
  { kind: "patch-panel", u: 34, ports: 24 },
  { kind: "cable-manager", u: 33 },
  { kind: "device", id: "fortiswitch-448e", u: 32 },
  { kind: "cable-manager", u: 31 },
  { kind: "blank", u: 30, units: 1 },
  { kind: "device", id: "cisco-secure-firewall-6100", u: 28 },
  { kind: "blank", u: 26, units: 2 },
  { kind: "server", u: 24, units: 2, variant: 0 },
  { kind: "server", u: 23, units: 1, variant: 1 },
  { kind: "server", u: 22, units: 1, variant: 1 },
  { kind: "blank", u: 20, units: 2 },
  { kind: "server", u: 18, units: 2, variant: 2 },
]

/** Rack-unit index to height (metres) of the bottom of that unit, above the floor. */
export const RACK_BASE = 0.1
export const unitY = (u: number) => RACK_BASE + (u - 1) * U
