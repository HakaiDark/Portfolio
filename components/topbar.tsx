"use client"

import { useEffect, useState } from "react"

export function Topbar() {
  const [blinkVisible, setBlinkVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible((v) => !v)
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b border-border/20 bg-gradient-to-b from-background/95 to-transparent px-6 py-4 backdrop-blur-sm">
      {/* Logo */}
      <div className="font-mono text-xl font-bold tracking-widest text-foreground">
        MO<span className="text-destructive">.</span>YASSIN
      </div>

      {/* Status Bar */}
      <div className="hidden items-center gap-8 font-mono text-[10px] tracking-widest text-muted-foreground uppercase md:flex">
        <span>
          STATUS: <strong className="text-primary">ONLINE</strong>
        </span>
        <span>
          RACKS: <strong className="text-primary">A · B · C ACTIVE</strong>
        </span>
        <span>
          CLICK OBJECTS TO EXPLORE{" "}
          <span
            className="inline-block text-primary"
            style={{ opacity: blinkVisible ? 1 : 0 }}
          >
            |
          </span>
        </span>
      </div>
    </header>
  )
}
