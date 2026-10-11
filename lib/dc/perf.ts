// Tiny timing helper: records a performance.measure("dc:<name>") entry around synchronous work.
// Visible in the browser's Performance panel; costs nothing measurable.
export function timed<T>(name: string, fn: () => T): T {
  const start = performance.now()
  const result = fn()
  try {
    performance.measure(`dc:${name}`, { start, end: performance.now() })
  } catch {
    /* older browsers: ignore */
  }
  return result
}
