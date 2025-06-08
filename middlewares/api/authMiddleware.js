import { jwtVerify } from "jose";

const validate = async (token) => {
  if (!token) {
    return false;
  }
  try {
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!decoded || !decoded.payload.user.id) {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
};

export const authMiddleware = async (request) => {
  const token = request.headers.get("authorization")?.split(" ")[1];
  const isValid = await validate(token);

  return { isValid };
};
