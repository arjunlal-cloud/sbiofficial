import { useEffect, useRef } from 'react'

/**
 * A living network drawn across the full width of a hero.
 *
 * Nodes drift on their own paths; links draw themselves whenever two nodes come
 * within range, so the lattice is never the same twice. The pointer bends
 * nearby nodes toward it and brightens their links, which gives the section a
 * sense of being alive without asking the visitor to do anything.
 *
 * Cheap by construction: ~54 nodes, squared-distance comparisons only, DPR
 * capped at 2, and the loop stops entirely when the section scrolls out of view
 * or the tab is hidden.
 */
export default function ConstellationField({ className = '', density = 54, reach = 168 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = motionQuery.matches
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let nodes = []
    let raf = null
    let running = true

    const pointer = { x: -9999, y: -9999, active: false }

    const seed = () => {
      const count = width < 640 ? Math.round(density * 0.5) : density
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() < 0.18 ? 2.6 : 1.4,
        gold: Math.random() < 0.3,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const reachSq = reach * reach
    const pointerReach = 150
    const pointerReachSq = pointerReach * pointerReach

    const frame = (time) => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (const node of nodes) {
        if (!reduced) {
          node.x += node.vx
          node.y += node.vy

          /* Pointer attraction, capped so nodes never snap to the cursor. */
          if (pointer.active) {
            const dx = pointer.x - node.x
            const dy = pointer.y - node.y
            const dSq = dx * dx + dy * dy
            if (dSq < pointerReachSq && dSq > 1) {
              const pull = (1 - dSq / pointerReachSq) * 0.42
              const d = Math.sqrt(dSq)
              node.x += (dx / d) * pull
              node.y += (dy / d) * pull
            }
          }

          /* Wrap rather than bounce: no visible walls. */
          if (node.x < -20) node.x = width + 20
          if (node.x > width + 20) node.x = -20
          if (node.y < -20) node.y = height + 20
          if (node.y > height + 20) node.y = -20
        }

        const twinkle = 0.6 + Math.sin(time * 0.0011 + node.phase) * 0.4
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = node.gold
          ? `rgba(45, 103, 167, ${0.62 * twinkle})`
          : `rgba(92, 158, 216, ${0.5 * twinkle})`
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dSq = dx * dx + dy * dy
          if (dSq > reachSq) continue

          const strength = 1 - dSq / reachSq
          /* Links near the pointer light up gold. */
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2
          const pdx = pointer.x - mx
          const pdy = pointer.y - my
          const near = pointer.active && pdx * pdx + pdy * pdy < pointerReachSq

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = near
             ? `rgba(45, 103, 167, ${strength * 0.66})`
             : `rgba(45, 103, 167, ${strength * 0.24})`
          ctx.lineWidth = near ? 1.2 : 0.8
          ctx.stroke()
        }
      }

      if (reduced) { raf = null; return }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (raf) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = null
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    resize()
    start()

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    observer.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    const onMotionChange = () => {
      reduced = motionQuery.matches
      stop()
      start()
    }
    motionQuery.addEventListener('change', onMotionChange)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [density, reach])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
