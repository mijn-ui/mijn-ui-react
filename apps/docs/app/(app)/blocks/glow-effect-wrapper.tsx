"use client"

import React, { useEffect } from "react"

const GlowEffectWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName("card_glow")
      Array.from(cards).forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        card.setAttribute("style", `--mouse-x: ${x}px; --mouse-y: ${y}px;`)
      })
    }

    const cardsContainer = document.getElementById("cards")
    if (cardsContainer) {
      cardsContainer.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return <section className="w-full">{children}</section>
}

export default GlowEffectWrapper
