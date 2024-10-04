"use server";

import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";
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

const detailOptions$ = {
  adminid: 0,
  createdAt: 0,
  updatedAt: 0,
  __v: 0
};

export async function getAll() {
  noStore();

  try {
    await connectDB();

    const result = await JobPostModel.find({ status: 1 }, commonOptions$).sort({
      createdAt: -1
    });
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

    const result = await JobPostModel.find(
      {
        maincategoryid: new mongoose.Types.ObjectId(`${maincategoryId}`),
        status: 1
      },
      commonOptions$
    ).sort({ createdAt: -1 });

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

export async function getBySubCategoryId(subcategoryId: string | any) {
  noStore();

  try {
    if (!subcategoryId) {
      return {
        status: 500,
        message: "Sub category ID is required.",
        data: null
      };
    }

    await connectDB();

    const result = await JobPostModel.find(
      {
        subcategoryid: new mongoose.Types.ObjectId(`${subcategoryId}`),
        status: 1
      },
      commonOptions$
    ).sort({ createdAt: -1 });
    //console.log('got by subcate-id result >> ', result)

    if (!result || result.length === 0) {
      return {
        status: 404,
        message: "Not Found with this Sub Category ID.",
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
export async function getBySubCategorySlug(subcategorySlug: string | any) {
  noStore();

  try {
    if (!subcategorySlug) {
      return {
        status: 500,
        message: "Sub category Slug is required.",
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
        $lookup: {
          from: "subcategories",
          localField: "subcategoryid",
          foreignField: "_id",
          as: "subcategory",
          pipeline: [{ $project: categoryOption$ }]
        }
      },
      {
        $match: { subcategoryslug: subcategorySlug, status: 1 }
      },
      {
        $project: commonOptions$
      }
    ];

    await connectDB();

    const result = await JobPostModel.aggregate(query$);

    if (result && result.length > 0) {
      const result$ = result.map((x: any) => ({
        ...x,
        maincategory: x.maincategory[0] || null,
        subcategory: x.subcategory[0] || null
      }));

      return {
        status: 200,
        message: "Success",
        data: result$
      };
    }

    return {
      status: 404,
      message: "Not Found with this Sub Category Slug.",
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

export async function getByIdForUser(id: string | any) {
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
        $lookup: {
          from: "subcategories",
          localField: "subcategoryid",
          foreignField: "_id",
          as: "subcategory",
          pipeline: [{ $project: categoryOption$ }]
        }
      },
      {
        $match: { _id: new mongoose.Types.ObjectId(`${id}`) }
      },
      {
        $project: detailOptions$
      }
    ];

    await connectDB();

    const result = await JobPostModel.aggregate(query$);
    //findById(id, commonOptions$);
    //console.log('got by id/ result >> ', result)

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
        maincategory: result[0].maincategory[0] || null,
        subcategory: result[0].subcategory[0] || null
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

export async function updateViewCountJobPost(id: string) {
  try {
    await connectDB();

    const result = await JobPostModel.updateOne(
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

export async function getAllForAutocomplete() {
  try {
    await connectDB();

    const result = await JobPostModel.find(
      {},
      "_id title maincategoryslug subcategoryslug"
    );

    console.log(result);

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
