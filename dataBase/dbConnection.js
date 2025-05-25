import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


const connectDB = async () => {

  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables");
  }

  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting to MongoDB...");
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "AgroSphere",
      bufferCommands: true,

    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
