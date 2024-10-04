"use server";

import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";
import connectDB from "../mongodb/db";
import { SubCategoryModel } from "../mongodb/models";

const commonOptions$ = {
  updatedAt: 0,
  __v: 0
};
const sideNavOptions$ = {
  adminid: 0,
  createdAt: 0,
  updatedAt: 0,
  __v: 0
};
const categoryOption$ = {
  updatedAt: 0,
  createdAt: 0,
  __v: 0,
  image: 0,
  popularimage: 0,
  adminid: 0
};

export async function getAll() {
  noStore();

  try {
    await connectDB();

    const result = await SubCategoryModel.find(
      { status: 1 },
      commonOptions$
    ).sort({ createdAt: -1 });
    //console.log('got all/ result >> ', result)

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

export async function getByMainCategoryId(maincategoryId: string | any) {
  noStore();

  try {
    if (!maincategoryId) {
      return {
        status: 500,
        message: "Main category ID is required.",
        data: null
      };
    }

    await connectDB();

    const result = await SubCategoryModel.find(
      {
        maincategoryid: new mongoose.Types.ObjectId(`${maincategoryId}`),
        status: 1
      },
      commonOptions$
    ).sort({ createdAt: -1 });
    //console.log('got by maincate-id result >> ', result)

    if (!result || result.length === 0) {
      return {
        status: 404,
        message: "Not Found with this Main Category ID.",
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

export async function getByMainCategoryIdForSideNav(
  maincategoryId: string | any
) {
  noStore();

  try {
    if (!maincategoryId) {
      return {
        status: 500,
        message: "Main category ID is required.",
        data: null
      };
    }

    await connectDB();

    const result = await SubCategoryModel.find(
      {
        maincategoryid: new mongoose.Types.ObjectId(`${maincategoryId}`),
        status: 1
      },
      sideNavOptions$
    ).sort({ createdAt: -1 });
    //console.log('got for sidenav by maincate-id result >> ', result)

    if (!result || result.length === 0) {
      return {
        status: 404,
        message: "Not Found with this Main Category ID.",
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

    const query$ = [
      {
        $lookup: {
          from: "maincategories",
          localField: "maincategoryid",
          foreignField: "_id",
          as: "maincategory",
          pipeline: [{ $project: categoryOption$ }]
        }
      },
      {
        $match: { _id: new mongoose.Types.ObjectId(`${id}`) }
      },
      {
        $project: commonOptions$
      }
    ];

    await connectDB();

    const result = await SubCategoryModel.aggregate(query$);
    if (result && result.length > 0) {
      if (result[0].status === 0) {
        return {
          status: 200,
          message: "Found with this ID, but its Status is Inactive.",
          data: null
        };
      }

      const result$ = {
        ...result[0],
        maincategory: result[0].maincategory[0] || null
      };

      return {
        status: 200,
        message: "Success",
        data: JSON.stringify(result$)
      };
    }

    return {
      status: 404,
      message: "Not Found with this ID.",
      data: null
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `${error.message}`,
      data: null
    };
  }
}
export async function getBySlug(slug$: string | any) {
  noStore();

  try {
    if (!slug$) {
      return {
        status: 500,
        message: "Slug is required.",
        data: null
      };
    }

    const query$ = [
      {
        $lookup: {
          from: "maincategories",
          localField: "maincategoryid",
          foreignField: "_id",
          as: "maincategory",
          pipeline: [{ $project: categoryOption$ }]
        }
      },
      {
        $match: { slug: slug$ }
      },
      {
        $project: commonOptions$
      }
    ];

    await connectDB();

    const result = await SubCategoryModel.aggregate(query$);
    if (result && result.length > 0) {
      if (result[0].status === 0) {
        return {
          status: 200,
          message: "Found with this Slug, but its Status is Inactive.",
          data: null
        };
      }

      const result$ = {
        ...result[0],
        maincategory: result[0].maincategory[0] || null
      };

      return {
        status: 200,
        message: "Success",
        data: JSON.stringify(result$)
      };
    }

    return {
      status: 404,
      message: "Not Found with this Slug.",
      data: null
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `${error.message}`,
      data: null
    };
  }
}

export async function updateViewCount(id: string) {
  try {
    await connectDB();

    const result = await SubCategoryModel.updateOne(
      { _id: id },
      { $inc: { viewcount: 1 } }
    );

    return {
      status: 200,
      message: "Successfully updated for view count.",
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
