// i have to work here

"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAlert } from "@/context/AlertContext";
import UploadImages from "@/components/UploadImages";
import cookie from "js-cookies";

const AddProductPage = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories/getallcategories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.getItem("token")}`,
        },
      });

      if (response.status == 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showAlert("error", "Failed to fetch categories");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const uploadOnCloud = async () => {
    for (const file of imageFiles) {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      formData.images.push(response.data.secure_url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = cookie.getItem("token");
      if (!token) {
        showAlert("error", "Please login to add a product");
        router.push("/login");
        return;
      }

      await uploadOnCloud();

      // Validate form data
      if (!formData.name || imageFiles.length === 0) {
        showAlert(
          "error",
          "Please fill in all fields and upload at least one image."
        );
        return;
      }

      const response = await axios.post(
        "/api/products/createproduct",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showAlert("success", "Product added successfully!");
        router.push("/products");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      showAlert(
        "error",
        error.response?.data?.error || "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-green-50 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
      >
        <div className="space-y-6">
          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
            />
          </div>

          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="transition-all duration-300 transform hover:scale-[1.01]">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
              />
            </div>

            <div className="transition-all duration-300 transform hover:scale-[1.01]">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
              />
            </div>
          </div>

          <div className="transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
            </div>

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
            >
              <option className="px-3 py-1.5" value="">
                Select a category
              </option>
              {categories.map((category) => (
                <option
                  className="px-3 py-1.5"
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Product Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              required
              multiple
              accept="image/*"
              className="mt-1 block text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-white file:text-green-700
              hover:file:bg-green-400
              transition-all duration-300"
            />
            <UploadImages loading={loading} />
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {formData.images.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
