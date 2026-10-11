"use client"

import { cn } from "@/lib/utils"

const navItems = [
  { id: "about", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "rack", label: "Infra" },
  { id: "firewall", label: "Security" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

interface SideNavProps {
  activeSection: string | null
  onNavigate: (section: string) => void
}

export function SideNav({ activeSection, onNavigate }: SideNavProps) {
  return (
    <nav className="fixed left-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
      {navItems.map((item) => {
        const isActive = activeSection === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "group flex items-center gap-3 transition-opacity duration-300",
              isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
            )}
          >
            <div
              className={cn(
                "h-px bg-primary transition-all duration-300",
                isActive ? "w-8" : "w-4 group-hover:w-6"
              )}
            />
            <span className="font-mono text-[10px] tracking-[0.22em] text-foreground uppercase">
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
