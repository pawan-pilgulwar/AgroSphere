import jwt from "jsonwebtoken";

export async function checkLoginMiddleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log(token)

  if (!token) return { isValid: false };

  return { isValid: true }

  // try {
  //   const decoded = jwt.verify(token?.value, process.env.JWT_SECRET);
  //   return { isValid: true, user: decoded };
  // } catch (err) {
  //   return { isValid: false };
  // }
}