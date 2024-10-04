'use server';

import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";
import connectDB from "../mongodb/db";
import { 
    MainCategoryModel, 
    SubCategoryModel, 
    JobPostModel, 
} from "../mongodb/models";

const commonOptions$ = {
    updatedAt: 0,
    __v: 0,

    maincategoryid: 0,
    subcategoryid: 0,
    coverimage: 0,
    content: 0,

    image: 0, 
    popularimage: 0,
};

export async function search(keyword:string) {
    noStore();

    let pipeline = [];

    try {
        if(keyword && keyword.trim()) {
            pipeline.push({
                $match: {
                    status:1,
                    $or:[
                        {name: { $regex: keyword, $options: 'i' }},
                        {title: { $regex: keyword, $options: 'i' }},
                    ]
                }
            });

            await connectDB();

            const results = await Promise.all([
                //MainCategoryModel.aggregate([...pipeline, {$sort: { createdAt: -1 }}, { $project: commonOptions$}]),
                //SubCategoryModel.aggregate([...pipeline, {$sort: { createdAt: -1 }}, { $project: commonOptions$}]),
                JobPostModel.aggregate([...pipeline, {$sort: { createdAt: -1 }}, { $project: commonOptions$}]),
            ]);
            //console.log('got search/ results >> ', results)

            if(results && results[0].length === 0 /* && results[1].length === 0 && results[2].length === 0 */) {
                return {
                    status: 404,
                    message:'No data',
                    data: null
                }
            }

            const result$ = {
                //mainCategories:results[0]||[],
                //subCategories:results[1]||[],
                jobPosts:results[/* 2 */0]||[]
            }

            return {
                status: 200,
                message:'Success',
                data: JSON.stringify(result$)
            }
        }
        return {
            status: 200,
            message:'No Data',
            data: null
        }
    }
    catch(error:any) {
        return {
            status: 500,
            message:`${error.message}`,
            data:null
        }
    }
}