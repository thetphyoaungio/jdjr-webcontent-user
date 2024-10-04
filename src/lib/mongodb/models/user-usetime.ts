import mongoose from "mongoose";

const UserUseTimeSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
        }
    }, 
    {timestamps: true}
);

export default mongoose.models.UserUseTime || mongoose.model('UserUseTime', UserUseTimeSchema);