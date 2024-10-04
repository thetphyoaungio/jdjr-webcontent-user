"use server";

import mongoose from "mongoose";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import connectDB from "../mongodb/db";
import {
  MainCategoryModel,
  SubCategoryModel,
  JobPostModel
} from "../mongodb/models";

const commonOptions$ = {
  content: 0,
  adminid: 0,
  createdAt: 0,
  __v: 0
};

export async function getLatestJobPosts(limit?: number) {
  noStore();

  try {
    await connectDB();

    let query = JobPostModel.find({ status: 1 }, commonOptions$)
      .sort({
        createdAt: -1
      })
      .limit(15);

    if (limit) {
      query = query.limit(limit);
    }

    const latestData = await query;

    return {
      status: 200,
      message: "Success",
      data: JSON.stringify(latestData)
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `${error.message}`,
      data: null
    };
  }
}

export async function getTotalCountMainCategory() {
  noStore();

  try {
    await connectDB();

    const result = await MainCategoryModel.find(
      { status: 1 },
      "name"
    ).countDocuments();

    return {
      status: 200,
      message: "Success",
      data: JSON.stringify(result)
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `${error.message}`,
      data: null
    };
  }
}

export async function getTotalCountSubCategory() {
  noStore();

  try {
    await connectDB();

    const result = await SubCategoryModel.find(
      { status: 1 },
      "name"
    ).countDocuments();

    console.log(result);

    return {
      status: 200,
      message: "Success",
      data: JSON.stringify(result)
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `${error.message}`,
      data: null
    };
  }
}

export async function getPopularSubCategories() {
  noStore();

  try {
    await connectDB();

    const resultSubCategories: any = await SubCategoryModel.find({})
      .sort({ viewcount: -1 })
      .populate("maincategoryid");

    const getPopularJobs = resultSubCategories
      .filter((subcategory: any) => subcategory.viewcount > 0)
      .sort((a: any, b: any) => b.viewcount - a.viewcount);
    // .slice(0, 5);

    const popularSubcategorySlugs = getPopularJobs.map(
      (subcategory: any) => subcategory.slug
    );

    //console.log("popularSubcategorySlugs => ", popularSubcategorySlugs);

    const resultPopularCategories = await JobPostModel.aggregate([
      {
        $match: { subcategoryslug: { $in: popularSubcategorySlugs } }
      },
      {
        $lookup: {
          from: "maincategories",
          localField: "maincategoryid",
          foreignField: "_id",
          as: "mainCategory"
        }
      },
      {
        $unwind: "$mainCategory"
      },
      {
        $match: { "mainCategory.status": 1 }
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subcategoryid",
          foreignField: "_id",
          as: "subCategories"
        }
      },
      {
        $unwind: "$subCategories"
      },
      {
        $match: { "subCategories.status": 1 }
      },
      {
        $group: {
          _id: {
            slug: "$mainCategory.slug",
            name: "$mainCategory.name",
            image: "$mainCategory.popularimage",
            status: "$mainCategory.status"
          },
          subCategories: {
            $push: {
              name: "$subCategories.name",
              slug: "$subCategories.slug",
              viewCount: "$subCategories.viewcount",
              status: "$subCategories.status"
            }
          }
        }
      },
      {
        $sort: {
          "subCategories.viewcount": -1
        }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          mainCategory: {
            name: "$_id.name",
            slug: "$_id.slug",
            image: "$_id.image",
            status: "$_id.status"
          },
          subCategories: "$subCategories"
        }
      }
    ]);

    return {
      status: 200,
      message: "Success",
      data: JSON.stringify(resultPopularCategories)
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `Error: ${error.message}`,
      data: null
    };
  }
}
