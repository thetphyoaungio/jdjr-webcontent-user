import mongoose from "mongoose";

const AboutUsSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        }
    }, 
    {timestamps:true}
);

export default mongoose.models.AboutUs || mongoose.model('AboutUs', AboutUsSchema);