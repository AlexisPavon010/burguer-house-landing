'use client'
import { BurgerSwiper } from "@/components/burger-swiper";
import { HeroSection } from "@/components/hero-section";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MenuSection } from "@/components/menu-section";
import { CartSheet } from "@/components/cart-sheet";
import { useState } from "react";
import { OrderDialog } from "@/components/order-dialog";

export default function Home() {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BurgerSwiper />
      <MenuSection />
      <Footer />

      <CartSheet onCheckout={() => setIsOrderDialogOpen(true)} />

      <OrderDialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen} />
    </main>
  );
}
