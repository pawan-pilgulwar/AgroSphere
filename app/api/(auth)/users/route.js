import connectDB from "@/dataBase/dbConnection";
import User from "@/dataBase/models/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find()
    return NextResponse.json(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};
