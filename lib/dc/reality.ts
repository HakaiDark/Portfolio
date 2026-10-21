// "Reality layer": when the camera comes to rest at a stop, the 3D view resolves into a
// photograph of that exact view (the 3D render re-shot by an image model, GPT Image 2.5 via
// ElevenLabs). Any drag, zoom or stop change melts it back into live 3D.
//
// Each still is the render of a fixed camera (position, a point along its view ray, vertical
// fov) captured with `__rack.view()` at a reference screen, then rendered wider than any real
// screen of that kind. The photo is drawn height-fitted and centred, so it lines up for every
// screen narrower than `aspect` (vertical fov and camera are identical; only the sides crop).

export type RealityLayout = "desktop" | "phone"

export interface RealityShot {
  stop: string
  /** desktop = landscape with the side card open; phone = portrait with the bottom sheet open */
  layout: RealityLayout
  src: string
  position: [number, number, number]
  /** any point on the camera's view ray */
  target: [number, number, number]
  fov: number
  /** width / height of the still */
  aspect: number
}

export const REALITY: RealityShot[] = [
  {
    stop: "fortigate-601f@34",
    layout: "desktop",
    src: "/reality/fortigate-desktop.webp",
    position: [0.3548, 1.6799, 0.747],
    target: [0.1313, 1.5682, -0.2213],
    fov: 40,
    aspect: 1852 / 800,
  },
  {
    stop: "fortigate-601f@34",
    layout: "phone",
    src: "/reality/fortigate-phone.webp",
    position: [0.2828, 1.4273, 1.2255],
    target: [0.0593, 1.3156, 0.2572],
    fov: 54,
    aspect: 1107 / 1477,
  },
]

export function realityShot(stop: string, layout: RealityLayout | null, aspect: number): RealityShot | null {
  if (!layout) return null
  return REALITY.find((s) => s.stop === stop && s.layout === layout && aspect <= s.aspect + 0.01) ?? null
}
