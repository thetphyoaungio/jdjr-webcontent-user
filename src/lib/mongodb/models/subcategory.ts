import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 150
    },
    maincategoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true
    },
    status: {
      type: Number
    },
    viewcount: {
      type: Number,
      default: 0
    },
    slug: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", SubCategorySchema);
