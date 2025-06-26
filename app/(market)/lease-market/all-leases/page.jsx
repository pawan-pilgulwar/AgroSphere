"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useAlert } from "@/context/AlertContext";
import { useCart } from "@/context/CartContext";

const AllLeasesPage = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { showAlert } = useAlert();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchLeases();
  }, []);

  const fetchLeases = async () => {
    try {
      const response = await axios.get("/api/lease/getallleases");
      if (response.status === 200) {
        setLeases(response.data.leases);
      }
    } catch (error) {
      console.error("Error fetching leases:", error);
      showAlert("error", "Failed to fetch leases");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (lease) => {
    addToCart({
      id: lease._id,
      name: lease.title,
      price: lease.price,
      image: lease.images[0],
      type: "lease",
      category: lease.category,
    });
    showAlert("success", "Added to cart!");
  };

  const filteredLeases = leases.filter((lease) => {
    const matchesSearch =
      lease.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || lease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Lease Listings
          </h1>
          <p className="text-gray-600 text-lg">
            Discover agricultural equipment, land, and storage facilities
            available for lease
          </p>
        </div>
      </div> */}

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="equipment">Equipment</option>
                <option value="land">Land</option>
                <option value="storage">Storage</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredLeases.length} of {leases.length} lease listings
          </p>
        </div>

        {/* Lease Grid */}
        {filteredLeases.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No leases found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLeases.map((lease) => (
              <div
                key={lease._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <Link href={`/lease-market/${lease.category}/${lease._id}`}>
                  <div className="relative h-48">
                    <img
                      src={lease.images[0] || "/images/default-lease.jpg"}
                      alt={lease.title}
                      fill="true"
                      className="object-cover hover:scale-105 w-70 h-50 p-2 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full capitalize">
                        {lease.category}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/lease-market/${lease.category}/${lease._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                      {lease.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {lease.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {lease.location}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(lease.availableFrom)} -{" "}
                    {formatDate(lease.availableTo)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-600">
                      ₹{lease.price.toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleAddToCart(lease)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLeasesPage;
