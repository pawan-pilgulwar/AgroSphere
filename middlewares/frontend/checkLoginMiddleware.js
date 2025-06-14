import jwt from "jsonwebtoken";

export async function checkLoginMiddleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) return { isValid: false };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { isValid: true, user: decoded };
  } catch (err) {
    return { isValid: false };
  }
}