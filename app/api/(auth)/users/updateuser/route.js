import { NextResponse } from "next/server";
import { z } from "zod";
import User from "@/dataBase/models/user";
import connectDB from "@/dataBase/dbConnection";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function PATCH(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const body = await request.json();
        const updatedUser = await User.findByIdAndUpdate(user.id, body, { new: true });
        return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
}
