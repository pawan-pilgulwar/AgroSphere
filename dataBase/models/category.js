import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
    description: {
      type: String,
      required: true,
    },
    subcategories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subcategory",
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
