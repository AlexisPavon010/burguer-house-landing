"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "./ui/card"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/lib/types"

const featuredBurgers: Product[] = [
  {
    id: 1,
    name: "Viller",
    description:
      "Pan tyuks de papa, salsita mostachos, medallón r.a de 120 grs, tybo x2, chorizo(zibelman), salsita criolla + papas mccain",
    price: 4500,
    image: "/viller.png",
    category: "burgers",
  },
  {
    id: 2,
    name: "Argenta",
    description:
      "Pan tyuks de papa, mayo casera, medallón r.a. de 120 grs x2, lechuga repollada, tomate, queso tybo x2, jamón cocido, huevo a la plancha + papas mccain",
    price: 5500,
    image: "/argenta.png",
    category: "burgers",
  },
  {
    id: 3,
    name: "Carteluda",
    description:
      "Pan tyuks de papa, mayo casera, medallón r.a. de 120grs x2, cheddar x4, panceta dorada, huevo a la plancha + papas mccain",
    price: 5800,
    image: "/carteluda.png",
    category: "burgers",
  },
]

export function BurgerSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((state) => state.addItem)

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-AR")}`
  }

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % featuredBurgers.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + featuredBurgers.length) % featuredBurgers.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-secondary/50" id="especiales">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="bg-primary/20 text-primary mb-4">
            Destacados
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            NUESTRAS <span className="text-primary">ESPECIALIDADES</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Las mejores hamburguesas de Burger House, preparadas con ingredientes de primera calidad
          </p>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full w-12 h-12 hidden md:flex"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full w-12 h-12 hidden md:flex"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Cards Container */}
          <div ref={containerRef} className="overflow-hidden mx-0 md:mx-16">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredBurgers.map((burger) => (
                <div key={burger.id} className="w-full flex-shrink-0 px-2 md:px-4">
                  <Card className="bg-card border-border shadow-xl">
                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-12">
                      {/* Image */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                        <img
                          src={burger.image || "/placeholder.svg"}
                          alt={burger.name}
                          className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl md:text-4xl font-black text-foreground mb-3">{burger.name}</h3>
                        <p className="text-muted-foreground text-lg mb-6">{burger.description}</p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                          <span className="text-3xl md:text-4xl font-black text-primary">
                            {formatPrice(burger.price)}
                          </span>
                          <Button
                            size="lg"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full px-8"
                          onClick={() => addItem(burger)}
                          >
                            <Plus className="w-5 h-5 mr-2" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredBurgers.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground"
                  }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-4 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full bg-transparent"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full bg-transparent"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
