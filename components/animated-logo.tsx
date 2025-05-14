"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 120
    canvas.height = 120

    // Animation variables
    let animationFrameId: number
    let hue = 180 // Start with cyan/blue hue

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update hue
      hue = (hue + 0.5) % 360

      // Draw outer circle
      ctx.beginPath()
      ctx.arc(60, 60, 50, 0, Math.PI * 2)
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw inner gear
      const teeth = 12
      const innerRadius = 30
      const outerRadius = 40
      const angleIncrement = (Math.PI * 2) / teeth

      ctx.beginPath()
      for (let i = 0; i < teeth; i++) {
        const angle = i * angleIncrement
        const nextAngle = angle + angleIncrement / 2
        const endAngle = angle + angleIncrement

        ctx.lineTo(60 + Math.cos(angle) * innerRadius, 60 + Math.sin(angle) * innerRadius)
        ctx.lineTo(60 + Math.cos(nextAngle) * outerRadius, 60 + Math.sin(nextAngle) * outerRadius)
        ctx.lineTo(60 + Math.cos(endAngle) * innerRadius, 60 + Math.sin(endAngle) * innerRadius)
      }
      ctx.closePath()
      ctx.strokeStyle = `hsl(${(hue + 30) % 360}, 100%, 70%)`
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw center
      ctx.beginPath()
      ctx.arc(60, 60, 10, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${(hue + 60) % 360}, 100%, 50%)`
      ctx.fill()

      // Draw tool icon
      ctx.beginPath()
      ctx.moveTo(60, 30)
      ctx.lineTo(60, 90)
      ctx.moveTo(45, 60)
      ctx.lineTo(75, 60)
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 4
      ctx.stroke()

      // Request next frame
      animationFrameId = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-[120px] h-[120px]"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}
