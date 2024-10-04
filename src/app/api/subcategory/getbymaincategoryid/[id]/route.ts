import { 
    getByMainCategoryId
} from "@/lib/subcategory/data";
import mongoose from "mongoose";

export async function GET(req: Request|any, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new Response(JSON.stringify({
            status: 400,
            message:'Invalid ID',
            data:null
        }));
    }

    const result:any = await getByMainCategoryId(id);

    return new Response(JSON.stringify(result));
}