import { 
    getTermsConditions
} from "@/lib/jdrinfo/data";

export async function GET(req: Request|any) {
    const result:any = await getTermsConditions();

    return new Response(JSON.stringify(result));
}