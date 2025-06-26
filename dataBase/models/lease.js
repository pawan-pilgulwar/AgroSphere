import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["equipment", "land", "storage"],
      required: true,
    },
    price: { type: Number, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Lease || mongoose.model("Lease", leaseSchema); 