// Rack hardware configuration.
//
// To add a device:
//   1. Put a straight-on photo of its faceplate in public/3d/devices/ as WebP (plus a ~1024px "-1k" copy).
//   2. Add an entry to `devices` below: rack units, depth, texture paths, ports, and a `cardId`.
//   3. Add the card text to content/rack-cards.ts under the same `cardId`.
//   4. Mount it in `heroRack` at a free rack unit.
//
// Positions on a faceplate are fractions of its texture: u = 0 (left) .. 1 (right), v = 0 (top) .. 1 (bottom).

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

export interface StatusLed {
  u: number
  v: number
  color: "green" | "amber" | "blue"
  /** "link" flickers with traffic, "steady" stays lit */
  mode: "link" | "steady"
}

export interface DeviceConfig {
  id: string
  name: string
  /** short label for the camera-stop buttons */
  short: string
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
  /** the photo already includes the rack ears (servers with handles) */
  faceIncludesEars?: boolean
  /** colour of the sheet-metal chassis */
  chassisColor: string
  ports: PortGrid[]
  leds?: StatusLed[]
  /** console port, where the engineer's laptop is plugged in */
  console?: { u: number; v: number }
  /** HA heartbeat port; two stacked units of the same model get a short cable between them */
  ha?: { u: number; v: number }
  /** key into content/rack-cards.ts; omit for decorative devices */
  cardId?: string
  /** hotspot position on the faceplate (texture fractions); down the rack they alternate left/right, on plain panel rather than logos */
  hotspot?: { u: number; v: number }
  /** slides out on its rails (metres) with the lid off when its stop is open */
  slide?: number
}

const grid = (
  kind: PortKind,
  imgW: number,
  imgH: number,
  x0: number,
  y0: number,
  pitchX: number,
  pitchY: number,
  cols: number,
  rows: number,
  portW: number,
  portH: number,
  patched: number[],
  led?: { dx: number; dy: number }
): PortGrid => ({
  kind,
  u0: x0 / imgW,
  v0: y0 / imgH,
  du: pitchX / imgW,
  dv: pitchY / imgH,
  cols,
  rows,
  w: portW / imgW,
  h: portH / imgH,
  patched,
  led: led ? { du: led.dx / imgW, dv: led.dy / imgH } : undefined,
})

// FortiSwitch 448E texture is 2000 x 188 (display scale of the 2046 x 192 source)
const fsRow = (x0: number, patched: number[]) => grid("rj45", 2000, 188, x0, 72, 65, 58, 6, 2, 54, 40, patched, { dx: -20, dy: 24 })
// FortiGate 601F texture is 1280 x 125
const fgRj = (x0: number, patched: number[]) => grid("rj45", 1280, 125, x0, 47, 41.5, 40, 4, 2, 34, 26, patched, { dx: -13, dy: -18 })
// Catalyst 9300 texture is 1200 x 118
const c9Row = (x0: number, patched: number[]) => grid("rj45", 1200, 118, x0, 43, 37, 35, 6, 2, 30, 22, patched)

export const devices: Record<string, DeviceConfig> = {
  "fortigate-601f": {
    id: "fortigate-601f",
    name: "FortiGate 601F",
    short: "FortiGate",
    vendor: "Fortinet",
    rackUnits: 1,
    depth: 0.49,
    textures: { front: "/3d/devices/fortigate-601f-front.webp", frontLow: "/3d/devices/fortigate-601f-front-1k.webp" },
    chassisColor: "#dcdde0",
    ports: [
      // MGMT (top) / HA (bottom); the HA heartbeat cable between the pair is drawn separately
      grid("rj45", 1280, 125, 225, 47, 0, 40, 1, 2, 34, 26, [0]),
      fgRj(288, [0, 1, 2, 4, 5]),
      fgRj(470, [0, 4]),
      grid("sfp", 1280, 125, 728, 45, 43, 45, 4, 2, 36, 24, [0, 1, 2, 3], { dx: 0, dy: -22 }),
      grid("sfp", 1280, 125, 908, 45, 43, 45, 2, 2, 36, 24, [0]),
      grid("sfp", 1280, 125, 1008, 45, 42, 45, 2, 2, 36, 24, []),
    ],
    leds: [
      { u: 50 / 1280, v: 64 / 125, color: "green", mode: "steady" },
      { u: 50 / 1280, v: 75 / 125, color: "green", mode: "steady" },
      { u: 50 / 1280, v: 87 / 125, color: "green", mode: "link" },
      { u: 50 / 1280, v: 99 / 125, color: "green", mode: "steady" },
    ],
    console: { u: 160 / 1280, v: 85 / 125 },
    ha: { u: 225 / 1280, v: 87 / 125 },
    cardId: "fortigate",
    hotspot: { u: 0.93, v: 0.5 },
  },

  "fortiswitch-448e": {
    id: "fortiswitch-448e",
    name: "FortiSwitch 448E",
    short: "FortiSwitch",
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
      fsRow(235, [0, 1, 2, 3, 4, 6, 7, 9, 10, 11]),
      fsRow(643, [0, 1, 2, 3, 5, 6, 7, 8]),
      fsRow(1063, [0, 2, 3, 4, 6, 8]),
      fsRow(1470, [1, 3]),
      grid("sfp", 2000, 188, 1880, 75, 68, 54, 2, 2, 58, 34, [0, 1, 2], { dx: 0, dy: -26 }),
    ],
    leds: [
      { u: 178 / 2000, v: 30 / 188, color: "green", mode: "steady" },
      { u: 178 / 2000, v: 59 / 188, color: "green", mode: "steady" },
    ],
    cardId: "fortiswitch",
    hotspot: { u: 0.965, v: 0.55 },
  },

  "catalyst-9300": {
    id: "catalyst-9300",
    name: "Cisco Catalyst 9300",
    short: "Catalyst",
    vendor: "Cisco",
    rackUnits: 1,
    depth: 0.45,
    textures: { front: "/3d/devices/catalyst-9300-front.webp", frontLow: "/3d/devices/catalyst-9300-front-1k.webp" },
    chassisColor: "#c3c5c8",
    // mid-migration: a few legacy ports still patched
    ports: [c9Row(48, [0, 1, 3, 6, 7]), c9Row(284, [2, 8]), c9Row(530, [0]), c9Row(775, [])],
    leds: [
      { u: 88 / 1200, v: 14 / 118, color: "green", mode: "steady" },
      { u: 104 / 1200, v: 14 / 118, color: "amber", mode: "steady" },
    ],
    cardId: "catalyst",
    hotspot: { u: 0.035, v: 0.55 },
  },

  "fortimanager-400g": {
    id: "fortimanager-400g",
    name: "FortiManager 400G",
    short: "FortiManager",
    vendor: "Fortinet",
    rackUnits: 2,
    depth: 0.66,
    textures: { front: "/3d/devices/fortimanager-400g-front.webp", frontLow: "/3d/devices/fortimanager-400g-front-1k.webp" },
    chassisColor: "#dcdcd8",
    ports: [],
    leds: [0, 1, 2, 3].flatMap((c) =>
      [0, 1].map((r) => ({ u: (302 + c * 316) / 1272, v: (147 + r * 82) / 256, color: "blue" as const, mode: "link" as const }))
    ),
    cardId: "fortimanager",
    hotspot: { u: 0.04, v: 0.62 },
  },

  "fortianalyzer-400e": {
    id: "fortianalyzer-400e",
    name: "FortiAnalyzer 400E",
    short: "FortiAnalyzer",
    vendor: "Fortinet",
    rackUnits: 1,
    depth: 0.65,
    textures: { front: "/3d/devices/fortianalyzer-400e-front.webp", frontLow: "/3d/devices/fortianalyzer-400e-front-1k.webp" },
    faceIncludesEars: true,
    chassisColor: "#1d1f22",
    ports: [],
    leds: [
      ...[1293, 1314, 1334, 1355].map((x, i) => ({
        u: x / 1527,
        v: 57 / 138,
        color: "green" as const,
        mode: i === 1 || i === 2 ? ("link" as const) : ("steady" as const),
      })),
      ...[0, 1, 2, 3].map((c) => ({ u: (415 + c * 345) / 1527, v: 84 / 138, color: "blue" as const, mode: "link" as const })),
    ],
    cardId: "fortianalyzer",
    hotspot: { u: 0.8, v: 0.25 },
  },

  "proliant-dl360": {
    id: "proliant-dl360",
    name: "HPE ProLiant DL360 Gen10",
    short: "ProLiant",
    vendor: "HPE",
    rackUnits: 1,
    depth: 0.7,
    textures: { front: "/3d/devices/proliant-dl360-front.webp", frontLow: "/3d/devices/proliant-dl360-front-1k.webp" },
    faceIncludesEars: true,
    chassisColor: "#b9bcc0",
    ports: [],
    leds: [
      ...[197, 386, 762, 955].map((x) => ({ u: x / 1156, v: 33 / 105, color: "green" as const, mode: "link" as const })),
      { u: 1076 / 1156, v: 56 / 105, color: "green", mode: "steady" },
    ],
    cardId: "servers",
    hotspot: { u: 0.06, v: 0.5 },
    slide: 0.45,
  },

  // Display-only gear for the neighbouring rack (no ports, hotspots or cards).
  "aruba-6300m": {
    id: "aruba-6300m",
    name: "HPE Aruba Networking CX 6300M",
    short: "Aruba CX",
    vendor: "HPE Aruba Networking",
    rackUnits: 1,
    depth: 0.4,
    textures: { front: "/3d/devices/aruba-6300m-front.webp", frontLow: "/3d/devices/aruba-6300m-front-1k.webp" },
    chassisColor: "#1f2023",
    ports: [],
  },
  "poweredge-2u": {
    id: "poweredge-2u",
    name: "Dell PowerEdge 2U server",
    short: "PowerEdge",
    vendor: "Dell",
    rackUnits: 2,
    depth: 0.72,
    textures: { front: "/3d/devices/poweredge-2u-front.webp", frontLow: "/3d/devices/poweredge-2u-front-1k.webp" },
    faceIncludesEars: true,
    chassisColor: "#b9bcc0",
    ports: [],
  },
  "bluecat-1u": {
    id: "bluecat-1u",
    name: "BlueCat DNS/DHCP/IPAM appliance",
    short: "BlueCat",
    vendor: "BlueCat",
    rackUnits: 1,
    depth: 0.6,
    textures: { front: "/3d/devices/bluecat-1u-front.webp", frontLow: "/3d/devices/bluecat-1u-front-1k.webp" },
    faceIncludesEars: true,
    chassisColor: "#b9bcc0",
    ports: [],
  },
  "powervault-me5024": {
    id: "powervault-me5024",
    name: "Dell PowerVault ME5024",
    short: "PowerVault",
    vendor: "Dell",
    rackUnits: 2,
    depth: 0.6,
    textures: { front: "/3d/devices/powervault-me5024-front.webp" },
    faceIncludesEars: true,
    chassisColor: "#b9bcc0",
    ports: [],
  },
  "apc-srt-2u": {
    id: "apc-srt-2u",
    name: "APC Smart-UPS SRT 2U",
    short: "UPS",
    vendor: "APC",
    rackUnits: 2,
    depth: 0.62,
    textures: { front: "/3d/devices/apc-srt-2u-front.webp", frontLow: "/3d/devices/apc-srt-2u-front-1k.webp" },
    chassisColor: "#1a1b1d",
    ports: [],
  },

  // Kept for reference; swapped out for the FortiGate in the hero rack.
  "cisco-secure-firewall-6100": {
    id: "cisco-secure-firewall-6100",
    name: "Cisco Secure Firewall 6100",
    short: "Cisco 6100",
    vendor: "Cisco",
    rackUnits: 2,
    depth: 0.74,
    textures: { front: "/3d/devices/cisco-6100-front.webp", frontLow: "/3d/devices/cisco-6100-front-1k.webp" },
    chassisColor: "#c9cacd",
    ports: [grid("sfp", 1924, 390, 865, 258, 65, 64, 6, 2, 56, 40, [0, 1, 2, 3, 6, 7, 8], { dx: 0, dy: -36 })],
  },
}

/** Mounted equipment in the hero rack. `u` is the lowest rack unit the item occupies (1 = bottom). */
export type RackSlot =
  /** `hotspot: false` for the second unit of a pair */
  | { kind: "device"; id: string; u: number; hotspot?: boolean; tag?: string }
  /** jacks are patched automatically to the switch ports below it */
  | { kind: "patch-panel"; u: number; ports: number }
  | { kind: "cable-manager"; u: number }
  | { kind: "server"; u: number; units: number; variant: number }
  | { kind: "blank"; u: number; units: number }
  /** cantilever shelf; `laptop` puts the engineer's laptop on it, consoled into the FortiGate */
  | { kind: "shelf"; u: number; laptop?: boolean }
  | { kind: "ups"; u: number; units: number }
  /** 1U rack console drawer (screen + keyboard) that pulls out on its stop */
  | { kind: "kvm"; u: number }

export const RACK_UNITS = 42

export const heroRack: RackSlot[] = [
  { kind: "blank", u: 41, units: 2 },
  { kind: "patch-panel", u: 40, ports: 24 },
  { kind: "cable-manager", u: 39 },
  { kind: "device", id: "fortiswitch-448e", u: 38 },
  { kind: "cable-manager", u: 37 },
  { kind: "device", id: "catalyst-9300", u: 36 },
  { kind: "blank", u: 35, units: 1 },
  { kind: "device", id: "fortigate-601f", u: 34, tag: "FGT-01 · primary" },
  { kind: "device", id: "fortigate-601f", u: 33, hotspot: false, tag: "FGT-02 · HA secondary" },
  { kind: "blank", u: 32, units: 1 },
  { kind: "device", id: "fortimanager-400g", u: 30 },
  { kind: "device", id: "fortianalyzer-400e", u: 29 },
  // U23–U28 left open: headroom for the laptop screen
  { kind: "shelf", u: 22, laptop: true },
  { kind: "device", id: "proliant-dl360", u: 20 },
  { kind: "device", id: "proliant-dl360", u: 19, hotspot: false },
  { kind: "device", id: "proliant-dl360", u: 18, hotspot: false },
  { kind: "blank", u: 17, units: 1 },
  { kind: "kvm", u: 16 },
  // UPS right under the console drawer: in view on phones and desktop (not down at the floor)
  { kind: "ups", u: 13, units: 3 },
  { kind: "blank", u: 12, units: 1 },
  { kind: "server", u: 10, units: 2, variant: 0 },
  { kind: "blank", u: 1, units: 9 },
]

/** Rack-unit index to height (metres) of the bottom of that unit, above the floor. */
export const RACK_BASE = 0.1
export const unitY = (u: number) => RACK_BASE + (u - 1) * U

/** Where the Aruba AP hangs (ceiling, above the cold aisle in front of the rack). */
export const ACCESS_POINT = { position: [0.05, 2.98, 0.95] as [number, number, number], cardId: "wireless" }
