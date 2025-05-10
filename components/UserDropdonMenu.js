"use client";
import Link from "next/link";
import React, { useState } from "react";

const UserDropdonMenu = () => {
  return (
    <div>
      <div className="flex flex-col px-6">
        <div className="flex items-center py-3">
          <img src="/logo/user.png" alt="" />
          {/* <div className="flex flex-col pl-5 text-lg">
            <span className="h-6 w-6 mb-1">Name</span>
            <span className="text-gray-400">Email</span>
          </div> */}
          <div className="flex gap-3 pl-5 text-lg">
            <Link href="/login">
              <button className="border-1 px-2 py-1 rounded-xl bg-blue-800">
                Login
              </button>
            </Link>
            <button className="border-1 px-2 py-1 rounded-xl bg-blue-800">
              Sign Up
            </button>
          </div>
        </div>

        <div className="bg-white h-1 opacity-20"></div>

        <div className="flex flex-col py-3 text-xl space-y-1">
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">Acoount</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="/shopping-cart">My Orders</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">My Lists</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">My Wallet</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">Favourites Items</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">Voctures and gift cards</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">Service</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">My Reviews</Link>
          </div>
          <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <Link href="#">Subscriptions</Link>
          </div>
          {/* <div className="hover:bg-gray-500 px-2 py-1 rounded-md">
            <button className="border-1 px-2 py-1 rounded-xl bg-red-800">
              Logout
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserDropdonMenu;
