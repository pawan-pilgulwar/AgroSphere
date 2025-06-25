"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import cookies from "js-cookies";
import { useCart } from "@/context/CartContext";

const page = () => {
  const {
    cartItems,
    cartCount,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCart,
  } = useCart();
  const [deliveryOption, setDeliveryOption] = useState("standard");

  useEffect(() => {
    fetchCart();
  }, [])
  

  const calculateShipping = () => {
    const baseShipping = 5.99;
    const totalWeight = Array.isArray(cartItems)
      ? cartItems.reduce((sum, item) => {
          const weight = parseFloat(item.weight);
          const quantity = Number(item.quantity) || 0;
          if (!isNaN(weight)) {
            return sum + weight * quantity;
          }
          return sum + quantity;
        }, 0)
      : 0;
    if (deliveryOption === "express") {
      return baseShipping * 2;
    }
    return baseShipping + totalWeight * 0.5;
  };

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) =>
          sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
        0
      )
    : 0;
  const tax = subtotal * 0.1; // 10% tax
  const shipping = calculateShipping();
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg
          className="animate-spin h-14 w-14 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Loading"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Farming Cart
          </h2>

          {Array.isArray(cartItems) && cartItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="mb-6">
                <Image
                  src="/logo/myOrders.png"
                  alt="Empty Cart"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start adding farming products to your cart!
              </p>
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {Array.isArray(cartItems) &&
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-32 h-32 rounded-lg object-contain"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {item.description}
                            </p>
                            <p className="text-gray-600 mt-3">
                              Category : {item.category.name}
                            </p>
                          </div>

                          <div className="mt-4 md:mt-0">
                            <p className="text-2xl font-bold text-green-600">
                              ₹{item.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.stock} {item.unit}s in stock
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="text-lg font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-800">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-sm text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700">Delivery Option:</label>
                    <select
                      value={deliveryOption}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="standard">Standard Delivery</option>
                      <option value="express">Express Delivery</option>
                    </select>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ₹{subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        ₹{shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-green-600">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Proceed to Checkout
                  </button>
                  <button className="flex-1 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
