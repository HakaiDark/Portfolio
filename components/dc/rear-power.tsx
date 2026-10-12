"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { buildRearPower, FEED_COLORS, PDU } from "@/lib/dc/power"

const plugGeo = new THREE.BoxGeometry(0.016, 0.012, 0.03)

/** Outlet strip (C13 sockets) for the inner face of a PDU; repeats down its length. */
function outletTexture() {
  const c = document.createElement("canvas")
  c.width = 64
  c.height = 64
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#1c1d20"
  ctx.fillRect(0, 0, 64, 64)
  ctx.fillStyle = "#08090a"
  ctx.fillRect(14, 12, 36, 26)
  ctx.fillStyle = "#2c2e33"
  for (const x of [22, 30, 38]) ctx.fillRect(x, 20, 4, 9)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.repeat.set(1, Math.round((PDU.top - PDU.bottom) / 0.065))
  return t
}

/** Red seven-segment load display ("A" + amps), like a metered PDU. */
function displayTexture(amps: string) {
  const c = document.createElement("canvas")
  c.width = 128
  c.height = 64
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#120304"
  ctx.fillRect(0, 0, 128, 64)
  ctx.fillStyle = "#ff3b2f"
  ctx.font = "bold 38px ui-monospace, Consolas, monospace"
  ctx.textBaseline = "middle"
  ctx.fillText(amps, 14, 34)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/**
 * The hero rack's rear power: A/B vertical PDUs and dual-PSU cords from every unit. Seen through
 * the open frame when the camera turns; a few draw calls in all (cords merged per feed).
 */
export function RearPower() {
  const power = useMemo(() => buildRearPower(), [])
  const outlets = useMemo(() => outletTexture(), [])
  const displays = useMemo(() => ({ A: displayTexture("5.8A"), B: displayTexture("6.1A") }), [])
  const plugRef = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const rotX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
    power.plugs.forEach((p, i) => {
      m.compose(new THREE.Vector3(...p.position), p.along === "x" ? rotX : q, new THREE.Vector3(1, 1, 1))
      plugRef.current?.setMatrixAt(i, m)
    })
    if (plugRef.current) plugRef.current.instanceMatrix.needsUpdate = true
  }, [power])
  const h = PDU.top - PDU.bottom
  return (
    <group>
      {(["A", "B"] as const).map((feed) => {
        const side = feed === "A" ? -1 : 1
        return (
          <group key={feed} position={[side * PDU.x, PDU.bottom + h / 2, PDU.z]}>
            <mesh castShadow>
              <boxGeometry args={[PDU.width, h, PDU.depth]} />
              <meshStandardMaterial color="#1c1d20" metalness={0.4} roughness={0.55} />
            </mesh>
            {/* sockets down the face toward the rack's centre */}
            <mesh position={[-side * (PDU.width / 2 + 0.0005), 0, 0]} rotation={[0, (-side * Math.PI) / 2, 0]}>
              <planeGeometry args={[PDU.depth * 0.8, h * 0.96]} />
              <meshStandardMaterial map={outlets} roughness={0.6} />
            </mesh>
            {/* feed label + load meter on the same face, near eye height */}
            <mesh position={[-side * (PDU.width / 2 + 0.0008), 1.25 - (PDU.bottom + h / 2), 0]} rotation={[0, (-side * Math.PI) / 2, 0]}>
              <planeGeometry args={[0.04, 0.02]} />
              <meshBasicMaterial map={displays[feed]} toneMapped={false} color={[1.6, 1.6, 1.6]} />
            </mesh>
            <mesh position={[-side * (PDU.width / 2 + 0.0008), 1.29 - (PDU.bottom + h / 2), 0]} rotation={[0, (-side * Math.PI) / 2, 0]}>
              <planeGeometry args={[0.03, 0.012]} />
              <meshStandardMaterial color={FEED_COLORS[feed]} roughness={0.5} />
            </mesh>
          </group>
        )
      })}
      {power.cords.map((c) => (
        <mesh key={c.feed} geometry={c.geometry} castShadow>
          <meshStandardMaterial color={FEED_COLORS[c.feed]} roughness={0.55} />
        </mesh>
      ))}
      <instancedMesh ref={plugRef} args={[plugGeo, undefined, power.plugs.length]} frustumCulled={false}>
        <meshStandardMaterial color="#111214" roughness={0.6} />
      </instancedMesh>
    </group>
  )
}
