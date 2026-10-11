import { ArrowUpRight, Download, Mail } from "lucide-react"
import { education, experience, profile, projects, publications, skills } from "@/content/profile"
import { PhoneActions } from "./phone-actions"

function SectionHeading({ index, title, id }: { index: string; title: string; id: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="font-mono text-xs tracking-[0.25em] text-[#00ffe7]">{index}</span>
      <h2 id={id} className="scroll-mt-24 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-white/70">{children}</span>
}

export function AboutSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28" aria-labelledby="about">
      <SectionHeading index="00" title="About" id="about" />
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4 text-[15px] leading-relaxed text-white/75 md:text-base">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase">Based in</dt>
            <dd className="mt-1 text-white/85">{profile.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase">Open to</dt>
            <dd className="mt-1 text-white/85">{profile.openTo}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase">Languages</dt>
            <dd className="mt-1 text-white/85">{profile.languages.join(" · ")}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export function ExperienceSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28" aria-labelledby="experience">
      <SectionHeading index="01" title="Experience" id="experience" />
      <ol className="relative space-y-10 border-l border-white/10 pl-6 md:pl-8">
        {experience.map((r) => (
          <li key={r.company + r.title} className="relative">
            <span className="absolute top-2 -left-[1.86rem] h-2.5 w-2.5 rounded-full border-2 border-[#00ffe7] bg-[#0b0e11] md:-left-[2.36rem]" aria-hidden />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold text-white">
                {r.title} <span className="font-normal text-white/60">· {r.company}</span>
              </h3>
              <p className="font-mono text-xs text-white/50">{r.dates}</p>
            </div>
            <p className="mt-0.5 text-sm text-white/45">
              {r.place}
              {r.kind ? ` · ${r.kind}` : ""}
            </p>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-white/75">
              {r.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function ProjectsSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28" aria-labelledby="projects">
      <SectionHeading index="02" title="Projects" id="projects" />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{p.name}</h3>
                {p.href && <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-[#00ffe7]" aria-hidden />}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </>
          )
          const cls = "group block rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors"
          return p.href ? (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-[#00ffe7]/40`}>
              {body}
            </a>
          ) : (
            <div key={p.name} className={cls}>
              {body}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function SkillsSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28" aria-labelledby="skills">
      <SectionHeading index="03" title="Skills" id="skills" />
      <div className="grid gap-8 md:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase">{g.group}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function EducationSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28" aria-labelledby="education">
      <SectionHeading index="04" title="Education & publications" id="education" />
      <div className="grid gap-10 md:grid-cols-2">
        <ul className="space-y-5">
          {education.map((e) => (
            <li key={e.title}>
              <p className="font-semibold text-white">{e.title}</p>
              <p className="text-sm text-white/60">{e.school}</p>
              <p className="mt-0.5 font-mono text-xs text-white/45">{e.dates}</p>
            </li>
          ))}
        </ul>
        <ul className="space-y-4">
          {publications.map((p) => (
            <li key={p.title} className="text-sm">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-white/85 underline decoration-white/20 underline-offset-4 hover:decoration-[#00ffe7]">
                  {p.title}
                </a>
              ) : (
                <span className="text-white/85">{p.title}</span>
              )}
              <span className="ml-2 font-mono text-xs text-white/45">{p.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-20 pb-16 md:pt-28" aria-labelledby="contact">
      <SectionHeading index="05" title="Contact" id="contact" />
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#00ffe7]/[0.06] to-transparent p-6 md:p-10">
        <p className="max-w-2xl text-xl leading-snug text-white md:text-2xl">{profile.openTo}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#00ffe7] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {profile.email}
          </a>
          <PhoneActions showNumber />
          <a href={profile.links.cv} download className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 hover:border-white/60">
            <Download className="h-4 w-4" aria-hidden />
            Download CV
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 hover:border-white/60">
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/90 hover:border-white/60">
            GitHub
          </a>
        </div>
        <p className="mt-6 text-sm text-white/50">References available on request.</p>
      </div>
      <footer className="mt-12 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-white/35">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js, Three.js and a path tracer</span>
      </footer>
    </section>
  )
}
