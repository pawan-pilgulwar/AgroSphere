"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserDropdownMenu from "@/components/UserDropdownMenu";

const Navbar = (props) => {
  const [UserDropdownDisplay, setUserDropdownDisplay] = useState("hidden");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
      setIsLogin(true);
    }
    window.addEventListener("scroll", () => {
      setUserDropdownDisplay("hidden");
    });
  });

  const showUserDropdown = () => {
    if (UserDropdownDisplay === "hidden") {
      setUserDropdownDisplay("block");
    } else {
      setUserDropdownDisplay("hidden");
    }
  };

  return (
    <>
      <nav className="bg-gray-900 text-white pt-1 w-full">
        {/* Top Section */}
        <section className="flex items-center justify-between bg-gray-900 text-white px-5">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 py-3">
              <div className="flex justify-center items-center mr-5">
                <img
                  src="/logo/shopLogo.png"
                  alt="Logo"
                  className="h-8 w-8 md:h-10 md:w-10"
                />
                <span className="text-xl md:text-2xl pl-3 font-bold">
                  AgroSphere
                </span>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex items-center justify-center bg-gray-800 rounded-md">
            <div className="pr-2 border-1 border-gray-500 text-lg rounded-l-lg py-1 pl-1">
              <select
                name=""
                id=""
                className="bg-gray-800 font-bold text-white outline-none text-center"
              >
                <option value="">All categories</option>
                <option value="">Seeds & Plants</option>
                <option value="">Farming Tools</option>
                <option value="">Fertilizers</option>
                <option value="">Pest Control</option>
                <option value="">Irrigation</option>
                <option value="">Greenhouse</option>
                <option value="">Livestock</option>
                <option value="">Home & Garden</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search for farming products..."
              className="bg-gray-800 border-1 border-gray-500 text-white text-lg outline-none px-4 py-1 w-4xs"
            />
            <button className="px-2 py-1 border-1 border-gray-500 rounded-r-lg bg-blue-700">
              <img className="h-7 w-7" src="/logo/search.png" alt="" />
            </button>
          </div>

          {/* Cart and Profile Icons */}
          <div className="flex justify-center items-center">
            <button className="flex justify-center items-center hover:border-1 hover:border-gray-500 rounded-lg mx-1 hover:bg-gray-800 p-2">
              <div className="relative">
                <img className="h-7 w-7" src="/logo/favorite.png" alt="" />
                <span className="absolute -top-1 -right-1.5 bg-red-500 px-1 text-xs rounded-full">
                  0
                </span>
              </div>
              <span className="px-2">Favorites</span>
            </button>

            <Link href="/shopping-cart">
              <button className="flex justify-center items-center hover:border-1 hover:border-gray-500 rounded-lg mx-1 hover:bg-gray-800 p-2">
                <div className="relative">
                  <img className="h-7 w-7" src="/logo/cart.png" alt="" />
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 px-1 text-xs rounded-full">
                    3
                  </span>
                </div>
                <span className="flex px-2 justify-center items-center">
                  MY Cart{" "}
                  {/* <img className="pl-2" src="./logo/angle-down.png" alt="" /> */}
                </span>
              </button>
            </Link>

            <button
              className="flex justify-center items-center hover:border-1 hover:border-gray-500 rounded-lg mx-1 hover:bg-gray-800 p-2"
              onClick={showUserDropdown}
              onBlur={() =>
                setTimeout(() => setUserDropdownDisplay("hidden"), 600)
              }
            >
              <div className="h-7 w-7">
                <img src="/logo/user.png" alt="" />
              </div>
              <span className="flex px-2 justify-center items-center">
                {/* {isLogin ? "MY Account" : "Sign in"} */}
                MY Account
              </span>
            </button>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="flex justify-around items-center bg-gray-800 py-1">
          <div className="flex justify-center space-x-4 text-lg">
            <Link
              href="/"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Home
            </Link>
            <Link
              href="/lease-market"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Lease Market
            </Link>
            <Link
              href="/category/seeds-and-plants"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Seeds & Plants
            </Link>
            <Link
              href="/category/farming-tools"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Farming Tools
            </Link>
            <Link
              href="/category/fertilizers"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Fertilizers
            </Link>
            <Link
              href="/category/pest-control"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Pest Control
            </Link>
            <Link
              href="/category/irrigation"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Irrigation
            </Link>
            <Link
              href="/category/livestock"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Livestock
            </Link>
            <Link
              href="/category/home-garden"
              className="hover:border-1 hover:border-gray-500 hover:bg-gray-700 rounded-lg px-2"
            >
              Home & Garden
            </Link>
          </div>

          <div className="flex justify-center items-center">
            <img className="h-7 w-7" src="/logo/location.png" alt="" />
            <span className="pl-2 font-bold text-lg">
              Deliver to: United States
            </span>
          </div>
        </section>
      </nav>

      {/* user dropdown menu */}
      <div id="userDropdown" className={`${UserDropdownDisplay}`}>
        <UserDropdownMenu isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </>
  );
};

export default Navbar;
