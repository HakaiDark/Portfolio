"use client"

import { useEffect, useState } from "react"
import { profile } from "@/content/profile"

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

/** Slim header that slides in once the visitor scrolls past the 3D hero. */
export function SiteHeader() {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const hero = document.getElementById("hero")
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0.08 })
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0b0e11]/85 backdrop-blur-md transition-transform duration-300 ${
        shown ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-hidden={!shown}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <a href="#hero" className="text-sm font-semibold tracking-tight text-white" tabIndex={shown ? 0 : -1}>
          {profile.name}
        </a>
        <nav className="flex items-center gap-5" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} tabIndex={shown ? 0 : -1} className="hidden text-sm text-white/65 transition-colors hover:text-white md:inline">
              {l.label}
            </a>
          ))}
          <a
            href={profile.links.cv}
            download
            tabIndex={shown ? 0 : -1}
            className="rounded-full bg-[#00ffe7] px-3.5 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-white"
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  )
}
