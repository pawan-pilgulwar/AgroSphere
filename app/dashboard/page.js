"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Bell,
  Settings,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Sprout,
  Tractor,
  Droplets,
  Sun,
  Cloud,
  CloudRain,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    rainfall: 12,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: "Total Sales",
      value: "₹45,680",
      change: "+12.5%",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Products Listed",
      value: "24",
      change: "+3",
      icon: Package,
      color: "blue",
    },
    {
      title: "Orders Pending",
      value: "8",
      change: "-2",
      icon: ShoppingCart,
      color: "orange",
    },
    {
      title: "Farm Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "yellow",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Rajesh Kumar",
      product: "Hybrid Tomato Seeds",
      amount: "₹120",
      status: "Delivered",
      date: "2 days ago",
    },
    {
      id: "#ORD-002",
      customer: "Priya Sharma",
      product: "Organic Fertilizer",
      amount: "₹300",
      status: "Processing",
      date: "1 day ago",
    },
    {
      id: "#ORD-003",
      customer: "Amit Patel",
      product: "Drip Irrigation Kit",
      amount: "₹1200",
      status: "Shipped",
      date: "3 hours ago",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Hybrid Tomato Seeds",
      price: "₹120",
      stock: 50,
      image: "🍅",
      category: "Seeds",
    },
    {
      id: 2,
      name: "Organic Compost",
      price: "₹300",
      stock: 100,
      image: "🌱",
      category: "Fertilizers",
    },
    {
      id: 3,
      name: "Drip Irrigation Kit",
      price: "₹1200",
      stock: 20,
      image: "💧",
      category: "Equipment",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-green-600 to-blue-300 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Pawan! 🌾</h2>
            <p className="text-green-100 mb-4">
              Here's what's happening on your farm today
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Sholapur, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">June 25, 2025</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 text-6xl opacity-20">🚜</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Weather Widget */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Today's Weather</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sun className="w-6 h-6" />
                  <span className="text-2xl font-bold">
                    {weatherData.temperature}°C
                  </span>
                </div>
                <div className="text-sm opacity-90">
                  <p>Humidity: {weatherData.humidity}%</p>
                  <p>Rainfall: {weatherData.rainfall}mm</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">{weatherData.condition}</p>
              <p className="text-sm opacity-90">Perfect for farming! 🌱</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "overview", label: "Overview", icon: Home },
                { key: "products", label: "Products", icon: Package },
                { key: "orders", label: "Orders", icon: ShoppingCart },
                { key: "analytics", label: "Analytics", icon: TrendingUp },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.key
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Orders
                  </h3>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-200">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.customer}
                        </p>
                        <p className="text-xs text-gray-500">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {order.amount}
                        </p>
                        <p
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200 transform hover:scale-105 border border-green-200">
                    <Plus className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-green-700">
                      Add Product
                    </span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 transform hover:scale-105 border border-blue-200">
                    <Eye className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-blue-700">
                      View Orders
                    </span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-200 transform hover:scale-105 border border-purple-200">
                    <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-purple-700">
                      Analytics
                    </span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all duration-200 transform hover:scale-105 border border-orange-200">
                    <Settings className="w-8 h-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-orange-700">
                      Settings
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  My Products
                </h3>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors duration-200">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4 text-center">
                      {product.image}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Category: {product.category}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-green-600">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-600">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-700 border border-red-300 rounded-lg transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Order Management
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{order.product}</td>
                        <td className="px-6 py-4 font-semibold text-green-600">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {order.date}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-green-600 hover:text-green-700 transition-colors duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Sales Analytics
                </h3>
                <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">📊 Sales Chart Placeholder</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Product Performance
                </h3>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">
                    📈 Performance Chart Placeholder
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
