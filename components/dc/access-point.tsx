"use client"

import { useLayoutEffect, useMemo } from "react"
import { RoundedBox, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { ACCESS_POINT } from "@/lib/dc/devices"
import { CEILING_Y } from "./room"

const SIZE = 0.2
const THICK = 0.045

function roundedSquare(size: number, r: number) {
  const s = size / 2
  const shape = new THREE.Shape()
  shape.moveTo(-s + r, -s)
  shape.lineTo(s - r, -s)
  shape.quadraticCurveTo(s, -s, s, -s + r)
  shape.lineTo(s, s - r)
  shape.quadraticCurveTo(s, s, s - r, s)
  shape.lineTo(-s + r, s)
  shape.quadraticCurveTo(-s, s, -s, s - r)
  shape.lineTo(-s, -s + r)
  shape.quadraticCurveTo(-s, -s, -s + r, -s)
  const geo = new THREE.ShapeGeometry(shape, 12)
  // planar UVs over the bounding square
  const pos = geo.attributes.position
  const uv = new Float32Array(pos.count * 2)
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = pos.getX(i) / size + 0.5
    uv[i * 2 + 1] = pos.getY(i) / size + 0.5
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2))
  return geo
}

/** Aruba AP-535 hanging from the ceiling, its logo face pointing down at the aisle. */
export function AccessPoint({ lowRes }: { lowRes: boolean }) {
  const tex = useTexture(lowRes ? "/3d/devices/aruba-ap535-top-1k.webp" : "/3d/devices/aruba-ap535-top.webp")
  useLayoutEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.needsUpdate = true
  }, [tex])
  const face = useMemo(() => roundedSquare(SIZE * 0.97, 0.05), [])
  const [x, y, z] = ACCESS_POINT.position
  const drop = CEILING_Y - y - THICK / 2
  return (
    <group position={[x, y, z]}>
      <RoundedBox args={[SIZE, THICK, SIZE]} radius={0.018} smoothness={4} castShadow>
        <meshStandardMaterial color="#f3f4f4" roughness={0.38} />
      </RoundedBox>
      <mesh geometry={face} position={[0, -THICK / 2 - 0.0006, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial map={tex} roughness={0.35} />
      </mesh>
      {/* status LED */}
      <mesh position={[0, -THICK / 2 - 0.001, SIZE * 0.43]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.0025, 12]} />
        <meshBasicMaterial color={[0.4, 3, 0.6]} toneMapped={false} />
      </mesh>
      {/* mounting bracket and its uplink cable into the ceiling */}
      <mesh position={[0, THICK / 2 + drop / 2, 0]}>
        <cylinderGeometry args={[0.012, 0.016, drop, 16]} />
        <meshStandardMaterial color="#e7e8e9" roughness={0.5} />
      </mesh>
      <mesh position={[0.03, THICK / 2 + drop / 2, -0.02]}>
        <cylinderGeometry args={[0.003, 0.003, drop, 8]} />
        <meshStandardMaterial color="#1f5fbf" roughness={0.55} />
      </mesh>
    </group>
  )
}
