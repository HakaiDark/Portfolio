export function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-foreground/80">{label}</span>
        <span className="font-mono text-xs text-primary">{value}%</span>
      </div>
      <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-border/30">
        <div
          className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
