import { SectionLabel } from "./section-label"
import { StatCard } from "./stat-card"

export function AboutPanel() {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>Background</SectionLabel>
        <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/85">
          Computer Engineering graduate from Lebanon with enterprise-grade hands-on
          experience across network design, security operations, and software
          development. Built and managed large-scale Fortinet environments, designed
          BGP/OSPF topologies, and deployed 802.1X NAC with Aruba ClearPass.
        </p>
      </section>

      <section>
        <SectionLabel>Current Focus</SectionLabel>
        <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/85">
          Pursuing NSE 4 FortiGate Security certification. Actively seeking junior
          IT/networking roles (remote-friendly). Also working as an ICT educator
          bridging production infrastructure with hands-on curriculum.
        </p>
      </section>

      <section>
        <SectionLabel>Stats</SectionLabel>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatCard value="5+" label="Years Networking" />
          <StatCard value="NSE" label="Fortinet Track" />
          <StatCard value="BGP" label="OSPF · MPLS" />
          <StatCard value="3D" label="Three.js Dev" />
        </div>
      </section>
    </div>
  )
}
