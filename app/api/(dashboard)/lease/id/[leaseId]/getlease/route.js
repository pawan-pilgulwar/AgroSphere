import Lease from "@/dataBase/models/lease";
import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { leaseId } = params;
    const lease = await Lease.findById(leaseId).populate("owner");
    if (!lease) {
      return NextResponse.json(
        { error: "Lease not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ lease });
  } catch (error) {
    console.error("Error fetching lease by ID:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 