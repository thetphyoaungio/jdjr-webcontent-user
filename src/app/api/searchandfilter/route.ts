import { search } from "@/lib/searchandfilter/data";

export async function GET(req: Request|any) {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get('search') || '';

    if(!keyword) {
        return new Response(JSON.stringify({
            status: 400,
            message:'Search keyword is require.',
            data:null
        }));
    }
    
    const result:any = await search(keyword);

    return new Response(JSON.stringify(result));
}