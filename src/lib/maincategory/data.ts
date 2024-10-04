"use server";

import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";
import connectDB from "../mongodb/db";
import { MainCategoryModel } from "../mongodb/models";

const commonOptions$ = {
  updatedAt: 0,
  __v: 0
};
const sidenavOptions$ = {
  updatedAt: 0,
  __v: 0,
  popularimage: 0,
  adminid: 0,
  createdAt: 0
};

export async function getAll() {
  noStore();

  try {
    await connectDB();

    const result = await MainCategoryModel.find(
      { status: 1 },
      commonOptions$
    ).sort({ createdAt: -1 });
    //console.log('got result >> ', result)

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

export async function getById(id: string | any) {
  noStore();

  try {
    if (!id) {
      return {
        status: 500,
        message: "ID is required.",
        data: null
      };
    }

    await connectDB();

    const result = await MainCategoryModel.findById(id, commonOptions$);
    //console.log('got by id/ result >> ', result)

    if (result && result.status === 0) {
      return {
        status: 200,
        message: "Found with this ID, but its Status is Inactive.",
        data: null
      };
    } else if (!result) {
      return {
        status: 404,
        message: "Not Found with this ID.",
        data: null
      };
    }

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

export async function getBySlug(slug: string | any) {
  noStore();

  try {
    if (!slug) {
      return {
        status: 500,
        message: "Slug is required.",
        data: null
      };
    }

    await connectDB();

    const result: any = await MainCategoryModel.find({ slug }, commonOptions$);
    //console.log('got by id/ result >> ', result)

    if (result && result.status === 0) {
      return {
        status: 200,
        message: "Found with this ID, but its Status is Inactive.",
        data: null
      };
    } else if (!result) {
      return {
        status: 404,
        message: "Not Found with this ID.",
        data: null
      };
    }

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

export async function getAllForSideNav() {
  noStore();

  try {
    await connectDB();

    const result = await MainCategoryModel.find({ status: 1 }, sidenavOptions$)
      .populate("subcategories")
      .sort({ createdAt: -1 });
    //console.log('got for sidenav/ result >> ', result)

    console.log("result => ", result);

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

export async function getAllForSideNavWithSubCates() {
  noStore();

  try {
    const query$ = [
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "maincategoryid",
          as: "subCategories"
        }
      },
      {
        $addFields: {
          subCategories: {
            $sortArray: {
              input: "$subCategories", // SubCategory array to be sorted
              sortBy: { createdAt: -1 } // Sort by createdAt in descending order
            }
          }
        }
      },
      {
        $match: { status: 1 }
      },
      {
        $project: sidenavOptions$
      }
    ];

    await connectDB();

    const result = await MainCategoryModel.aggregate(query$)
      //.find({status:1}, sidenavOptions$)
      .sort({ createdAt: -1 });

    // const updatedCategories = result.map((category) => ({
    //   ...category,
    //   subCategories: category.subCategories.map((subCategory: any) => ({
    //     ...subCategory,
    //     slug: subCategory.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_")
    //   })),
    //   slug: category.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_")
    // }));

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
