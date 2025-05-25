import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import User from "@/dataBase/models/user";

export async function POST(request) {
    try {
        await connectDB();
        const userData = await request.json();
        
        let user = await User.findOne({email : userData.email})
        if(user){
            return NextResponse.json({error: "Sorry a user with this email already exists"}, { status: 404 })
        }

        user = await User.create(userData);
        await user.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 200})
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
