import { SectionLabel } from "./section-label"
import { SkillBar } from "./skill-bar"
import { Chip, ChipRow } from "./chip"

export function RackPanel() {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>Environment</SectionLabel>
        <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/85">
          Managed a large-scale enterprise Fortinet environment with centralized
          policy orchestration via FortiManager, advanced logging through
          FortiAnalyzer, and multi-site SD-WAN configuration.
        </p>
      </section>

      <section>
        <SectionLabel>Stack</SectionLabel>
        <ChipRow className="mt-4">
          <Chip>FortiGate NGFW</Chip>
          <Chip>L3 Core Switch</Chip>
          <Chip>L2 Access Switch</Chip>
          <Chip>Patch Panel</Chip>
          <Chip variant="orange">UPS · PDU</Chip>
          <Chip variant="orange">Cable Mgmt</Chip>
        </ChipRow>
      </section>

      <section>
        <SectionLabel>Protocols</SectionLabel>
        <div className="mt-4 space-y-3">
          <SkillBar label="BGP · OSPF Routing" value={88} />
          <SkillBar label="VLAN Segmentation" value={90} />
          <SkillBar label="STP · LACP · ECMP" value={82} />
          <SkillBar label="QoS · Traffic Shaping" value={78} />
        </div>
      </section>
    </div>
  )
}
