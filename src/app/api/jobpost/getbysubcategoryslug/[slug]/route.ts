import { 
    getBySubCategorySlug
} from "@/lib/jobpost/data";
import mongoose from "mongoose";

export async function GET(req: Request|any, { params }: { params: { slug: string } }) {
    const { slug } = params;

    const result:any = await getBySubCategorySlug(slug);

    return new Response(JSON.stringify(result));
}