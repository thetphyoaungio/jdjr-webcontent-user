"use server";

import connectDB from "../mongodb/db";
import { UserInfoModel, UserUseTimeModel } from "../mongodb/models";
import { getSession } from "../data";

export async function saveUserInfo(prevState: unknown, formData: any) {
  try {
    let formdata = Object.fromEntries(formData);
    formdata = {
      ...formdata,
      geolocation: JSON.parse(formdata.geolocation),
    };

    await connectDB();

    const newUserInfo = new UserInfoModel({
      deviceId: formdata.deviceid,
      deviceType: formdata.devicetype,
      browserInfo: formdata.browserinfo,
      geolocation: formdata.geolocation,
    });

    const newUserUseTime = new UserUseTimeModel({
      deviceId: formdata.deviceid,
    });

    const session = await getSession();
    //await session.destroy();

    session.deviceId = formdata.deviceid;

    await Promise.all([
      newUserInfo.save(),
      newUserUseTime.save(),
      session.save()
    ]);

    return {
      status: 200,
      message:'Successfully saved for user info data.',
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
