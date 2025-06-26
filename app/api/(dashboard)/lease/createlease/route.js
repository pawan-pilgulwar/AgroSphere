import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import Lease from "@/dataBase/models/lease";
import { authMiddleware } from "@/middlewares/api/authMiddleware";

export async function POST(request) {
  try {
    // Apply authentication middleware
    const authResult = await authMiddleware(request);
    if (authResult) {
      return authResult;
    }

    await connectDB();

    const body = await request.json();
    const { title, description, category, price, location, availableFrom, availableTo, images } = body;

    // Validation
    if (!title || !category || !price || !location || !availableFrom || !availableTo || !images || images.length === 0) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Get user ID from the request (set by authMiddleware)
    const userId = request.headers.get("user-id");

    // Create new lease
    const newLease = new Lease({
      title,
      description,
      category,
      price: parseFloat(price),
      location,
      availableFrom: new Date(availableFrom),
      availableTo: new Date(availableTo),
      images,
      owner: userId,
      isAvailable: true,
      createdAt: new Date(),
    });

    const savedLease = await newLease.save();

    return NextResponse.json(
      { 
        message: "Lease created successfully", 
        lease: savedLease 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating lease:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 