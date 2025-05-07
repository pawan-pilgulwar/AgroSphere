"use client"
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Sample product data organized by category
const productsByCategory = {
  "seeds-and-plants": {
    title: "Seeds & Plants",
    description: "High-quality seeds and plants for your farm",
    image: "/images/seeds.jpg",
    subcategories: {
      "vegetable-seeds": {
        name: "Vegetable Seeds",
        products: [
          {
            id: 1,
            name: "Premium Tomato Seeds",
            price: 4.99,
            image: "/images/products/tomato-seeds.jpg",
            description: "High-yield, disease-resistant tomato seeds",
            rating: 4.8,
            reviews: 120,
            stock: 50
          },
          {
            id: 2,
            name: "Organic Carrot Seeds",
            price: 3.99,
            image: "/images/products/carrot-seeds.jpg",
            description: "Certified organic carrot seeds",
            rating: 4.6,
            reviews: 85,
            stock: 30
          }
        ]
      },
      "fruit-plants": {
        name: "Fruit Plants",
        products: [
          {
            id: 3,
            name: "Strawberry Plants",
            price: 8.99,
            image: "/images/products/strawberry.jpg",
            description: "Ever-bearing strawberry plants",
            rating: 4.7,
            reviews: 95,
            stock: 25
          }
        ]
      }
    }
  },
  "fertilizers": {
    title: "Fertilizers",
    description: "Premium fertilizers for optimal plant growth",
    image: "/images/fertilizers.jpg",
    subcategories: {
      "organic-fertilizers": {
        name: "Organic Fertilizers",
        products: [
          {
            id: 4,
            name: "Organic Compost",
            price: 24.99,
            image: "/images/products/compost.jpg",
            description: "Rich organic compost for soil enrichment",
            rating: 4.7,
            reviews: 95,
            stock: 40
          }
        ]
      },
      "chemical-fertilizers": {
        name: "Chemical Fertilizers",
        products: [
          {
            id: 5,
            name: "NPK Fertilizer",
            price: 19.99,
            image: "/images/products/npk.jpg",
            description: "Balanced NPK fertilizer for all plants",
            rating: 4.5,
            reviews: 110,
            stock: 60
          }
        ]
      }
    }
  }
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.slug
  const category = productsByCategory[categorySlug]

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link 
            href="/categories"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    )
  }

  // Flatten all products from all subcategories
  const allProducts = Object.values(category.subcategories).flatMap(
    subcategory => subcategory.products
  )

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
          <p className="text-xl opacity-90 max-w-3xl">{category.description}</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-8">
            {allProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Product Image */}
                  <div className="relative h-64 md:h-48 md:w-48 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.stock < 10 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        Low Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="text-3xl font-bold text-green-600">
                          ${product.price}
                        </span>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Stock and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        In Stock: {product.stock} units
                      </span>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-white py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(productsByCategory).map(([catSlug, cat]) => (
              <Link
                key={catSlug}
                href={`/category/${catSlug}`}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  catSlug === categorySlug
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}