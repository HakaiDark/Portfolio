"use client"

import dynamic from "next/dynamic"

const DatacenterScene = dynamic(
  () => import("@/components/datacenter-scene"),
  { ssr: false }
)

export default function Home() {
  return <DatacenterScene />
}
