"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function LeaseCategoryPage() {
  const { category } = useParams();
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/lease/category/${category}/getleases`);
        setLeases(response.data.leases || []);
      } catch (error) {
        setLeases([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeases();
  }, [category]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category} Leases</h1>
      {leases.length === 0 ? (
        <p className="text-gray-600">No leases found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leases.map((lease) => (
            <Link key={lease._id} href={`/lease-market/${category}/${lease._id}`} className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              {lease.images && lease.images.length > 0 && (
                <img src={lease.images[0]} alt={lease.title} className="w-full h-40 object-cover rounded mb-4" />
              )}
              <h2 className="text-xl font-semibold mb-2">{lease.title}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{lease.description}</p>
              <div className="text-green-700 font-bold mb-1">₹{lease.price}</div>
              <div className="text-sm text-gray-500">Location: {lease.location}</div>
              <div className="text-xs text-gray-400 mt-2">Available: {new Date(lease.availableFrom).toLocaleDateString()} - {new Date(lease.availableTo).toLocaleDateString()}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 