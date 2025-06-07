import { NextResponse } from "next/server";
import Category from "@/dataBase/models/category";
import connectDB from "@/dataBase/dbConnection";
import { Types } from "mongoose";

export const GET = async (request, { params }) => {
  try {
    const { categoryId } = params;

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { error: "Category ID is not valid" },
        { status: 400 }
      );
    }

    await connectDB();
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
};
