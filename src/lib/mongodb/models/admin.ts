import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            max:20
        },
        email: {
            type: String,
            required: true,
            max:35,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            min:6,
            max:25,
            select: false
        },
        token:{
            type: String
        }
    }, 
    {timestamps:true}
);

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);