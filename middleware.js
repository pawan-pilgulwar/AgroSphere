import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";
import { checkLoginMiddleware } from "./middlewares/frontend/checkLoginMiddleware";

export const config = {
  matcher: ["/api/:path*", "/login", "/register", "/products/create-product"],
};

export default async function middleware(request) {
  // Checking for frontend authentication when routing
  const checkLogin = await checkLoginMiddleware(request);
  if (
    !checkLogin?.isValid &&
    request.nextUrl.pathname.startsWith("/products/create-product")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    checkLogin?.isValid &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Checking for backend authentication when api's are requested
  const authResult = await authMiddleware(request);
  if (
    !authResult?.isValid &&
    !request.nextUrl.pathname.startsWith("/api/users/login") &&
    !request.nextUrl.pathname.startsWith("/api/users/createuser") &&
    !request.nextUrl.pathname.startsWith("/api/products/getproducts") &&
    !/^\/api\/products\/[^\/]+\/getproduct$/.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // if (lrequest.nextUrl.pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/register", request.url));

  // }

  return NextResponse.next();
}
