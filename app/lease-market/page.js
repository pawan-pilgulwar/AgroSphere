"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LeaseMarketPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
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
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Lease Market</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find and list agricultural equipment, land, and resources for lease
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Equipment Lease",
                description: "Rent agricultural machinery and tools",
                image: "/images/equipment.jpg",
                link: "/lease-market/equipment"
              },
              {
                title: "Land Lease",
                description: "Find or list agricultural land for lease",
                image: "/images/land.jpg",
                link: "/lease-market/land"
              },
              {
                title: "Storage Lease",
                description: "Rent storage facilities for your produce",
                image: "/images/storage.jpg",
                link: "/lease-market/storage"
              }
            ].map((category, index) => (
              <Link
                key={index}
                href={category.link}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
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

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Flexible Terms",
                description: "Choose from various lease durations and conditions",
                icon: "📅"
              },
              {
                title: "Verified Listings",
                description: "All listings are verified for your safety",
                icon: "✓"
              },
              {
                title: "Secure Payments",
                description: "Safe and secure payment processing",
                icon: "🔒"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer assistance",
                icon: "🔄"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Item?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of agricultural professionals and start leasing today
          </p>
          <Link
            href="/lease-market/list"
            className="inline-block px-8 py-4 bg-white text-green-600 rounded-lg transition-all duration-300 hover:bg-green-50 hover:scale-105 hover:shadow-lg font-semibold"
          >
            List Your Item
          </Link>
        </div>
      </section>
    </main>
  );
} 