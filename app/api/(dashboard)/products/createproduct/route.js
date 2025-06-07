import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import Category from "@/dataBase/models/category";
import Product from "@/dataBase/models/product";
import User from "@/dataBase/models/user";
import { Types } from "mongoose";

export const POST = async (request) => {
    try {
        // const token = localStorage.getItem("token");
        const data = await request.json()
        
        // if (!token) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }
        
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decoded.user.id;

        if(!data.user || !Types.ObjectId.isValid(data.user)){
            return NextResponse.json({ error: "invalid or missing user ID"}, { status: 400 })
        }

        await connectDB();
        const user = await User.findById(data.user);
        if(!user){
            return NextResponse.json({ error: "User can not found"}, { status: 400 });
        }
        
        let category;
        if(!data.category) {
            category = await Category.create(data.newCategory)
        } else {
            category = await Category.findById(data.category)
        }

        data.category = category.id;
        delete data.newCategory;

        const product = await Product.create(data)
        category.products.push(product.id);
        await category.save()
        return NextResponse.json({ message: "Product is created", product: product }, { status: 200});
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}