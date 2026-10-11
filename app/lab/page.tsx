import type { Metadata } from "next"
import { RackSection } from "@/components/dc/rack-section"

export const metadata: Metadata = {
  title: "Rack lab | Mohammad Yassin",
  robots: { index: false, follow: false },
}

export default function LabPage() {
  return (
    <main className="bg-[#0b0e11]">
      <RackSection className="h-[100svh] w-full" />
    </main>
  )
}
