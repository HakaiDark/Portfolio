export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-5 bg-primary" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
        {children}
      </span>
    </div>
  )
}
