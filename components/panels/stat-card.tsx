export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-border/20 bg-card/50 p-4">
      <div className="font-mono text-2xl font-bold text-primary">{value}</div>
      <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  )
}
