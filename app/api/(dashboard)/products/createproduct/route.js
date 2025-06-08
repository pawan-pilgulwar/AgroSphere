import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import Category from "@/dataBase/models/category";
import Product from "@/dataBase/models/product";
import User from "@/dataBase/models/user";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
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

    await connectDB();
    const user = await User.findById(userId).select("_id");
    if (!user) {
      return NextResponse.json(
        { error: "User can not found" },
        { status: 400 }
      );
    }
    const data = await request.json();
    data.user = user._id;

    let category;
    if (!data.category) {
      category = await Category.create(data.newCategory);
    } else {
      category = await Category.findById(data.category);
    }

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    data.category = category._id;
    delete data.newCategory;

    const product = await Product.create(data);
    category.products.push(product._id);
    await category.save();
    return NextResponse.json(
      { message: "Product is created", product: product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
