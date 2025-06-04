import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: [{
      type: String,
      required: [true, "At least one product image is required"],
    }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
//     ratings: [{
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5,
//       },
//       review: String,
//       date: {
//         type: Date,
//         default: Date.now,
//       },
//     }],
//     averageRating: {
//       type: Number,
//       default: 0,
//     },
//   },
  {
    timestamps: true,
  }
);

// // Create indexes for better query performance
// productSchema.index({ name: 1 });
// productSchema.index({ slug: 1 });
// productSchema.index({ category: 1 });
// productSchema.index({ featured: 1 });
// productSchema.index({ isActive: 1 });

// // Calculate average rating before saving
// productSchema.pre("save", function (next) {
//   if (this.ratings.length > 0) {
//     this.averageRating =
//       this.ratings.reduce((acc, item) => acc + item.rating, 0) /
//       this.ratings.length;
//   }
//   next();
// });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product; 