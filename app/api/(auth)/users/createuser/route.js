import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import User from "@/dataBase/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();
    const userData = await request.json();

    let user = await User.findOne({ email: userData.email });
    if (user) {
      return NextResponse.json(
        { error: "Sorry a user with this email already exists" },
        { status: 404 }
      );
    }
    user = await User.findOne({ username: userData.username });

    if (user) {
      return NextResponse.json(
        { error: "Sorry a user with this username already exists" },
        { status: 404 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(userData.password, salt);

    userData.password = secPass;
    user = await User.create(userData);
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    const cookiesStore = await cookies();
    cookiesStore.set("token", authToken, {
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
    return NextResponse.json(
      { message: "User created successfully", authToken: authToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
