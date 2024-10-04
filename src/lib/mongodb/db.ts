import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const dbConnection = await mongoose.connect(
      process.env.NEXT_PUBLIC_DB || ""
    );
    // console.log(`Database connected ::: ${dbConnection.connection.host}`);
  } catch (error: any) {
    console.error(`DB Connection Error::: ${error.message}`);
    //process.exit(1);
    throw new Error(`DB Connection Error::: ${error.message}`);
  }
}
