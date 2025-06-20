import { NextResponse } from "next/server";
import Product from "@/dataBase/models/product";
import connectDB from "@/dataBase/dbConnection";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    const product =
      (await Product.findOne({ slug: slug })) || (await Product.findById(slug));
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
