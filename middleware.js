import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

export const config = {
  matcher: ["/api/:path*"],
};

export default async function middleware(request) {
  const authResult = await authMiddleware(request);
  if (
    !authResult?.isValid &&
    !request.nextUrl.pathname.startsWith("/api/users/login") &&
    !request.nextUrl.pathname.startsWith("/api/users/createuser") &&
    !request.nextUrl.pathname.startsWith("/api/products/getproducts") &&
    !/^\/api\/products\/[^\/]+\/getproduct$/.test(request.nextUrl.pathname)
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // if (lrequest.nextUrl.pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/register", request.url));

  // }

  return NextResponse.next();
}
