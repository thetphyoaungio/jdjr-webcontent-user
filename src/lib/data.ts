import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

//*iron session
export interface SessionData {
  deviceId: string;
}
export const defaultSession: SessionData = {
  deviceId: "",
};
export const sessionOptions: SessionOptions = {
  password: "50b6534b16f58d01768fa675838e66236afaaf3f6a213285bc037c142ab60775",
  cookieName: "jdr-user-session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
};
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function getSession(shouldSleep = true) {
  let session: any = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );

  if (session.hasOwnProperty("deviceId") && !session.deviceId.trim()) {
    session.deviceId = defaultSession.deviceId;
  }

  if (shouldSleep) {
    // simulate looking up the user in db
    await sleep(250);
  }

  return session;
}
