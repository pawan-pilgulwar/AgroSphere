"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const categories = [
  {
    title: "Seeds & Plants",
    description: "High-quality seeds and healthy plants for your farm",
    image: "/images/seeds.jpg",
    link: "/category/seeds-and-plants",
    icon: "🌱",
    featured: true,
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Fertilizers",
    description: "Organic and chemical fertilizers for optimal growth",
    image: "/images/fertilizers.jpg",
    link: "/category/fertilizers",
    icon: "💧",
    featured: false,
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Farming Tools",
    description: "Modern farming tools and machinery",
    image: "/images/equipment.jpg",
    link: "/category/farming-tools",
    icon: "🛠️",
    featured: true,
    color: "from-orange-500 to-amber-600"
  },
  {
    title: "Pest Control",
    description: "Safe and effective pest management solutions",
    image: "/images/pest-control.jpg",
    link: "/category/pest-control",
    icon: "🐛",
    featured: false,
    color: "from-red-500 to-pink-600"
  },
  {
    title: "Irrigation",
    description: "Efficient water management systems",
    image: "/images/irrigation.jpg",
    link: "/category/irrigation",
    icon: "💦",
    featured: true,
    color: "from-sky-500 to-blue-600"
  },
  {
    title: "Greenhouse",
    description: "Structures and supplies for controlled farming",
    image: "/images/greenhouse.jpg",
    link: "/category/greenhouse",
    icon: "🏭",
    featured: false,
    color: "from-teal-500 to-emerald-600"
  },
  {
    title: "Livestock",
    description: "Animal feed and care products",
    image: "/images/livestock.jpg",
    link: "/category/livestock",
    icon: "🐄",
    featured: true,
    color: "from-amber-500 to-yellow-600"
  },
  {
    title: "Home & Garden",
    description: "Everything for your home garden",
    image: "/images/home-garden.jpg",
    link: "/category/home-garden",
    icon: "🏡",
    featured: false,
    color: "from-violet-500 to-purple-600"
  }
]

export default function CategoriesPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredCategories = activeFilter === "all" 
    ? categories 
    : activeFilter === "featured" 
      ? categories.filter(cat => cat.featured)
      : categories

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/farm.jpg"
            alt="Farm Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Discover Our Categories
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Explore our comprehensive range of agricultural products and solutions
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeFilter === "all" 
                  ? "bg-white text-green-600" 
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              All Categories
            </button>
            <button 
              onClick={() => setActiveFilter("featured")}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeFilter === "featured" 
                  ? "bg-white text-green-600" 
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Featured
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="relative h-80">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`}></div>
                  <div className="absolute top-4 right-4 text-4xl transform transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-3 transition-transform duration-300 group-hover:translate-y-[-5px]">
                    {category.title}
                  </h3>
                  <p className="text-white/90 transition-transform duration-300 group-hover:translate-y-[-5px]">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-white/90 transition-transform duration-300 group-hover:translate-y-[-5px]">
                    <span className="mr-2">Explore</span>
                    <svg 
                      className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "8+", label: "Categories" },
              { number: "1000+", label: "Products" },
              { number: "24/7", label: "Support" },
              { number: "100%", label: "Quality" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-green-50 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 