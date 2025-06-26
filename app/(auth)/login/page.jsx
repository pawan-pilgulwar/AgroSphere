"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";
import next from "next";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const validateForm = () => {
    const newErrors = {};

    // Identifier validation (username or email)
    if (!formData.identifier) {
      newErrors.identifier = "Username or email is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add your login logic here
    try {
      const response = await axios.post("/api/users/login", {
        identifier: formData.identifier,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      const data = response.data;

      if (response.status !== 200 || !data.authToken) {
        setErrors({ submit: data?.error || "Login failed" });
        showAlert("error", data?.error || "Login failed");
        return;
      }

      setTimeout(() => {
        window.location.reload();
      }, 500);
      router.push("/");
      showAlert("success", "User login successfully.");
    } catch (error) {
      let message = "An unexpected error occurred. Please try again.";

      if (error.response) {
        console.log("Login failed:", error.response.data.error);
        message = error.response.data.error || message;
      } else if (error.request) {
        console.log("No response received:", error.request);
        message = "No response from server. Please try again.";
      } else {
        message = error.message || message;
      }

      setErrors({ submit: message });
      showAlert("error", message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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
            Welcome back to AgroSphere
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="identifier" className="sr-only">
                Username or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Username or Email"
                value={formData.identifier}
                onChange={handleChange}
              />
              {errors.identifier && (
                <p className="mt-1 text-sm text-red-600">{errors.identifier}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600 text-center">{errors.submit}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
            >
              <Image
                src="/logo/google.png"
                alt="Google"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200"
            >
              <Image
                src="/logo/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span className="ml-2">Facebook</span>
            </button>
          </div> */}
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
