import { 
    getLatestJobPosts, 
    getTotalCountMainCategory, 
    getTotalCountSubCategory 
} from "@/lib/home/data";

export async function GET(req: Request|any) {
    let results:any = await Promise.all([
        getLatestJobPosts(),
        getTotalCountMainCategory(),
        getTotalCountSubCategory()
    ]);

    if(results && results.length === 3) {
        results = {
            latestJobPosts: results[0]?.data||[],
            totalCount_MainCategory: results[1]?.data||0,
            totalCount_SubCategory: results[2]?.data||0
        };
    }
   
    return new Response(JSON.stringify(results));
}