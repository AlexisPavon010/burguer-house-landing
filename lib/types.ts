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
