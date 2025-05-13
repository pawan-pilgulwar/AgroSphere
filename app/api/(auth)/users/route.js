import { NextResponse } from "next/server";
import dbConnection from "@/dataBase/dbConnection";
import User from "@/dataBase/models/User";


export async function GET(request) {
    try {
        await dbConnection();
        const users = await User.find();
        return NextResponse.json({ users });
    } catch (error) {
        console.log(error);
    }
  return NextResponse.json(users);
}

export async function POST(request) {
    try {
        await dbConnection();
        const body = await request.json();
        const user = await User.create(body);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}
