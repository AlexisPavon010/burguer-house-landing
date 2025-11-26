"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"

const heroSlides = [
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

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const currentBurger = heroSlides[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="inicio">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Desktop Layout */}
        <div className="hidden md:grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              Burger 🍔, pizzas 🍕 , lomos 🥪 y panchos 🌭 al paso
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight mb-6">
              <span className="text-balance">BIENVENIDOS A</span>
              <br />
              <span className="text-primary">BURGER</span>
              <br />
              <span className="text-balance">HOUSE</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              Todas las noches a partir de las 19hs. Av. El Libertador, al lado de Tiki Drinks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-6 rounded-full"
                asChild
              >
                <a href="#menu">Ver Menú</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6 rounded-full bg-transparent"
                asChild
              >
                <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                  <MessageCircle  />
                  Ordenar por WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div
            className="relative flex justify-center lg:justify-end"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="relative">
              {/* Burger Image with transition and floating animation */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                {heroSlides.map((slide, index) => (
                  <img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.name}
                    className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-all duration-500 ${index === currentSlide
                      ? "opacity-100 scale-100 animate-[float_3s_ease-in-out_infinite]"
                      : "opacity-0 scale-95"
                      }`}
                  />
                ))}
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                ${currentBurger.price}
              </div>

              {/* Name Badge */}
              <div className="absolute bottom-8 -right-4 bg-card text-card-foreground px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                {currentBurger.name}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-10 h-10 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-10 h-10 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-primary/30"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
            Burger, pizzas, lomos y panchos
          </span>
          <h1 className="text-4xl font-black text-foreground leading-tight mb-4">
            <span className="text-balance">BIENVENIDOS A</span>
            <br />
            <span className="text-primary">BURGER HOUSE</span>
          </h1>

          {/* Mobile Swiper */}
          <div
            className="relative w-full max-w-sm my-6"
            onTouchStart={() => setIsAutoPlaying(false)}
            onTouchEnd={() => setIsAutoPlaying(true)}
          >
            <div className="relative h-64">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex flex-col items-center transition-all duration-500 ${index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                    }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.name}
                    className={`w-48 h-48 object-contain drop-shadow-2xl ${index === currentSlide ? "animate-[float_3s_ease-in-out_infinite]" : ""
                      }`}
                  />
                  <h3 className="text-xl font-bold text-foreground mt-2">{slide.name}</h3>
                  <p className="text-primary font-black text-lg">${slide.price}</p>
                </div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-primary/30"
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-muted-foreground text-base mb-6 px-4">
            Todas las noches desde las 19hs. Av. El Libertador.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-6 py-5 rounded-full w-full"
              asChild
            >
              <a href="#menu">Ver Menú</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-base px-6 py-5 rounded-full bg-transparent w-full"
              asChild
            >
              <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                Ordenar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </section>
  )
}
