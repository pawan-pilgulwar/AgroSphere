import { NextResponse } from "next/server";
import Category from "@/dataBase/models/category";
import connectDB from "@/dataBase/dbConnection";
import { Types } from "mongoose";

export async function PATCH(request, { params }) {
  try {
    const { categoryId } = await params;
    if (!categoryId || !Types.ObjectId.isValid(categoryId.toString())) {
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

    const body = await request.json();
    const updatedcategory = await Category.findByIdAndUpdate(categoryId, body, {
      new: true,
    });
    return NextResponse.json(
      { message: "Category updated successfully", category: updatedcategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
