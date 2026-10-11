import { cn } from "@/lib/utils"

interface ChipProps {
  children: React.ReactNode
  variant?: "default" | "orange"
  className?: string
}

export function Chip({ children, variant = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-block font-mono text-[11px] tracking-wider uppercase border px-2 py-0.5",
        variant === "default" && "text-primary border-primary/40",
        variant === "orange" && "text-destructive border-destructive/40",
        className
      )}
    >
      {children}
    </span>
  )
}

export function ChipRow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
}
