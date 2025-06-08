import { NextResponse } from "next/server";
import Product from "@/dataBase/models/product";
import connectDB from "@/dataBase/dbConnection";
import User from "@/dataBase/models/user";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import Category from "@/dataBase/models/category";

export const DELETE = async (request, { params }) => {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
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
    if (!Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400 }
      );
    }

    await connectDB();
    let product = await Product.findOne({ slug: slug });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const productId = product._id;

    console.log(product.user.toString());
    console.log(userId.toString());

    if (userId.toString() !== product.user.toString()) {
      return NextResponse.json(
        { error: "You are not authorized to delete this product" },
        { status: 403 }
      );
    }

    product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product deletion failed" },
        { status: 500 }
      );
    } else {
      const category = await Category.findById(product.category);
      if (category) {
        category.products = category.products.filter(
          (prodId) => !prodId.equals(productId)
        );
        await category.save();
      } else {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
    }

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
