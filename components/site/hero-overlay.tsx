import { ArrowDown, Download, Github, Mail } from "lucide-react"
import { profile } from "@/content/profile"
import { PhoneActions } from "./phone-actions"
import { TraceHeroButton } from "@/components/dc/packet-journey"

const outline =
  "inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 transition-colors hover:border-white/60 md:gap-2 md:px-4 md:py-2 md:text-sm"

/** Name, headline and the recruiter shortcuts, layered over the 3D rack (above its hotspots). */
export function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[35] p-3 md:p-10">
      <div className="pointer-events-auto max-w-[30rem] rounded-2xl border border-white/10 bg-[#0b0e11]/75 p-4 shadow-2xl backdrop-blur-md md:p-7">
        <p className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-[#00ffe7] uppercase md:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ee07a] motion-safe:animate-pulse" />
          Online · {profile.location}
        </p>
        <h1 className="mt-2 text-[1.6rem] leading-tight font-semibold tracking-tight text-white md:mt-3 md:text-5xl">{profile.name}</h1>
        <p className="mt-0.5 text-sm font-medium text-white/85 md:mt-1.5 md:text-xl">{profile.headline}</p>
        <p className="mt-2 hidden text-sm leading-relaxed text-white/60 md:block">{profile.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
          <a
            href={profile.links.cv}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-[#00ffe7] px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-white md:gap-2 md:px-4 md:py-2 md:text-sm"
          >
            <Download className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
            Download CV
          </a>
          <TraceHeroButton className="inline-flex items-center gap-1.5 rounded-full border border-[#00ffe7]/60 px-3 py-1.5 text-xs text-[#00ffe7] transition-colors hover:bg-[#00ffe7] hover:text-black md:gap-2 md:px-4 md:py-2 md:text-sm" />
          <PhoneActions size="sm" />
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={outline}>
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={outline} aria-label="GitHub">
            <Github className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a href={`mailto:${profile.email}`} className={outline} aria-label={`Email ${profile.email}`}>
            <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
        <a href="#experience" className="mt-4 hidden items-center gap-1.5 text-xs text-white/55 transition-colors hover:text-white md:inline-flex">
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
          Scroll for experience, projects and skills
        </a>
      </div>
    </div>
  )
}
