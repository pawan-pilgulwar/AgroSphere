import { NextResponse } from "next/server";
import Product from "@/dataBase/models/product";
import connectDB from "@/dataBase/dbConnection";
import User from "@/dataBase/models/user";
import { Types } from "mongoose";

export const DELETE = async (request, { params }) => {
  try {
    const { productId } = await params;
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Product ID is not valid" },
        { status: 400 }
      );
    }
    console.log(productId);

    await connectDB();
    let product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const user = await User.findById(product.user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.id.toString() !== product.user.toString()) {
      return NextResponse.json(
        { error: "You are not authorized to delete this product" },
        { status: 403 }
      );
    }

    product = await Product.findByIdAndDelete(productId);
    return NextResponse.json(
      { message: "Product deleted successfully", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
