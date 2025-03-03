export interface Restaurant {
  id: string
  name: string
  rating: number
  reviewCount: number
  priceRange: number[]
  cuisine: string
  distance: number
  address: string
  location: string
  features: string[]
  images: string[]
  isOpen: boolean
  hours: string
  phone: string
  reviews: Review[]
}

export interface Review {
  id: string
  userName: string
  userInitial: string
  rating: number
  text: string
  date: string
}

