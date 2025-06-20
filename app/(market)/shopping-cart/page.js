"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import cookies from "js-cookies";

const page = () => {
  const [cartItems, setCartItems] = useState([
    // {
    //   id: 1,
    //   name: "Premium Tomato Seeds",
    //   price: 4.99,
    //   image:
    //     "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60",
    //   quantity: 2,
    //   category: "Seeds & Plants",
    //   stock: 50,
    //   unit: "pack",
    //   bestPlantingSeason: "Spring",
    //   organic: true,
    // },
    // {
    //   id: 2,
    //   name: "Organic Compost",
    //   price: 24.99,
    //   image:
    //     "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60",
    //   quantity: 1,
    //   category: "Fertilizers",
    //   stock: 40,
    //   unit: "bag",
    //   weight: "20 lbs",
    //   organic: true,
    // },
    // {
    //   id: 3,
    //   name: "Strawberry Plants",
    //   price: 8.99,
    //   image:
    //     "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=60",
    //   quantity: 3,
    //   category: "Seeds & Plants",
    //   stock: 25,
    //   unit: "plant",
    //   bestPlantingSeason: "Spring",
    //   organic: false,
    // },
  ]);

  const [itemCount, setItemCount] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [Cart, setCart] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/cart/getcart`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.getItem("token")}`,
          },
        });

        const data = response.data.cart;
        setCart(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCart();
  }, []);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        setLoading(true);
        for (const element of Cart.items) {
          const response = await axios.get(
            `/api/products/${element.product}/getproduct`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          response.data.product.quantity = element.quantity;

          const categoryResponse = await axios.get(
            `/api/categories/${response.data.product.category}/getcategory`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          response.data.product.category = categoryResponse.data.category;

          setCartItems((prev) => [...prev, response.data.product]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCartItems();
  }, [Cart]);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity <= 0) return;

    const item = cartItems.find((item) => item._id === id);
    if (!item) return;

    if (newQuantity > item.stock) {
      alert(`Only ${item.stock} ${item.unit}s available in stock`);
      return;
    }

    try {
      const response = await axios.put(
        "/api/cart/update",
        {
          productId: id,
          quantity: newQuantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.getItem("token")}`,
          },
        }
      );

      setCartItems((items) =>
        items.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.log("Failed to update cart item", error);
    }
  };

  // useEffect(() => {
  //   if (Array.isArray(cartItems)) {
  //     const totalCount = cartItems.reduce(
  //       (sum, item) => sum + item.quantity,
  //       0
  //     );
  //     setItemCount(totalCount);
  //   }
  // }, [cartItems]);

  // const updateQuantity = (id, newQuantity) => {
  //   if (newQuantity > 0) {
  //     setCartItems((items) =>
  //       items.map((item) => {
  //         if (item.id === id) {
  //           if (newQuantity <= item.stock) {
  //             return { ...item, quantity: newQuantity };
  //           } else {
  //             alert(`Only ${item.stock} ${item.unit}s available in stock`);
  //             return item;
  //           }
  //         }
  //         return item;
  //       })
  //     );
  //   }
  // };

  // const removeItem = (id) => {
  //   setCartItems((items) => items.filter((item) => item.id !== id));
  // };

  const calculateShipping = () => {
    const baseShipping = 5.99;
    const totalWeight = Array.isArray(cartItems)
      ? cartItems.reduce((sum, item) => {
          const weight = parseFloat(item.weight);
          const quantity = Number(item.quantity) || 0;

          // If weight is a valid number, use it; otherwise default to 1
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

  if (Loading) {
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
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 rounded-lg object-cover"
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
                              onClick={() => removeItem(item._id)}
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
