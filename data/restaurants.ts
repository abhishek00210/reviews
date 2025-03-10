import type { Restaurant } from "@/types/restaurant"

const restaurantImageUrl =
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ef/8a/d2/indulge-in-the-art-of.jpg?w=600&h=-1&s=1"

export const restaurantsData: Restaurant[] = [
  {
    id: "lucky9",
    name: "Lucky 9 Family Restaurant",
    rating: 4.7,
    reviewCount: 2500,
    priceRange: [200, 400],
    cuisine: "Family-friendly",
    distance: 800,
    address:
      "Badshahpur Sohna Rd Hwy, near Omaxe City Mall, Block S, Uppal Southend, Sector 49, Gurugram, Haryana 122018",
    location: "Gurugram Haryana",
    features: [
      "Dine-in",
      "Kerbside pickup",
      "No-contact delivery",
      "Has all you can eat",
      "Has outdoor seating",
      "Has fireplace",
    ],
    images: [restaurantImageUrl, restaurantImageUrl, restaurantImageUrl, restaurantImageUrl],
    isOpen: true,
    hours: "Open 24 hours",
    phone: "093100 10202",
    reviews: [
      {
        id: "review1",
        userName: "K",
        userInitial: "K",
        rating: 5,
        text: "Good service and good behaviour of service guy and food is also tasty.",
        date: "2023-01-15T12:00:00Z",
      },
      {
        id: "review2",
        userName: "Rahul",
        userInitial: "R",
        rating: 2,
        text: "I ordered honey chilly potato, paneer do pyaja and butter naan and butter roll.",
        date: "2023-02-20T15:30:00Z",
      },
      {
        id: "review3",
        userName: "Priya",
        userInitial: "P",
        rating: 5,
        text: "Mouth melting snacks, tasty food, Well trained staff, exelant service.",
        date: "2023-03-05T18:45:00Z",
      },
    ],
  },
  {
    id: "shriram",
    name: "Shriram Dhaba",
    rating: 4.1,
    reviewCount: 25000,
    priceRange: [200, 400],
    cuisine: "North Indian",
    distance: 750,
    address: "CD Chowk, Opposite Omaxe Mall, Badshahpur, Sector 49, Gurugram, Haryana 122018",
    location: "Gurugram Haryana",
    features: ["Street-side place for mixed fare"],
    images: [restaurantImageUrl, restaurantImageUrl, restaurantImageUrl],
    isOpen: true,
    hours: "8 AM - 11 PM",
    phone: "098765 43210",
    reviews: [
      {
        id: "review1",
        userName: "Amit",
        userInitial: "A",
        rating: 4,
        text: "Great food at affordable prices. The dal makhani is excellent.",
        date: "2023-01-10T14:20:00Z",
      },
      {
        id: "review2",
        userName: "Sneha",
        userInitial: "S",
        rating: 5,
        text: "Authentic North Indian taste. Loved the butter chicken and naan.",
        date: "2023-02-15T19:30:00Z",
      },
    ],
  },
  {
    id: "tparatha",
    name: "T Paratha",
    rating: 4.8,
    reviewCount: 52,
    priceRange: [1, 200],
    cuisine: "Restaurant",
    distance: 54,
    address: "466, opposite Balaji PG",
    location: "Gurugram Haryana",
    features: ["Veg-only"],
    images: [restaurantImageUrl, restaurantImageUrl],
    isOpen: true,
    hours: "7 AM - 10 PM",
    phone: "099876 54321",
    reviews: [
      {
        id: "review1",
        userName: "Vikram",
        userInitial: "V",
        rating: 5,
        text: "Best parathas in town! Must try the aloo and gobi parathas.",
        date: "2023-03-01T12:15:00Z",
      },
    ],
  },
  {
    id: "zoca",
    name: "ZOCA Diner",
    rating: 4.6,
    reviewCount: 128,
    priceRange: [300, 600],
    cuisine: "Grill",
    distance: 600,
    address: "GF001,Ground Floor, JMD MEGAPOLIS, Badshahpur, Sector 48, Gurugram, Haryana 122018",
    location: "Gurugram Haryana",
    features: ["Dine-in", "Drive-through", "No-contact delivery"],
    images: [restaurantImageUrl, restaurantImageUrl],
    isOpen: false,
    hours: "11 AM - 11 PM",
    phone: "099988 77766",
    reviews: [
      {
        id: "review1",
        userName: "Deepak",
        userInitial: "D",
        rating: 4,
        text: "Great ambiance and tasty food. A bit pricey though.",
        date: "2023-02-25T20:30:00Z",
      },
    ],
  },
  {
    id: "maddys",
    name: "Maddy's kitchen",
    rating: 4.8,
    reviewCount: 106,
    priceRange: [1, 400],
    cuisine: "Indian",
    distance: 450,
    address: "Sector 50, Gurugram, Haryana 122018",
    location: "Gurugram Haryana",
    features: ["Dine-in", "Takeaway"],
    images: [restaurantImageUrl, restaurantImageUrl],
    isOpen: true,
    hours: "10 AM - 10 PM",
    phone: "088877 66655",
    reviews: [
      {
        id: "review1",
        userName: "Neha",
        userInitial: "N",
        rating: 5,
        text: "Homely food with amazing taste. The thalis are worth trying.",
        date: "2023-01-05T13:45:00Z",
      },
    ],
  },
]

