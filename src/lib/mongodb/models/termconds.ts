import mongoose from "mongoose";

const TermCondSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        }
    }, 
    {timestamps:true}
);

export default mongoose.models.TermAndCond || mongoose.model('TermAndCond', TermCondSchema);