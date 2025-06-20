import Cart from "@/dataBase/models/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.user || !decoded.user.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.user.id;

    await connectDB();
    const cart =
      (await Cart.findOne({ user: userId })) ||
      new Cart({ user: userId, items: [] });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart can not found" },
        { status: 400 }
      );
    }
    await cart.save();
    return NextResponse.json({ message: "Cart is Found", cart });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
};
