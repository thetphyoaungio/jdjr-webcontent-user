import { 
    getAboutUs
} from "@/lib/jdrinfo/data";

export async function GET(req: Request|any) {
    const result:any = await getAboutUs();

    return new Response(JSON.stringify(result));
}