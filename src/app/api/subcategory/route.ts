import { 
    getAll
} from "@/lib/subcategory/data";

export async function GET(req: Request|any) {
    const result:any = await getAll();

    return new Response(JSON.stringify(result));
}