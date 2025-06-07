import jwt from "jsonwebtoken";

const validate = (token) => {
  console.log(token);
  //   if (!token) {
  //     return false;
  //   }
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   if (!decoded || !decoded.user.user.id) {
  //     return false;
  //   }
  return true;
};

export const authMiddleware = (request) => {
  const token = request.headers.get("authorization")?.split(" ")[1];

  return { isValid: validate(token) };
};
