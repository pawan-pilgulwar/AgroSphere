import { jwtVerify } from "jose";

export async function checkLoginMiddleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) return { isValid: false };

  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!decoded || !decoded.payload.user.id) {
      return { isValid: false };
    }

    return { isValid: true, userId };
  } catch (error) {
    return { isValid: false };
  }
}
