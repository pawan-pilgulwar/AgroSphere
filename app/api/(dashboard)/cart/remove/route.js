import Cart from "@/dataBase/models/Cart";
import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    const { productId } = await req.json();

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
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart can not found" },
        { status: 400 }
      );
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // cart.items.filter((item) => item.quantity > 0);

    await cart.save();
    return NextResponse.json({ message: "Cart updated", cart, removedItem });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
};
