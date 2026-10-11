import { SectionLabel } from "./section-label"
import { StatCard } from "./stat-card"
import { Chip, ChipRow } from "./chip"

export function FirewallPanel() {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>Overview</SectionLabel>
        <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/85">
          Enterprise FortiGate deployment with NGFW inspection, IPS, App Control,
          SSL inspection, managed via FortiManager with hundreds of security
          policies across multiple VDOMs.
        </p>
      </section>

      <section>
        <SectionLabel>Specs</SectionLabel>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatCard value="40G" label="Throughput" />
          <StatCard value="500+" label="Policies" />
        </div>
      </section>

      <section>
        <SectionLabel>Capabilities</SectionLabel>
        <ChipRow className="mt-4">
          <Chip variant="orange">IPSec VPN</Chip>
          <Chip variant="orange">SSL-VPN</Chip>
          <Chip variant="orange">IPS · AV</Chip>
          <Chip variant="orange">App Control</Chip>
          <Chip variant="orange">SD-WAN</Chip>
          <Chip variant="orange">VDOM</Chip>
          <Chip variant="orange">SSL Inspect</Chip>
          <Chip variant="orange">FortiManager</Chip>
        </ChipRow>
      </section>
    </div>
  )
}
