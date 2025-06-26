import Lease from "@/dataBase/models/lease";
import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { category } = params;
    const leases = await Lease.find({ category }).populate("owner");
    return NextResponse.json({ leases });
  } catch (error) {
    console.error("Error fetching leases by category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 