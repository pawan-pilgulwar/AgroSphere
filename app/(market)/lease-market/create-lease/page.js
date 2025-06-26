"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAlert } from "@/context/AlertContext";
import UploadImages from "@/components/UploadImages";
import cookie from "js-cookies";

const CreateLeasePage = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    availableFrom: "",
    availableTo: "",
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]);

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
        showAlert("error", "Please login to create a lease");
        router.push("/login");
        return;
      }

      await uploadOnCloud();

      // Validate form data
      if (!formData.title || !formData.category || imageFiles.length === 0) {
        showAlert(
          "error",
          "Please fill in all required fields and upload at least one image."
        );
        return;
      }

      const response = await axios.post("/api/lease/createlease", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        showAlert("success", "Lease created successfully!");
        router.push("/lease-market/all-leases");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error creating lease:", error);
      showAlert(
        "error",
        error.response?.data?.error || "Failed to create lease"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Lease</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-green-50 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
      >
        <div className="space-y-6">
          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Lease Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
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
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
              >
                <option value="">Select Category</option>
                <option value="equipment">Equipment</option>
                <option value="land">Land</option>
                <option value="storage">Storage</option>
              </select>
            </div>

            <div className="transition-all duration-300 transform hover:scale-[1.01]">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (₹) *
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
          </div>

          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="e.g., Mumbai, Maharashtra"
              className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="transition-all duration-300 transform hover:scale-[1.01]">
              <label
                htmlFor="availableFrom"
                className="block text-sm font-medium text-gray-700"
              >
                Available From *
              </label>
              <input
                type="date"
                id="availableFrom"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
              />
            </div>

            <div className="transition-all duration-300 transform hover:scale-[1.01]">
              <label
                htmlFor="availableTo"
                className="block text-sm font-medium text-gray-700"
              >
                Available To *
              </label>
              <input
                type="date"
                id="availableTo"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md bg-white border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-all duration-300 px-3 py-1.5"
              />
            </div>
          </div>

          <div className="transition-all duration-300 transform hover:scale-[1.01]">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images *
            </label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              required
              className="mt-1 block text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-white file:text-green-700
              hover:file:bg-green-400
              transition-all duration-300"
            />
            <p className="mt-1 text-sm text-gray-500">
              <UploadImages loading={loading} />
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Lease"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLeasePage;
