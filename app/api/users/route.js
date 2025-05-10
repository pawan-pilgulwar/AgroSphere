import connectToMongo from "@/dataBase/connectDB";
import { NextResponse } from "next/server";
import User from "@/model/user";

export async function GET(req, res) {
  try {
    await connectToMongo();
    const newUser = new User({ name: "pawan", email: "pawan@gmail.com" });
    await newUser.save();
    return NextResponse.json({ newUser, success: true, data: "yes" });
  } catch (err) {
    console.log(err);
  }
}
