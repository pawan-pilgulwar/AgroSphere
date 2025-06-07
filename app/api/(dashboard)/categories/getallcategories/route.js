import { NextResponse } from "next/server";
import Category from "@/dataBase/models/category";
import connectDB from "@/dataBase/dbConnection";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
