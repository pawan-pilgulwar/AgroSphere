import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cart from "@/dataBase/models/Cart";
import connectDB from "@/dataBase/dbConnection";

export async function PUT(req) {
  const { productId, quantity } = await req.json();

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

  connectDB();
  const cart = await Cart.findOne({ user: userId });
  if (!cart)
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item)
    return NextResponse.json({ error: "Item not in cart" }, { status: 404 });

  item.quantity = quantity;
  await cart.save();

  return NextResponse.json({ message: "Quantity updated" });
}
