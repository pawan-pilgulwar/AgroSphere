"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function LeaseProductPage() {
  const { category, leaseId } = useParams();
  const [lease, setLease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchLease = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/lease/id/${leaseId}/getlease`);
        setLease(response.data.lease || null);
      } catch (error) {
        setLease(null);
      } finally {
        setLoading(false);
      }
    };
    fetchLease();
  }, [leaseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin h-14 w-14 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Loading">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    );
  }

  if (!lease) {
    return <div className="min-h-screen flex items-center justify-center">Lease not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <img
              src={lease.images && lease.images.length > 0 ? lease.images[selectedImage] : "/public/images/farm.jpg"}
              alt={lease.title}
              className="w-full h-full object-cover rounded-xl border-2 border-green-200 shadow-lg"
            />
          </div>
          {lease.images && lease.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {lease.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative h-24 p-2 cursor-pointer rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${selectedImage === idx ? "ring-2 ring-green-500" : ""}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={img}
                    alt={`${lease.title} - Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{lease.title}</h1>
          <p className="text-2xl font-semibold text-green-600">₹{lease.price}</p>
          <div className="space-y-4">
            <p className="text-gray-600">{lease.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Category: {lease.category}</span>
              <span className="text-sm text-gray-500">Location: {lease.location}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Available: {new Date(lease.availableFrom).toLocaleDateString()} - {new Date(lease.availableTo).toLocaleDateString()}</span>
            </div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Owner: {lease.owner?.name || lease.owner?._id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 