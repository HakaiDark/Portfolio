"use client"

import { whatsappUrl } from "@/lib/contact"

const EMAIL = "eng.compyassin@gmail.com"

/** Contact card extra: WhatsApp (messages only, no calls) and email. */
export function ContactPanel() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        type="button"
        // number is assembled client-side (lib/contact.ts) so it never sits in the HTML
        onClick={() => window.open(whatsappUrl(), "_blank", "noopener,noreferrer")}
        className="flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#3ee07a]"
      >
        Message on WhatsApp
      </button>
      <a
        href={`mailto:${EMAIL}`}
        className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:border-white/50"
      >
        Email
      </a>
    </div>
  )
}
