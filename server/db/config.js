import mongoose from "mongoose";

const connectDB = async () => {
  //   console.log(process.env.MONGODB_URL);
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      "MongoDB is connected to the DB Host:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
