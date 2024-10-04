"use server";

import mongoose from "mongoose";
import { unstable_noStore as noStore } from "next/cache";
import connectDB from "../mongodb/db";
import { AboutUsModel, ContactUsModel, TermCondModel } from "../mongodb/models";

const commonOptions$ = {
  updatedAt: 0,
  __v: 0
};

export async function getAboutUs() {
  noStore();

  try {
    await connectDB();

    const result = await AboutUsModel.findOne({}, commonOptions$);
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

export async function getContactUs() {
  noStore();

  try {
    await connectDB();

    const result = await ContactUsModel.findOne({}, commonOptions$);

    const data = result.toObject();
    const newData = {
      ...data,
      socialmedia: data?.socialmedia?.filter((each: any) => each.status === 1)
    };

    return {
      status: 200,
      message: "Success",
      data: JSON.stringify(newData)
    };
  } catch (error: any) {
    return {
      status: 500,
      message: `${error.message}`,
      data: null
    };
  }
}

export async function getTermsConditions() {
  noStore();

  try {
    await connectDB();

    const result = await TermCondModel.findOne({});
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
