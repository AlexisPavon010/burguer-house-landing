"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/lib/types"

const menuItems: Product[] = [
  // Burgers - Especialidades de Burger House
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
  {
    id: 4,
    name: "Clásica Simple",
    description: "Pan, medallón r.a de 120 grs, queso tybo, lechuga, tomate + papas mccain",
    price: 3200,
    image: "/classic-simple-burger-with-cheese-lettuce-tomato.jpg",
    category: "burgers",
  },
  {
    id: 5,
    name: "Doble Cheddar",
    description: "Pan brioche, medallón r.a x2, cheddar fundido x4, cebolla caramelizada + papas mccain",
    price: 5200,
    image: "/double-cheddar-burger-caramelized-onion.jpg",
    category: "burgers",
  },
  {
    id: 6,
    name: "Crispy Chicken",
    description: "Pan, pechuga empanizada crocante, lechuga, tomate, mayo de ajo + papas mccain",
    price: 4200,
    image: "/crispy-chicken-burger-with-lettuce-tomato.jpg",
    category: "burgers",
  },
  // Lomos
  {
    id: 7,
    name: "Lomo Completo",
    description: "Pan francés, lomo, jamón, queso, lechuga, tomate, huevo, papas fritas",
    price: 5500,
    image: "/argentine-lomo-sandwich-complete-with-fries.jpg",
    category: "lomos",
  },
  {
    id: 8,
    name: "Lomo Simple",
    description: "Pan francés, lomo, lechuga, tomate, mayonesa",
    price: 4000,
    image: "/simple-lomo-sandwich-argentine-style.jpg",
    category: "lomos",
  },
  // Panchos
  {
    id: 9,
    name: "Pancho Completo",
    description: "Salchicha, pan, papas pay, mostaza, ketchup, mayonesa",
    price: 1800,
    image: "/argentine-hot-dog-pancho-with-toppings.jpg",
    category: "panchos",
  },
  {
    id: 10,
    name: "Pancho con Cheddar",
    description: "Salchicha, pan, cheddar fundido, cebolla crispy, bacon",
    price: 2500,
    image: "/hot-dog-with-melted-cheddar-bacon.jpg",
    category: "panchos",
  },
  // Pizzas
  {
    id: 11,
    name: "Pizza Muzzarella",
    description: "Salsa de tomate, muzzarella, aceitunas",
    price: 4500,
    image: "/argentine-mozzarella-pizza.jpg",
    category: "pizzas",
  },
  {
    id: 12,
    name: "Pizza Especial",
    description: "Salsa de tomate, muzzarella, jamón, morrones, aceitunas",
    price: 5500,
    image: "/special-pizza-with-ham-peppers-olives.jpg",
    category: "pizzas",
  },
  // Complementos
  {
    id: 13,
    name: "Papas Fritas",
    description: "Porción de papas mccain doradas y crujientes",
    price: 1500,
    image: "/golden-crispy-french-fries.png",
    category: "sides",
  },
  {
    id: 14,
    name: "Papas con Cheddar",
    description: "Papas fritas con cheddar fundido y bacon",
    price: 2500,
    image: "/loaded-fries-with-cheddar-and-bacon.jpg",
    category: "sides",
  },
  {
    id: 15,
    name: "Aros de Cebolla",
    description: "Aros de cebolla crocantes con salsa",
    price: 1800,
    image: "/crispy-onion-rings-with-dipping-sauce.jpg",
    category: "sides",
  },
  // Bebidas
  {
    id: 16,
    name: "Gaseosa",
    description: "Coca-Cola, Sprite, Fanta (500ml)",
    price: 1200,
    image: "/soda-bottle-coca-cola-sprite-fanta.jpg",
    category: "drinks",
  },
  {
    id: 17,
    name: "Agua Mineral",
    description: "Botella 500ml",
    price: 800,
    image: "/mineral-water-bottle.jpg",
    category: "drinks",
  },
  {
    id: 18,
    name: "Cerveza",
    description: "Quilmes, Brahma, Corona",
    price: 1800,
    image: "/beer-bottle-argentine-style.jpg",
    category: "drinks",
  },
]

const categories = [
  { id: "all", name: "Todo" },
  { id: "burgers", name: "Hamburguesas" },
  { id: "lomos", name: "Lomos" },
  { id: "panchos", name: "Panchos" },
  { id: "pizzas", name: "Pizzas" },
  { id: "sides", name: "Complementos" },
  { id: "drinks", name: "Bebidas" },
]

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const addItem = useCartStore((state) => state.addItem)

  const filteredItems =
    activeCategory === "all" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-AR")}`
  }

  return (
    <section className="py-12 md:py-16 lg:py-24" id="menu">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <Badge variant="secondary" className="bg-primary/20 text-primary mb-4">
            Menú Completo
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-foreground mb-4">
            NUESTRO <span className="text-primary">MENÚ</span>
          </h2>
          <p className="hidden md:block text-muted-foreground text-lg max-w-2xl mx-auto">
            Burger, pizzas, lomos y panchos al paso - Todas las noches desde las 19hs
          </p>
        </div>

        <div className="mb-8 md:mb-12">
          {/* Mobile: horizontal scroll */}
          <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 w-max">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full font-semibold whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          {/* Desktop: flex wrap */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full font-semibold ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-card border-border hover:border-primary transition-all group hover:shadow-xl hover:shadow-primary/10"
            >
              <CardContent className="p-3 md:p-4">
                <div className="relative mb-2 md:mb-4">
                  <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-24 md:h-40 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-foreground mb-1 line-clamp-1">{item.name}</h3>
                <p className="hidden md:block text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-2 md:mt-0">
                  <span className="text-base md:text-xl font-black text-primary">{formatPrice(item.price)}</span>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-9 h-9 md:w-auto md:h-auto p-0 md:px-4 md:py-2"
                    onClick={() => addItem(item)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
