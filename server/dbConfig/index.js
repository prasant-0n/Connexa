import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://connexa2000:147Cb060@cluster0.3ck6mcs.mongodb.net/"
    );
    console.log("Connected to the database");
  } catch (error) {
    console.log("DB error: " + error);
  }
};

export default dbConnection;
