"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Business Information
    businessName: "",
    businessType: "individual", // individual, company, cooperative
    taxId: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",

    // Farm Information
    farmSize: "",
    farmLocation: "",
    farmingExperience: "",
    primaryProducts: [], // Array of selected product categories

    // Additional Information
    certifications: [], // Array of selected certifications
    preferredPaymentMethods: [], // Array of selected payment methods
    agreeToTerms: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState({});

  const productCategories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Meat",
    "Poultry",
    "Eggs",
    "Honey",
    "Herbs",
    "Flowers",
    "Organic Products",
    "Processed Foods",
  ];

  const certificationOptions = [
    "Organic",
    "GAP (Good Agricultural Practices)",
    "HACCP",
    "Fair Trade",
    "Rainforest Alliance",
    "None",
  ];

  const paymentMethods = [
    "Credit Card",
    "Bank Transfer",
    "Cash on Delivery",
    "Mobile Payment",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const validateForm = (formData) => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one uppercase letter";
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one lowercase letter";
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one number";
      } else if (!/[!@#$%^&*]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one special character (!@#$%^&*)";
      }
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Business information validation
    if (!formData.businessName) {
      newErrors.businessName = "Business name is required";
    }
    if (!formData.businessAddress) {
      newErrors.businessAddress = "Business address is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.zipCode) {
      newErrors.zipCode = "ZIP code is required";
    } else {
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (!zipRegex.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid ZIP code";
      }
    }

    // // Farm information validation
    // if (formData.farmSize && isNaN(formData.farmSize)) {
    //   newErrors.farmSize = "Farm size must be a number";
    // }
    // if (formData.farmingExperience && isNaN(formData.farmingExperience)) {
    //   newErrors.farmingExperience = "Farming experience must be a number";
    // }

    // // Primary products validation
    // if (formData.primaryProducts.length === 0) {
    //   newErrors.primaryProducts = "Please select at least one product category";
    // }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/api/users/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Registration failed" });
        return;
      }

      router.push("/");
    } catch (error) {
      setErrors({ submit: "An error occurred during registration" });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src="/logo/shopLogo.png"
              alt="AgroSphere Logo"
              width={60}
              height={60}
              className="h-16 w-16"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join AgroSphere Marketplace
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Register your farm or agricultural business to start selling
          </p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={handleChange}
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.businessName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="businessType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option value="individual">Individual/Sole Proprietor</option>
                  <option value="company">Company</option>
                  <option value="cooperative">Cooperative</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="taxId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tax ID / EIN
                </label>
                <input
                  id="taxId"
                  name="taxId"
                  type="text"
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your tax ID/EIN"
                  value={formData.taxId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="businessAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Business Address
                </label>
                <input
                  id="businessAddress"
                  name="businessAddress"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your business address"
                  value={formData.businessAddress}
                  onChange={handleChange}
                />
                {errors.businessAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.businessAddress}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your zip code"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Farm Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Farm Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="farmSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Farm Size (acres)
                </label>
                <input
                  id="farmSize"
                  name="farmSize"
                  type="number"
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your farm size"
                  value={formData.farmSize}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="farmLocation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Farm Location
                </label>
                <input
                  id="farmLocation"
                  name="farmLocation"
                  type="text"
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your farm location"
                  value={formData.farmLocation}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="farmingExperience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years of Farming Experience
                </label>
                <input
                  id="farmingExperience"
                  name="farmingExperience"
                  type="number"
                  className="mt-1 appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter your farming experience"
                  value={formData.farmingExperience}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Products
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {productCategories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`product-${category}`}
                      checked={formData.primaryProducts.includes(category)}
                      onChange={() =>
                        handleMultiSelect("primaryProducts", category)
                      }
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`product-${category}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              {errors.primaryProducts && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.primaryProducts}
                </p>
              )}
            </div>
          </div>

          {/* Certifications and Payment Methods */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Additional Information
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {certificationOptions.map((cert) => (
                  <div key={cert} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cert-${cert}`}
                      checked={formData.certifications.includes(cert)}
                      onChange={() => handleMultiSelect("certifications", cert)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`cert-${cert}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {cert}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Payment Methods
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {paymentMethods.map((method) => (
                  <div key={method} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`payment-${method}`}
                      checked={formData.preferredPaymentMethods.includes(
                        method
                      )}
                      onChange={() =>
                        handleMultiSelect("preferredPaymentMethods", method)
                      }
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`payment-${method}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {method}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-green-600 hover:text-green-500"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
              )}

              <div className="flex items-center">
                <input
                  id="marketingConsent"
                  name="marketingConsent"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                />
                <label
                  htmlFor="marketingConsent"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to receive marketing communications from AgroSphere
                </label>
              </div>
            </div>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600 text-center">{errors.submit}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
