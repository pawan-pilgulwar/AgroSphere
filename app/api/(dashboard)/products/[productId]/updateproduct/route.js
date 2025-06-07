import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import Category from "@/dataBase/models/category";
import Product from "@/dataBase/models/product";
import User from "@/dataBase/models/user";
import { Types } from "mongoose";

export const PATCH = async (request, { params }) => {
  try {
    const { productId } = await params;
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Product ID is not valid" },
        { status: 400 }
      );
    }

    const data = await request.json();
    if (!data.user || !Types.ObjectId.isValid(data.user)) {
      return NextResponse.json(
        { error: "Invalid or missing user ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(data.user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    let product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

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

    data.category = category.id;
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
