import mongoose from "mongoose";

const JobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      max: 250
    },
    maincategoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true
    },
    subcategoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true
    },
    coverimage: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    status: {
      type: Number
    },
    viewcount: {
      type: Number,
      default: 0
    },
    subcategoryslug: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.JobPost ||
  mongoose.model("JobPost", JobPostSchema);
