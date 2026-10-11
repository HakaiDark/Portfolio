"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { phonePretty, whatsappUrl } from "@/lib/contact"

/**
 * WhatsApp button (the preferred way to reach Mohammad by phone; no direct calls).
 * The link is filled in after hydration so the number is not in the server-rendered HTML;
 * until then the button renders as an inert placeholder.
 */
export function PhoneActions({ size = "md", showNumber = false }: { size?: "sm" | "md"; showNumber?: boolean }) {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const base =
    size === "sm"
      ? "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors md:gap-2 md:px-4 md:py-2 md:text-sm"
      : "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors"
  const icon = size === "sm" ? "h-3.5 w-3.5 md:h-4 md:w-4" : "h-4 w-4"

  return (
    <a
      href={ready ? whatsappUrl() : undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={!ready}
      aria-label={ready ? `WhatsApp ${phonePretty()}` : "WhatsApp"}
      className={`${base} border-[#25d366]/50 text-[#7dffb0] hover:border-[#25d366] hover:bg-[#25d366]/10`}
    >
      <MessageCircle className={icon} aria-hidden />
      {showNumber && ready ? `WhatsApp ${phonePretty()}` : "WhatsApp"}
    </a>
  )
}
