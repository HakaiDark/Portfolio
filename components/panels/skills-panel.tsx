import { SectionLabel } from "./section-label"
import { SkillBar } from "./skill-bar"
import { Chip, ChipRow } from "./chip"

export function SkillsPanel() {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>Networking & Security</SectionLabel>
        <div className="mt-4 space-y-3">
          <SkillBar label="Fortinet (FortiGate/Manager/Analyzer)" value={92} />
          <SkillBar label="BGP · OSPF · MPLS · VLAN" value={88} />
          <SkillBar label="802.1X · Aruba ClearPass · RADIUS" value={85} />
          <SkillBar label="IPSec & SSL VPN · SD-WAN" value={83} />
        </div>
      </section>

      <section>
        <SectionLabel>Development</SectionLabel>
        <div className="mt-4 space-y-3">
          <SkillBar label="Python · Bash Scripting" value={80} />
          <SkillBar label="JavaScript · Three.js · WebGL" value={76} />
          <SkillBar label="Linux · VMware · Kali Linux" value={82} />
        </div>
      </section>

      <section>
        <SectionLabel>Tools & Certifications</SectionLabel>
        <ChipRow className="mt-4">
          <Chip>NSE Track</Chip>
          <Chip>Cisco NetAcad</Chip>
          <Chip>FortiGate</Chip>
          <Chip>Packet Tracer</Chip>
          <Chip variant="orange">Kali Linux</Chip>
          <Chip variant="orange">Wireshark</Chip>
          <Chip variant="orange">MITRE ATT&CK</Chip>
        </ChipRow>
      </section>
    </div>
  )
}
