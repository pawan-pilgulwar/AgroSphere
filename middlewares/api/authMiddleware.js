import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const validate = async (token) => {
  if (!token) {
    return { isValid: false, userId: null };
  }
  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!decoded || !decoded.payload.user.id) {
      return { isValid: false, userId: null };
    }

    return { isValid: true, userId: decoded.payload.user.id };
  } catch (error) {
    return { isValid: false, userId: null };
  }
};

export const authMiddleware = async (request) => {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const { isValid, userId } = await validate(token);

  // Add user ID to request headers for use in the route handler
  request.headers.append("user-id", userId);
  return { isValid: true }; // Return null to continue with the request
};
