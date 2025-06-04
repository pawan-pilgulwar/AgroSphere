import { NextResponse } from "next/server";
import Category from "@/dataBase/models/category";
import connectDB from "@/dataBase/dbConnection";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    if (!name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const category = await Category.findOne({ name: name });
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
