"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const UserDropdonMenu = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <div className="flex flex-col px-6">
        {!isLogin && (
          <Link href="/login">
            <div className="flex items-center py-3 px-2 justify-start">
              <img src="/logo/user.png" alt="" />
              <div className="flex pl-5 text-lg font-bold italic">
                Hello, Sign in
              </div>
            </div>
          </Link>
        )}

        {isLogin && (
          <div className="flex items-center py-3 px-2 justify-start">
            <img src="/logo/user.png" alt="" />
            <div className="flex flex-col pl-5 text-lg">
              <span className="h-6 w-6 mb-1">Name</span>
              <span className="text-gray-400">Email</span>
            </div>
          </div>
        )}

        <div className="bg-white h-1 opacity-20"></div>

        <div className="flex flex-col py-3 text-xl space-y-1">
          <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2">
              <Image width={25} height={10} src="/logo/myAccount.png" alt="" />
              Acoount
            </div>
          </Link>

          <Link href="/shopping-cart">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image width={25} height={10} src="/logo/myOrders.png" alt="" />
              My Orders
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image width={25} height={10} src="/logo/wishlist.png" alt="" />
              My Lists
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image width={25} height={10} src="/logo/myWallet.png" alt="" />
              My Wallet
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image
                width={25}
                height={10}
                src="/logo/favourite-items.png"
                alt=""
              />
              Favourites Items
            </div>
          </Link>

          {/* <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image width={25} height={10} src="/logo/myAccount.png" alt="" />
            Voctures and gift cards
          </div>
          </Link> */}

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image width={25} height={10} src="/logo/service.png" alt="" />
              Service
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image width={25} height={10} src="/logo/myReview.png" alt="" />
              My Reviews
            </div>
          </Link>

          <Link href="#">
            <div className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
              <Image
                width={25}
                height={10}
                src="/logo/subscription.png"
                alt=""
              />
              Subscriptions
            </div>
          </Link>

          {isLogin && (
            <>
              <div className="bg-white h-1 mt-2 opacity-20"></div>

              <div className="hover:bg-gray-500 py-1 rounded-md">
                <button className="hover:bg-gray-500 py-1 rounded-md flex gap-2 items-center">
                  <Image width={25} height={10} src="/logo/logout.png" alt="" />
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

export default UserDropdonMenu;
