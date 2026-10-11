// The engineer's laptop on the cantilever shelf, consoled into the primary FortiGate.
import { heroRack, unitY } from "./devices"

const shelf = heroRack.find((s) => s.kind === "shelf" && s.laptop)
const shelfTop = unitY((shelf?.u ?? 22) + 1) + 0.0015

// 13" laptop, shifted left so the mug fits on the shelf beside it
const LX = -0.045
const LW = 0.3
const LD = 0.21

export const LAPTOP = {
  /** centre of the base, sitting on the shelf */
  base: [LX, shelfTop + 0.009, -0.085] as [number, number, number],
  size: { w: LW, d: LD, h: 0.018 },
  screen: { w: LW, h: 0.195, tilt: (16 * Math.PI) / 180 },
  /** hinge line (back edge of the base, top) */
  hinge: [LX, shelfTop + 0.018, -0.085 - LD / 2] as [number, number, number],
  /** USB-serial adapter on the left side, where the console cable lands */
  consolePort: [LX - LW / 2 - 0.014, shelfTop + 0.009, -0.06] as [number, number, number],
  shelfTop,
  shelfU: shelf?.u ?? 22,
}

/** The mug on the shelf, right of the laptop. */
export const MUG = {
  position: [0.165, shelfTop, -0.05] as [number, number, number],
  /** turn the print toward the usual viewing angle */
  rotationY: -0.25,
}

/** Rough centre of the screen, for camera framing. */
export const LAPTOP_SCREEN_CENTER: [number, number, number] = [
  LAPTOP.hinge[0],
  LAPTOP.hinge[1] + Math.cos(LAPTOP.screen.tilt) * (LAPTOP.screen.h / 2),
  LAPTOP.hinge[2] - Math.sin(LAPTOP.screen.tilt) * (LAPTOP.screen.h / 2),
]
