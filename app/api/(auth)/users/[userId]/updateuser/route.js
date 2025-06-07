import { NextResponse } from "next/server";
import { z } from "zod";
import User from "@/dataBase/models/user";
import connectDB from "@/dataBase/dbConnection";
import { Types } from "mongoose";

export async function PATCH(request, { params }) {
  try {
    const { userId } = await params;
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing user ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User can not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
