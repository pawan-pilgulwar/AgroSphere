'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    // Fetch user data here
    // This is a placeholder - implement actual data fetching
    setUserData({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Farmer',
      joinDate: '2024-01-01',
      profileImage: '/default-avatar.png',
      stats: {
        listings: 5,
        leases: 3,
        reviews: 4.5
      }
    });
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'listings', label: 'My Listings' },
    { id: 'leases', label: 'My Leases' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden">
              <Image
                src={userData?.profileImage || '/default-avatar.png'}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userData?.name}</h1>
              <p className="text-gray-600">{userData?.email}</p>
              <p className="text-sm text-gray-500">Member since {userData?.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-indigo-900">Active Listings</h3>
                <p className="text-3xl font-bold text-indigo-600">{userData?.stats.listings}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900">Active Leases</h3>
                <p className="text-3xl font-bold text-green-600">{userData?.stats.leases}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-yellow-900">Average Rating</h3>
                <p className="text-3xl font-bold text-yellow-600">{userData?.stats.reviews}</p>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
              {/* Add listings content here */}
              <p className="text-gray-500">No listings found.</p>
            </div>
          )}

          {activeTab === 'leases' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">My Leases</h2>
              {/* Add leases content here */}
              <p className="text-gray-500">No active leases found.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
              {/* Add reviews content here */}
              <p className="text-gray-500">No reviews found.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={userData?.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={userData?.email}
                  />
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 