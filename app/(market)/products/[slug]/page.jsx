"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAlert } from "@/context/AlertContext";
import cookies from "js-cookies";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { showAlert } = useAlert();
  const [category, setcategory] = useState({});

  useEffect(() => {
    console.log(params.slug);
    if (!params.slug) {
      console.error("Product slug is missing in the URL parameters.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/api/products/${params.slug}/getproduct`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }

        const data = response.data;
        if (!data || !data.product) {
          throw new Error("Products not found");
        }
        setProduct(data.product);

        try {
          const categoryRespnse = await axios.get(
            `/api/categories/${data.product.category}/getcategory`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setcategory(categoryRespnse.data.category);
        } catch (error) {
          console.log(error);
        }

        setSelectedImage(0); // Reset selected image when product changes
      } catch (error) {
        console.error("Error fetching product:", error);
        if (error.response) {
          // Handle specific error response
          console.error("Error response:", error.response.data.error);
          showAlert(
            "error",
            error.response.data.error || "Failed to fetch product"
          );
        } else if (error.request) {
          // Handle no response from server
          console.error("No response received:", error.request);
          showAlert(
            "error",
            "No response from server. Please try again later."
          );
        } else {
          // Handle other errors
          console.error("Error message:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const addToCart = async (product) => {
    try {
      await axios.post(
        "/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <Link
        href="/products"
        className="inline-block mb-6 text-green-600 hover:text-green-700 transition-colors duration-300"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            {/* Favourite Button */}
            <button
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-3 shadow-md hover:bg-red-100 transition-colors group"
              aria-label="Add to favourites"
            >
              <svg
                className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors"
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
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain px-10"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative h-24 p-2 cursor-pointer rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
                  selectedImage === index ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600">
            ₹{product.price}
          </p>
          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Category: {category?.name}
              </span>
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
            </div>
            {product.featured && (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Featured Product
              </span>
            )}
          </div>

          <button
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
