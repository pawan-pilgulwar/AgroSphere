"use client"
import { createContext, useContext, useState } from "react"

const ProductContext = createContext()

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Tomato Seeds",
      price: 499,
      image: "/images/seeds-and-plants.png",
      category: "Seeds & Plants",
      stock: 50,
      unit: "pack",
      bestPlantingSeason: "Spring",
      organic: true
    },
    {
      id: 2,
      name: "Organic Compost",
      price: 2499,
      image: "/images/fertilizers.webp",
      category: "Fertilizers",
      stock: 40,
      unit: "bag",
      weight: "20 lbs",
      organic: true
    },
    // Add more products as needed
  ]);

    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider")
    }
    return context
}
