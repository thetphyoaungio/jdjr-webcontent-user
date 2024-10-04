import { 
    getBySlug
} from "@/lib/subcategory/data";
import mongoose from "mongoose";

export async function GET(req: Request|any, { params }: { params: { slug: string } }) {
    const { slug } = params;

    const result:any = await getBySlug(slug);

    return new Response(JSON.stringify(result));
}