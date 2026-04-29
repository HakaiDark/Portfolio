import { SectionLabel } from "./section-label"
import { Chip, ChipRow } from "./chip"

interface ProjectCardProps {
  title: string
  description: string
  chips: string[]
}

function ProjectCard({ title, description, chips }: ProjectCardProps) {
  return (
    <div className="relative border border-border/20 bg-card/50 p-4">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <h3 className="font-mono text-base font-bold tracking-wider text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        {description}
      </p>
      <ChipRow className="mt-3">
        {chips.map((chip) => (
          <Chip key={chip} className="text-[10px]">
            {chip}
          </Chip>
        ))}
      </ChipRow>
    </div>
  )
}

export function ProjectsPanel() {
  return (
    <div className="space-y-4">
      <SectionLabel>Recent Work</SectionLabel>
      
      <ProjectCard
        title="Enterprise Fortinet Deployment"
        description="Full-scale enterprise network via FortiManager. Centralized policy orchestration, FortiAnalyzer logging, IPSec site-to-site VPNs, SD-WAN across multiple branches."
        chips={["FortiGate", "FortiManager", "SD-WAN"]}
      />

      <ProjectCard
        title="802.1X NAC with Aruba ClearPass"
        description="Port-based NAC with EAP-TLS certificate auth, dynamic VLAN assignment, and device profiling. RADIUS + TACACS+ integration."
        chips={["ClearPass", "802.1X", "RADIUS"]}
      />

      <ProjectCard
        title="3D Datacenter Portfolio"
        description="Interactive Three.js datacenter scene with live canvas textures, clickable 3D objects, engineer character, firewall model, and animated wall monitors."
        chips={["Three.js", "WebGL", "JavaScript"]}
      />

      <ProjectCard
        title="Cyber Security Course Labs"
        description="Bash scripting assignments, Kali Linux terminal labs, Kill Chain & MITRE ATT&CK analysis, PDF-formatted documentation."
        chips={["Bash", "Kali Linux", "Python"]}
      />
    </div>
  )
}
