import { 
    getContactUs
} from "@/lib/jdrinfo/data";

export async function GET(req: Request|any) {
    const result:any = await getContactUs();

    return new Response(JSON.stringify(result));
}