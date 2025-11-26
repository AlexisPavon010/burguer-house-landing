"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, User, CreditCard, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OrderItem } from "@/types"
import { createOrder } from "@/actions/order"
import { generateOrderNumber } from "@/lib/utils"
import { toast } from "sonner"

interface OrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDialog({ open, onOpenChange }: OrderDialogProps) {
  const { items, getTotal, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })

  const total = getTotal()

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-AR")}`
  }

  const submitOrder = async () => {
    setIsSubmitting(true)

    // Prepare order items
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }))

    // Prepare order data
    const orderData = {
      orderNumber: generateOrderNumber(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      },
      items: orderItems,
      paymentMethod: "card" as const,
      subtotal: total,
      total: total,
    }

    try {
      const result = await createOrder(orderData)

      if (result.success) {
        console.log(result)
        setOrderNumber(result.order.orderNumber)
        toast.success("Pedido creado con éxito")
        setStep(3)
      } else {
        console.error("[Order] Failed to create order:", result.error)
        toast.error("Error al procesar el pedido. Intenta nuevamente.")
      }
    } catch (error) {
      console.error("[Order] Error submitting order:", error)
      alert("Error de conexión. Intenta nuevamente.")
      toast.error("Error de conexión. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      submitOrder()
    }
  }

  const handleConfirm = () => {
    setStep(1)
    setFormData({
      name: "",
      phone: "",
      address: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    })
    clearCart()
    onOpenChange(false)
  }

  const handleClose = () => {
    if (step === 3) {
      handleConfirm()
    } else {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">
            {step === 3 ? "Pedido Confirmado" : "Completar Pedido"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress indicator */}
        {step < 3 && (
          <div className="space-y-2">
            <Progress value={step * 50} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Paso {step} de 2: {step === 1 ? "Información de entrega" : "Método de pago"}
            </p>
          </div>
        )}

        {/* Step 1: Delivery Info */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Nombre completo
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre"
                required
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Teléfono
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+54 11 1234 5678"
                required
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Dirección de entrega
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Calle, número, ciudad"
                required
                className="bg-secondary border-border"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-full mt-4"
            >
              Continuar al Pago
            </Button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-foreground flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Número de tarjeta
              </Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                required
                className="bg-secondary border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry" className="text-foreground">
                  Vencimiento
                </Label>
                <Input
                  id="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                  placeholder="MM/AA"
                  required
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardCVC" className="text-foreground">
                  CVC
                </Label>
                <Input
                  id="cardCVC"
                  value={formData.cardCVC}
                  onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value })}
                  placeholder="123"
                  required
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            {/* Order Summary */}
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Resumen del pedido</h3>
                <div className="space-y-2 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-muted-foreground">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <Separator className="bg-border my-2" />
                  <div className="flex justify-between font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold py-6 rounded-full bg-transparent"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Volver
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  `Pagar ${formatPrice(total)}`
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Gracias por tu pedido</h3>
            <p className="text-muted-foreground mb-6">Tu pedido está en camino. Tiempo estimado: 25-35 minutos.</p>
            <Card className="bg-secondary/50 border-border mb-6">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Número de orden</p>
                <p className="text-xl font-bold text-primary">
                  #{orderNumber}
                </p>
              </CardContent>
            </Card>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 rounded-full"
              onClick={handleConfirm}
            >
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
