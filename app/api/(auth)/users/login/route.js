import { NextResponse } from "next/server";
import { z } from "zod";
import User from "@/dataBase/models/user";
import connectDB from "@/dataBase/dbConnection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = z.object({
  identifier: z
    .string()
    .min(3, { message: "Must be at least 3 characters long" })
    .refine(
      (val) => {
        const isUsername = /^[a-zA-Z0-9_]+$/.test(val);
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          val
        );
        return isUsername || isEmail;
      },
      {
        message: "Must be a valid username or email",
      }
    ),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, { message: "Password must be under 32 characters" })
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/\d/, "Must include a digit")
    .regex(/[^a-zA-Z0-9]/, "Must include a special character"),
});

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const { identifier, password } = validation.data;
    // Check if identifier is email or username
    const isEmail = identifier.includes("@");
    const query = isEmail ? { email: identifier } : { username: identifier };

    // Find user by email or username
    const user = await User.findOne(query);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 404 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    return NextResponse.json(
      { message: "Login successful", authToken: authToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
