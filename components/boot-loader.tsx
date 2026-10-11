"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5
        const next = Math.min(prev + increment, 100)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setFading(true)
            setTimeout(() => {
              setVisible(false)
              onComplete()
            }, 800)
          }, 300)
        }
        return next
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700",
        fading && "opacity-0"
      )}
    >
      {/* Logo */}
      <div className="mb-8 select-none">
        <h1 className="font-mono text-5xl font-bold tracking-wider text-foreground md:text-7xl">
          MO<span className="text-destructive">.</span>
        </h1>
        <h1 className="font-mono text-5xl font-bold tracking-wider text-foreground md:text-7xl">
          YASSIN
        </h1>
      </div>

      {/* Subtitle */}
      <p className="mb-8 font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">
        Network Engineer · Developer · Educator
      </p>

      {/* Progress Bar */}
      <div className="mb-3 h-0.5 w-56 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Text */}
      <p className="font-mono text-xs tracking-widest text-primary">
        INITIALIZING DATACENTER... {Math.round(progress)}%
      </p>
    </div>
  )
}
