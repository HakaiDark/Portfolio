// Builds a static copy of the live scene that the path tracer can digest:
//  - instanced meshes are expanded into real geometry (the tracer ignores instance matrices)
//  - unlit "glow" materials (LEDs, light panels) become emissive surfaces that really emit light
//  - lights are copied with their world transforms; the PMREM environment is replaced by a
//    soft equirect gradient (the tracer needs an equirect map)
import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { GradientEquirectTexture } from "three-gpu-pathtracer"

const KEEP_ATTRS = ["position", "normal", "uv"]

function stripAttributes(g: THREE.BufferGeometry) {
  const out = g.index ? g.toNonIndexed() : g.clone()
  for (const name of Object.keys(out.attributes)) if (!KEEP_ATTRS.includes(name)) out.deleteAttribute(name)
  if (!out.attributes.uv) out.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(out.attributes.position.count * 2), 2))
  if (!out.attributes.normal) out.computeVertexNormals()
  out.morphAttributes = {}
  return out
}

const glowCache = new Map<string, THREE.MeshStandardMaterial>()
/** Unlit HDR colours (used for bloom) -> physically emissive material. */
function toEmissive(color: THREE.Color) {
  const max = Math.max(color.r, color.g, color.b, 1e-3)
  const key = `${color.r.toFixed(3)},${color.g.toFixed(3)},${color.b.toFixed(3)}`
  let m = glowCache.get(key)
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color: "#000000", emissive: color.clone().multiplyScalar(1 / max), emissiveIntensity: max, roughness: 1 })
    glowCache.set(key, m)
  }
  return m
}

function averageInstanceColor(im: THREE.InstancedMesh) {
  const c = new THREE.Color(0, 0, 0)
  if (!im.instanceColor) return new THREE.Color(1, 1, 1)
  const tmp = new THREE.Color()
  for (let i = 0; i < im.count; i++) {
    im.getColorAt(i, tmp)
    c.add(tmp)
  }
  return c.multiplyScalar(1 / Math.max(1, im.count))
}

function convertMaterial(mesh: THREE.Mesh): THREE.Material | null {
  const mat = mesh.material as THREE.Material
  if (!mat || Array.isArray(mat) || !mat.visible) return null
  if ((mat as THREE.MeshBasicMaterial).isMeshBasicMaterial) {
    const basic = mat as THREE.MeshBasicMaterial
    const im = mesh as THREE.InstancedMesh
    const tint = im.isInstancedMesh ? averageInstanceColor(im) : new THREE.Color(1, 1, 1)
    return toEmissive(basic.color.clone().multiply(tint))
  }
  // semi-transparent overlays (e.g. cables dimmed in traffic view) are skipped
  if (mat.transparent && mat.opacity < 0.6) return null
  return mat
}

export function buildPhotoScene(src: THREE.Scene, background: THREE.ColorRepresentation): THREE.Scene {
  src.updateMatrixWorld(true)
  const out = new THREE.Scene()
  out.background = new THREE.Color(background)
  const env = new GradientEquirectTexture(256)
  env.topColor.set("#e6ecf2")
  env.bottomColor.set("#5b636c")
  env.exponent = 1.6
  env.update()
  out.environment = env
  out.environmentIntensity = 1.35

  const m = new THREE.Matrix4()
  const wp = new THREE.Vector3()

  src.traverseVisible((o) => {
    const light = o as THREE.Light
    if (light.isLight) {
      const anyLight = light as THREE.Light & {
        isDirectionalLight?: boolean
        isRectAreaLight?: boolean
        isPointLight?: boolean
        isSpotLight?: boolean
        target?: THREE.Object3D
      }
      if (!(anyLight.isDirectionalLight || anyLight.isRectAreaLight || anyLight.isPointLight || anyLight.isSpotLight)) return
      const l = light.clone(false) as typeof anyLight
      l.matrixAutoUpdate = false
      l.matrix.copy(light.matrixWorld)
      if (anyLight.target && l.target !== undefined) {
        const t = new THREE.Object3D()
        anyLight.target.getWorldPosition(wp)
        t.position.copy(wp)
        out.add(t)
        l.target = t
      }
      out.add(l)
      return
    }

    const mesh = o as THREE.Mesh
    if (!mesh.isMesh || !mesh.geometry?.attributes?.position) return
    const material = convertMaterial(mesh)
    if (!material) return

    const im = mesh as THREE.InstancedMesh
    if (im.isInstancedMesh) {
      if (im.count === 0) return
      const base = stripAttributes(im.geometry)
      const parts: THREE.BufferGeometry[] = []
      for (let i = 0; i < im.count; i++) {
        im.getMatrixAt(i, m)
        m.premultiply(im.matrixWorld)
        parts.push(base.clone().applyMatrix4(m))
      }
      const merged = mergeGeometries(parts)
      parts.forEach((p) => p.dispose())
      base.dispose()
      if (merged) out.add(new THREE.Mesh(merged, material))
      return
    }

    const copy = new THREE.Mesh(mesh.geometry, material)
    copy.matrixAutoUpdate = false
    copy.matrix.copy(mesh.matrixWorld)
    out.add(copy)
  })

  out.updateMatrixWorld(true)
  return out
}

/** Free geometry created for instanced meshes (shared geometries/materials are left alone). */
export function disposePhotoScene(scene: THREE.Scene, sourceGeometries: Set<THREE.BufferGeometry>) {
  scene.traverse((o) => {
    const mesh = o as THREE.Mesh
    if (mesh.isMesh && !sourceGeometries.has(mesh.geometry)) mesh.geometry.dispose()
  })
  ;(scene.environment as THREE.Texture | null)?.dispose()
}
