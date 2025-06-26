"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useAlert } from "@/context/AlertContext";
import axios from "axios";
import cookie from "js-cookies";

const UserDropdownMenu = (props) => {
  const { showAlert } = useAlert();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const res = await axios.get(`/api/users/getuser/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${cookie.getItem("token")}`,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
      if (!res.data || !res.data.user) {
        throw new Error("User data not found");
      }
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response) {
        showAlert("error", "Failed to fetch user data");
      } else if (error.request) {
        showAlert("error", "No response received from the server");
      } else {
        showAlert("error", "An unexpected error occurred");
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    cookie.removeItem("token");
    props.setIsLogin(false);
    setUser(null);
    showAlert("success", "logout successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div
      className={`overflow-hidden fixed top-17 right-0 z-50 ${
        props.isLogin ? "w-64" : ""
      } rounded-xl bg-gray-700 text-white shadow-lg transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col px-6">
        {!props.isLogin && (
          <Link href="/login">
            <div className="flex items-center py-3 px-2 justify-start">
              <img src="/logo/profile.png" className="h-12 w-12" alt="" />
              <div className="flex pl-5 text-lg font-bold italic">Sign in</div>
            </div>
          </Link>
        )}

        {props.isLogin && (
          <Link href="/dashboard">
            <div className="flex items-center py-3 px-2 justify-start">
              <img src="/logo/profile.png" className="h-12 w-12" alt="" />
              <div className="flex flex-col pl-5 text-lg">
                <span className="h-6 w-6 mb-1 whitespace-nowrap">
                  {user
                    ? user.name.split(" ").length >= 3
                      ? `${user.name.split(" ")[0]} ${user.name.split(" ")[2]}`
                      : user.name
                    : "User Name"}
                </span>
                <span className="text-gray-400">
                  {user ? user.username : "Email"}
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="bg-white h-1 opacity-20"></div>

        <div className="flex flex-col py-3 text-xl space-y-1">
          <Link href="#">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Account
            </div>
          </Link>

          <Link href="/shopping-cart">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              My Orders
            </div>
          </Link>

          <Link href="/dashboard/products">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="14" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
              </svg>
              Your Products
            </div>
          </Link>

          <Link href="/products/create-product">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
              Create Product
            </div>
          </Link>

          <Link href="/lease-market/create-lease">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
                <path d="M3 7h18M3 11h18M3 15h18M3 19h18" />
              </svg>
              Create Lease
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              My Lists
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              My Wallet
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              Favourites Items
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Service
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              My Reviews
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Subscriptions
            </div>
          </Link>

          {props.isLogin && (
            <>
              <div className="bg-white h-1 mt-2 opacity-20"></div>

              <div className="hover:bg-gray-500 py-1 rounded-md">
                <button
                  className="hover:bg-gray-500 py-1 px-1 rounded-md flex gap-2 items-center"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDropdownMenu;
