// Decide how much 3D the visitor's device can handle.
//   "high"   – desktops and capable phones (iPhones, Android with >= 6 GB / 8 cores): shadows,
//              ambient occlusion, glow, depth of field, full textures. Phones skip the reflective
//              floor and cap the pixel ratio; if the frame rate drops they shed sharpness, then AO.
//   "low"    – weaker devices: no AO, cheaper shadows, smaller textures, fewer background racks
//   "static" – no WebGL or a very weak device: show the pre-rendered image instead

export type Quality = "high" | "low" | "static"

export function detectQuality(): Quality {
  if (typeof window === "undefined") return "static"
  const params = new URLSearchParams(window.location.search)
  const forced = params.get("quality")
  if (forced === "high" || forced === "low" || forced === "static") return forced

  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null
  try {
    const c = document.createElement("canvas")
    gl = c.getContext("webgl2") || c.getContext("webgl")
  } catch {
    gl = null
  }
  if (!gl) return "static"

  const nav = navigator as Navigator & { deviceMemory?: number }
  const mem = nav.deviceMemory ?? 8
  const cores = nav.hardwareConcurrency ?? 8
  let renderer = ""
  try {
    const ext = gl.getExtension("WEBGL_debug_renderer_info")
    renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : ""
  } catch {
    /* ignore */
  }
  gl.getExtension("WEBGL_lose_context")?.loseContext()

  const software = /swiftshader|llvmpipe|software|basic render/i.test(renderer)
  if (software || mem <= 2 || cores <= 2) return "static"

  const touch = window.matchMedia("(pointer: coarse)").matches
  const small = Math.min(window.innerWidth, window.innerHeight) < 600
  if (touch && small) {
    // phones: visits are short, so capable ones get the full look. iOS hides memory and core
    // counts but every iPhone that runs WebGL2 well reports "Apple GPU"; Android needs real specs.
    const iphone = /apple gpu/i.test(renderer) || /iphone|ipad/i.test(navigator.userAgent)
    return iphone || (mem >= 6 && cores >= 8) ? "high" : "low"
  }
  if (mem <= 4 || cores <= 4) return "low"
  return "high"
}
