import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";
import { checkLoginMiddleware } from "./middlewares/frontend/checkLoginMiddleware";

export const config = {
  matcher: [
    "/api/:path*", // All API routes
    "/login", // Login page
    "/register", // Register page
    "/products/create-product", // Protected frontend page
    "/lease-market/create-lease", // Protected frontend page
  ],
};

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // ✅ 1. Handle backend API routes authentication (for routes starting with /api/)
  if (pathname.startsWith("/api/")) {
    const authResult = await authMiddleware(request);

    const apiAuthWhitelist = [
      "/api/users/login",
      "/api/users/createuser",
      "/api/products/getproducts",
      "/api/lease/getallleases",
    ];

    const regexWhitelist = [
      /^\/api\/products\/[^\/]+\/getproduct$/, // Single Product API
      /^\/api\/lease\/category\/[^\/]+\/getleases$/, // Lease Category API
      /^\/api\/lease\/id\/[^\/]+\/getlease$/, // Single Lease API
    ];

    const isWhitelisted =
      apiAuthWhitelist.some((path) => pathname.startsWith(path)) ||
      regexWhitelist.some((regex) => regex.test(pathname));

    if (!authResult?.isValid && !isWhitelisted) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  // ✅ 2. Handle frontend routes (login-check for frontend pages)
  const checkLogin = await checkLoginMiddleware(request);

  // If user not logged in, and trying to access a protected frontend page
  if (
    !checkLogin?.isValid &&
    (pathname.startsWith("/products/create-product") ||
      pathname.startsWith("/lease-market/create-lease"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ 3. Prevent logged-in users from going back to login/register
  if (
    checkLogin?.isValid &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ 4. Default: Allow the request
  return NextResponse.next();
}
