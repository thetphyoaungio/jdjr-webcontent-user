import { 
    getAllForSideNav, getAllForSideNavWithSubCates
} from "@/lib/maincategory/data";

export async function GET(req: Request|any) {
    const result:any = await getAllForSideNavWithSubCates();
    //getAllForSideNav();

    return new Response(JSON.stringify(result));
}