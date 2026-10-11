// Decide how much 3D the visitor's device can handle.
//   "high"   – desktop / strong phones: shadows, ambient occlusion, full textures
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
  if (mem <= 4 || cores <= 4 || (touch && small)) return "low"
  return "high"
}
