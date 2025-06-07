import { NextResponse } from "next/server";
import Product from "@/dataBase/models/product";
import connectDB from "@/dataBase/dbConnection";

export const GET = async (request) => {
    try {
        await connectDB();
        const products = await Product.find()
        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}