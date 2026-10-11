// The engineer's laptop on the cantilever shelf, consoled into the primary FortiGate.
import { heroRack, unitY } from "./devices"

const shelf = heroRack.find((s) => s.kind === "shelf" && s.laptop)
const shelfTop = unitY((shelf?.u ?? 22) + 1) + 0.0015

export const LAPTOP = {
  /** centre of the base, sitting on the shelf */
  base: [-0.03, shelfTop + 0.009, -0.085] as [number, number, number],
  size: { w: 0.33, d: 0.23, h: 0.018 },
  screen: { w: 0.33, h: 0.215, tilt: (16 * Math.PI) / 180 },
  /** hinge line (back edge of the base, top) */
  hinge: [-0.03, shelfTop + 0.018, -0.2] as [number, number, number],
  /** USB-serial adapter on the left side, where the console cable lands */
  consolePort: [-0.03 - 0.165 - 0.014, shelfTop + 0.009, -0.06] as [number, number, number],
  shelfTop,
  shelfU: shelf?.u ?? 22,
}

/** Rough centre of the screen, for camera framing. */
export const LAPTOP_SCREEN_CENTER: [number, number, number] = [
  LAPTOP.hinge[0],
  LAPTOP.hinge[1] + Math.cos(LAPTOP.screen.tilt) * (LAPTOP.screen.h / 2),
  LAPTOP.hinge[2] - Math.sin(LAPTOP.screen.tilt) * (LAPTOP.screen.h / 2),
]
