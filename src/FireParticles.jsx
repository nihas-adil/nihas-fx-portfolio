import { useEffect, useRef } from 'react'

export default function FireParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) return

    let width = 0
    let height = 0
    let raf = 0
    let particles = []
    let lastTime = 0
    let pointer = { x: -1000, y: -1000, power: 0 }

    const mobileQuery = window.matchMedia('(max-width: 700px)')
    const random = (min, max) => Math.random() * (max - min) + min

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const areaCount = Math.floor((width * height) / 18000)
      const count = Math.max(
        mobileQuery.matches ? 18 : 28,
        Math.min(mobileQuery.matches ? 38 : 65, areaCount)
      )

      particles = Array.from({ length: count }, () => createParticle(true))
    }

    function createParticle(anywhere = false) {
      return {
        x: random(0, width),
        y: anywhere ? random(0, height) : height + random(2, 35),
        vx: random(-0.22, 0.22),
        vy: random(-0.75, -0.2),
        radius: random(1, 2.8),
        life: random(0.5, 1),
        hue: random(0, 1)
      }
    }

    function movePointer(event) {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.power = 1
    }

    function handlePointerDown(event) {
      movePointer(event)
    }

    function animate(time) {
      raf = requestAnimationFrame(animate)

      const delta = lastTime ? Math.min((time - lastTime) / 16.67, 2) : 1
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx * delta
        p.y += p.vy * delta
        p.life -= 0.0007 * delta

        // Mouse and touch interaction: gently push nearby embers
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const radius = 125

        if (pointer.power > 0.02 && distance < radius && distance > 0) {
          const force = (1 - distance / radius) * 0.12 * pointer.power
          p.vx += (dx / distance) * force * delta
          p.vy += (dy / distance) * force * delta
        }

        p.vx *= 0.985
        p.vx = Math.max(-1.5, Math.min(1.5, p.vx))

        if (p.y < -10 || p.x < -10 || p.x > width + 10 || p.life <= 0) {
          Object.assign(p, createParticle())
        }

        const alpha = Math.max(0.12, Math.min(0.85, p.life))
        const color = p.hue > 0.55 ? '255,65,35' : '255,145,45'

        // Small soft ember; avoids expensive shadowBlur effects
        ctx.globalAlpha = alpha * 0.18
        ctx.fillStyle = `rgb(${color})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = alpha * 0.8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      pointer.power *= 0.94
      ctx.globalAlpha = 1
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', movePointer, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', movePointer)
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  return <canvas ref={canvasRef} className="fire-particles-canvas" aria-hidden="true" />
}
