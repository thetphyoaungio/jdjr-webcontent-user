import mongoose from "mongoose";

const PhoneSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  status: {
    type: Number
  }
});

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 35,
    unique: true,
    lowercase: true,
    trim: true
  },
  status: {
    type: Number
  }
});

const SocialMediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 250
  },
  slug: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: Number
  }
});

const ContactUsSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    phone: {
      type: [PhoneSchema],
      default: [],
      required: true
    },
    email: {
      type: [EmailSchema],
      default: [],
      required: true
    },
    socialmedia: {
      type: [SocialMediaSchema],
      default: [],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.ContactUs ||
  mongoose.model("ContactUs", ContactUsSchema);
