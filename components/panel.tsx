"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { AboutPanel } from "./panels/about-panel"
import { SkillsPanel } from "./panels/skills-panel"
import { RackPanel } from "./panels/rack-panel"
import { FirewallPanel } from "./panels/firewall-panel"
import { ProjectsPanel } from "./panels/projects-panel"
import { ContactPanel } from "./panels/contact-panel"

interface PanelProps {
  section: string | null
  onClose: () => void
}

const sectionConfig: Record<string, { eyebrow: string; title: string }> = {
  about: { eyebrow: "01 // Profile", title: "ABOUT ME" },
  skills: { eyebrow: "02 // Arsenal", title: "CORE SKILLS" },
  rack: { eyebrow: "03 // Infrastructure", title: "SERVER RACK" },
  firewall: { eyebrow: "04 // Security", title: "FORTIGATE NGFW" },
  projects: { eyebrow: "05 // Work", title: "PROJECTS" },
  contact: { eyebrow: "06 // Connect", title: "GET IN TOUCH" },
}

export function Panel({ section, onClose }: PanelProps) {
  const config = section ? sectionConfig[section] : null

  return (
    <div
      className={cn(
        "fixed right-0 top-0 bottom-0 z-30 flex w-full max-w-md flex-col border-l border-border/30 bg-card/97 backdrop-blur-xl transition-transform duration-500 ease-out",
        section ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      {config && (
        <div className="flex items-start justify-between border-b border-border/20 px-6 py-5">
          <div>
            <p className="mb-1 font-mono text-xs tracking-[0.35em] text-destructive uppercase">
              {config.eyebrow}
            </p>
            <h2 className="font-mono text-2xl font-bold tracking-wider text-foreground">
              {config.title}
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="font-mono text-xs tracking-wider"
          >
            <X className="mr-1.5 h-3.5 w-3.5" />
            CLOSE
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
        {section === "about" && <AboutPanel />}
        {section === "skills" && <SkillsPanel />}
        {section === "rack" && <RackPanel />}
        {section === "firewall" && <FirewallPanel />}
        {section === "projects" && <ProjectsPanel />}
        {section === "contact" && <ContactPanel />}
      </div>
    </div>
  )
}
