import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor: small gold dot + lagging ring.
 * Hides on touch devices. Ring expands on interactive elements.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  useEffect(() => {
    // Skip on touch-primary devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    const onInteractEnter = (e) => {
      if (e.target.closest('a, button, [role="button"], summary, input, textarea, select, label')) {
        setExpanded(true)
      }
    }
    const onInteractLeave = () => setExpanded(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onInteractEnter)
    document.addEventListener('mouseout', onInteractLeave)

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12)

      dot.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`
      ringEl.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`

      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onInteractEnter)
      document.removeEventListener('mouseout', onInteractLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: expanded ? 6 : 6,
          height: expanded ? 6 : 6,
          borderRadius: '50%',
          background: '#c09b2d',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: expanded ? 44 : 28,
          height: expanded ? 44 : 28,
          borderRadius: '50%',
          border: `1.5px solid ${expanded ? 'rgba(192,155,45,0.8)' : 'rgba(192,155,45,0.45)'}`,
          background: expanded ? 'rgba(192,155,45,0.06)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
