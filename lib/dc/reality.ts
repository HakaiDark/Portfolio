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
  // the rest were captured the same way (desktop 1280x800 framing rendered at 1852x800,
  // phone 390x844 framing rendered at 633x844)
  ...desktop("fortiswitch-448e@38", "fortiswitch", [0.3548, 1.8577, 0.747], [0.1313, 1.746, -0.2213]),
  ...desktop("catalyst-9300@36", "catalyst", [-0.0084, 1.7688, 0.8269], [0.215, 1.6571, -0.1414]),
  ...desktop("fortimanager-400g@30", "fortimanager", [0.0208, 1.5104, 0.8281], [0.2099, 1.4158, -0.1493]),
  ...desktop("fortianalyzer-400e@29", "fortianalyzer", [0.3548, 1.4576, 0.747], [0.1313, 1.3459, -0.2213]),
  ...desktop("proliant-dl360@20", "proliant", [0.4004, 1.3668, 1.0014], [0.1882, 0.9319, 0.1263]),
  ...desktop("wireless", "wireless", [0.3478, 2.42, 1.3728], [0.1364, 3.1387, 0.7105]),
  ...desktop("contact", "contact", [0.6386, 1.2246, 0.5629], [0.9916, 0.9175, -0.3209]),
  ...desktop("overview", "overview", [0.4632, 1.62, 1.9767], [0.0948, 1.4925, 1.0558]),
  ...phone("overview", "overview", [0.6176, 1.7383, 1.444], [0.2493, 1.6108, 0.5231]),
  ...phone("fortimanager-400g@30", "fortimanager", [-0.2384, 1.2501, 1.2318], [-0.0492, 1.1555, 0.2544]),
  ...phone("proliant-dl360@20", "proliant", [0.272, 1.203, 1.3471], [0.0599, 0.7681, 0.472]),
  ...phone("fortiswitch-448e@38", "fortiswitch", [0.2828, 1.6051, 1.2255], [0.0593, 1.4934, 0.2572]),
  ...phone("catalyst-9300@36", "catalyst", [-0.2828, 1.5162, 1.2255], [-0.0593, 1.4045, 0.2572]),
  ...phone("fortianalyzer-400e@29", "fortianalyzer", [0.2828, 1.2051, 1.2255], [0.0593, 1.0934, 0.2572]),
  ...phone("wireless", "wireless", [0.1901, 2.1414, 1.3891], [-0.0213, 2.8601, 0.7267]),
  ...phone("contact", "contact", [0.4128, 1.0876, 0.7443], [0.7658, 0.7806, -0.1395]),
]

type V3 = [number, number, number]
function desktop(stop: string, name: string, position: V3, target: V3): RealityShot[] {
  return [{ stop, layout: "desktop", src: `/reality/${name}-desktop.webp`, position, target, fov: 40, aspect: 1852 / 800 }]
}
function phone(stop: string, name: string, position: V3, target: V3): RealityShot[] {
  return [{ stop, layout: "phone", src: `/reality/${name}-phone.webp`, position, target, fov: 54, aspect: 633 / 844 }]
}

export function realityShot(stop: string, layout: RealityLayout | null, aspect: number): RealityShot | null {
  if (!layout) return null
  return REALITY.find((s) => s.stop === stop && s.layout === layout && aspect <= s.aspect + 0.01) ?? null
}
