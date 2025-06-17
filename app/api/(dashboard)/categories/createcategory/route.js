import { NextResponse } from "next/server";
import connectDB from "@/dataBase/dbConnection";
import Category from "@/dataBase/models/category";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let category = await Category.findOne({ name: body.name });
    if (category) {
      return NextResponse.json(
        { error: "Sorry a category with this name already exists" },
        { status: 404 }
      );
    }

    const baseSlug = data.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    let slug = baseSlug;
    let count = 1;
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }
    data.slug = slug;

    category = await Category.create(body);
    await category.save();
    return NextResponse.json(
      { message: "Category created successfully", category: category },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
