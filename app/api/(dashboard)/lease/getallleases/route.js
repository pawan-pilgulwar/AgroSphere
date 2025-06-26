import Lease from "@/dataBase/models/lease";
import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";

export async function GET() {
  try {
    await connectDB();
    const leases = await Lease.find().populate("owner");
    return NextResponse.json({ leases });
  } catch (error) {
    console.error("Error fetching leases:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 