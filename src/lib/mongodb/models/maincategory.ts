import mongoose from "mongoose";

const MainCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 150
    },
    image: {
      type: String,
      required: true
    },
    popularimage: {
      type: String,
      required: true
    },
    status: {
      type: Number
    },
    slug : {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.MainCategory ||
  mongoose.model("MainCategory", MainCategorySchema);
