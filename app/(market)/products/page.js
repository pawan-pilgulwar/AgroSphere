"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";
import cookies from "js-cookies";
import { useCart } from "@/context/CartContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showAlert } = useAlert();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/getproducts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }

        const data = response.data;
        if (!data || !data.products) {
          throw new Error("Products not found");
        }

        if (data.products.length === 0) {
          throw new Error("No products available");
        }
        setProducts(data.products);
      } catch (error) {
        console.log("Error fetching products:", error);
        if (error.response) {
          showAlert(
            "error",
            error.response.data.error || "Failed to fetch products"
          );
        } else {
          showAlert("error", error.message || "An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // const addToCart = async (product) => {
  //   try {
  //     await axios.post(
  //       "/api/cart/add",
  //       {
  //         productId: product._id,
  //         quantity: 1,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies.getItem("token")}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
      <div className="flex flex-col gap-15">
        {products.map((product, idx) => (
          <div
            key={product._id}
            style={{
              animation: `fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${
                idx * 0.08
              }s both`,
            }}
            className="opacity-0 transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="bg-white/90 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col md:flex-row items-center border border-green-200 relative">
              {/* Favourite Button */}
              <button
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition-colors group"
                aria-label="Add to favourites"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </button>
              <Link href={`/products/${product.slug}`}>
                {/* Image section */}
                <div className="relative h-50 w-48 flex-shrink-0 flex items-center justify-center bg-gray-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full px-5 h-full object-contain"
                  />
                </div>
              </Link>

              {/* Text section */}
              <div className="p-6 flex-1 flex flex-col justify-between w-full">
                <Link href={`/products/${product.slug}`}>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-green-700">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </Link>

                <Link href={`/products/${product.slug}`}>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
                      ></path>
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
