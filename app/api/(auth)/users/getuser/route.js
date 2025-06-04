import { NextResponse } from "next/server";
import User from "@/dataBase/models/user";
import connectDB from "@/dataBase/dbConnection";
import jwt from "jsonwebtoken"

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
}