import { NextResponse } from "next/server";
import User from "@/dataBase/models/user";
import connectDB from "@/dataBase/dbConnection";
import { Types } from "mongoose";

export async function DELETE(request, { params }) {
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

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json(
        { error: "User can not be deleted" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "User Deleted successfully", user: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
