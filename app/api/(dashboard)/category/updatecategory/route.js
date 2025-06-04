import { NextResponse } from "next/server";
import Category from "@/dataBase/models/category";
import connectDB from "@/dataBase/dbConnection";

export async function PATCH(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");
        if (!name) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const category = await Category.findOne({ name: name })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const body = await request.json();
        const updatedcategory = await Category.findOneAndReplace(user.id, body, { new: true });
        return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
}