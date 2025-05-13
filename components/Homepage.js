"use client";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Product Showcase */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-white opacity-75 animate-gradient"></div>
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-8 animate-fade-in">
              <h1 className="text-6xl font-bold text-gray-800 leading-tight transition-all duration-700 hover:scale-105 hover:text-green-700">
                Grow Your Farm with
                <span className="text-green-600"> AgroSphere</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl transition-all duration-500 hover:text-gray-800">
                Premium agricultural products and expert guidance to help your
                farm thrive in the modern age.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg transition-all duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-lg hover:translate-y-[-2px]"
                >
                  Explore Products
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 bg-white text-green-600 border border-green-600 rounded-lg transition-all duration-300 hover:bg-green-50 hover:scale-105 hover:shadow-lg hover:translate-y-[-2px]"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] animate-float">
              <div className="absolute inset-0 bg-green-100 rounded-3xl transform rotate-6 transition-all duration-500 hover:rotate-3"></div>
              <div className="absolute inset-0 bg-green-200 rounded-3xl transform -rotate-6 transition-all duration-500 hover:-rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/farm.jpg"
                  alt="Modern Farming"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 transition-all duration-500 hover:scale-105 hover:text-green-700">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Seeds & Plants",
                image: "/images/seeds-and-plants.png",
                description:
                  "High-quality seeds and healthy plants for your farm",
                link: "/category/seeds",
              },
              {
                title: "Fertilizers",
                image: "/images/fertilizers.webp",
                description:
                  "Organic and chemical fertilizers for optimal growth",
                link: "/category/fertilizers",
              },
              {
                title: "Equipment",
                image: "/images/equipment.jpg",
                description: "Modern farming tools and machinery",
                link: "/category/equipment",
              },
              // {
              //   title: "Pest Control",
              //   image: "/images/pest-control.jpg",
              //   description: "Safe and effective pest management solutions",
              //   link: "/category/pest-control",
              // },
              {
                title: "Irrigation",
                image: "/images/irrigation.avif",
                description: "Efficient water management systems",
                link: "/category/irrigation",
              },
              {
                title: "Livestock",
                image: "/images/liveStock.webp",
                description: "Animal feed and care products",
                link: "/category/livestock",
              },
              // {
              //   title: "Organic Farming",
              //   image: "/images/organic.jpg",
              //   description: "Certified organic farming supplies",
              //   link: "/category/organic",
              // },
              {
                title: "Storage Solutions",
                image: "/images/storage.webp",
                description: "Grain and produce storage systems",
                link: "/category/storage",
              },
              // {
              //   title: "Smart Farming",
              //   image: "/images/smart-farming.jpg",
              //   description: "IoT and automation solutions",
              //   link: "/category/smart-farming",
              // },
            ].map((category, index) => (
              <Link
                href={category.link}
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 group-hover:translate-y-[-5px]">
                    {category.title}
                  </h3>
                  <p className="text-white/90 transition-transform duration-300 group-hover:translate-y-[-5px]">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Farmers" },
              { number: "50+", label: "Products" },
              { number: "24/7", label: "Support" },
              { number: "100%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-green-50 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 hover:translate-y-[-5px]"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 transition-all duration-500 hover:scale-105 hover:text-green-700">
            Why Choose AgroSphere?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description:
                  "Only the best agricultural products sourced from trusted suppliers",
                icon: "🌱",
                color: "from-green-400 to-green-500",
              },
              {
                title: "Expert Guidance",
                description:
                  "24/7 support from agricultural experts to help you succeed",
                icon: "👨‍🌾",
                color: "from-yellow-400 to-yellow-500",
              },
              {
                title: "Fast Delivery",
                description: "Quick and reliable delivery to your doorstep",
                icon: "🚚",
                color: "from-blue-400 to-blue-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 hover:translate-y-[-5px] group"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-green-700">
                  {feature.title}
                </h3>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 transition-all duration-500 hover:scale-105 hover:text-green-700">
            What Our Farmers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "AgroSphere has transformed our farming operations. Their products and support are exceptional!",
                author: "John Smith",
                role: "Organic Farmer",
              },
              {
                quote:
                  "The quality of products and customer service is unmatched. Highly recommended!",
                author: "Sarah Johnson",
                role: "Commercial Farmer",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-green-50 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <p className="text-xl text-gray-700 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="font-semibold text-green-700">
                  {testimonial.author}
                </div>
                <div className="text-gray-600">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 transition-all duration-500 hover:scale-105">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of successful farmers who trust AgroSphere for their
            agricultural needs
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/shopping-cart"
              className="px-8 py-4 bg-white text-green-700 rounded-lg transition-all duration-300 hover:bg-green-50 hover:scale-105 hover:shadow-lg hover:translate-y-[-2px] font-semibold"
            >
              Start Shopping
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white rounded-lg transition-all duration-300 hover:bg-white hover:text-green-700 hover:scale-105 hover:shadow-lg hover:translate-y-[-2px] font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
