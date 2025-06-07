import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

export const config = {
  matcher: ["/api/:path*", "/login"],
};

export default function middleware(request) {
  const authResult = authMiddleware(request);
  if (
    !authResult?.isValid &&
    !request.nextUrl.pathname.startsWith("/api/users/login") &&
    !request.nextUrl.pathname.startsWith("/api/users/register")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // if (lrequest.nextUrl.pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/register", request.url));

  // }

  return NextResponse.next();
}
