import { 
    getAboutUs, getContactUs, getTermsConditions
} from "@/lib/jdrinfo/data";

export async function GET(req: Request|any) {
    const results:any = await Promise.all([
        getAboutUs(),
        getContactUs(),
        getTermsConditions()
    ]);

    return new Response(JSON.stringify(results));
}