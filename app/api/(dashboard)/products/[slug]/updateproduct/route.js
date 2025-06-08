import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import Category from "@/dataBase/models/category";
import Product from "@/dataBase/models/product";
import User from "@/dataBase/models/user";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const PATCH = async (request, { params }) => {
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

    if (userId.toString() !== product.user.toString()) {
      return NextResponse.json(
        { error: "You are not authorized to update this product" },
        { status: 403 }
      );
    }
    // Parse the request body
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }
    const data = await request.json();

    let category;
    if (product.category !== data.category || data.newCategory) {
      category = await Category.findById(product.category);
      category.products = category.products.filter(
        (item) => item.toString() !== product.id.toString()
      );
      await category.save();
    }

    if (data.newCategory) {
      category = await Category.create(data.newCategory);
    } else {
      category = await Category.findById(data.category);
      if (!category) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }
    }

    data.category = category._id;
    delete data.newCategory;

    product = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    category.products.push(product.id);
    await category.save();

    return NextResponse.json(
      { message: "Product updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
