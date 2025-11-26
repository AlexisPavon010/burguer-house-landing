export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  featured?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
}

export interface OrderCustomer {
  name: string
  phone: string
  address: string
}

export interface OrderPayment {
  cardNumber: string
  cardExpiry: string
  cardCVC: string
}

export interface Order {
  _id?: string
  orderNumber: string
  customer: OrderCustomer
  items: OrderItem[]
  subtotal: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled"
  paymentMethod: "card" | "cash"
  createdAt: Date
  updatedAt: Date
}
