import { SectionLabel } from "./section-label"
import { Chip, ChipRow } from "./chip"

export function ContactPanel() {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>Availability</SectionLabel>
        <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/85">
          Open to network engineering roles, consulting, and ICT education.
          Lebanon-based · Remote-friendly · Actively seeking junior networking
          positions.
        </p>
      </section>

      <section>
        <SectionLabel>Email</SectionLabel>
        <a
          href="mailto:mo.yassin@network.io"
          className="mt-3 block font-mono text-sm text-primary hover:underline"
        >
          mo.yassin@network.io
        </a>
      </section>

      <section>
        <SectionLabel>Platforms</SectionLabel>
        <ChipRow className="mt-4">
          <Chip>LinkedIn</Chip>
          <Chip>GitHub</Chip>
          <Chip variant="orange">Bayt.com</Chip>
        </ChipRow>
      </section>

      <section>
        <SectionLabel>Status</SectionLabel>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="font-mono text-xs tracking-wider text-green-500">
            AVAILABLE — Pursuing NSE 4 Certification
          </span>
        </div>
      </section>
    </div>
  )
}
