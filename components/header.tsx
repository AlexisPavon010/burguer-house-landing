"use client"

import { ShoppingCart, Menu, X, Hamburger } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openCart, getItemCount } = useCartStore()
  const cartCount = getItemCount()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-black text-lg md:text-xl">
                <Hamburger className="w-6 h-6" />
              </span>
            </div>
            <span className="font-black text-xl md:text-2xl text-foreground">
              Burger<span className="text-primary"> House</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
              Inicio
            </a>
            <a href="#menu" className="text-foreground hover:text-primary transition-colors font-medium">
              Menú
            </a>
            <a href="#especiales" className="text-foreground hover:text-primary transition-colors font-medium">
              Especiales
            </a>
            <a href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre Nosotros
            </a>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="relative border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              onClick={openCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs font-bold">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {false ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Inicio
              </a>
              <a href="#menu" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Menú
              </a>
              <a href="#especiales" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Especiales
              </a>
              <a href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Sobre Nosotros
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
