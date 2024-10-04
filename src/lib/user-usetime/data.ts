"use server";

//import { getSession } from "../data";
import connectDB from "../mongodb/db";
import { UserUseTimeModel } from "../mongodb/models";

export async function saveUserUseTime(timestamp: number, deviceId: string) {
  try {
    if (!deviceId.trim()) throw new Error(`user device Id is required.`);

    await connectDB();

    const newCreatedAt = new Date(timestamp);

    const result: any = await UserUseTimeModel.findOneAndUpdate(
      { deviceId },
      { $set: { createdAt: newCreatedAt } },
      { /* upsert: true, */ new: true }
    );

    return {
      status: 200,
      message:'Successfully updated for user usage time.',
      data: null
    } 
  } catch (error: any) {
    return {
      status: 500,
      message: `${error.message}`,
      data: null
    } 
  }
}
