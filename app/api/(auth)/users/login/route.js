import { NextResponse } from "next/server";
import { z } from "zod";
import User from "@/dataBase/models/user";
import connectDB from "@/dataBase/dbConnection";

const schema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
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
        const userData = await request.json();

        const validation = schema.safeParse(userData);
        if (!validation.success) {    
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });
        }

        const { email, password } = validation.data;
        const user = await User.findOne({ email });
        if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    }
}
