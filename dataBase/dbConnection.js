import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const connectDB = async (retryCount = 0) => {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables");
    throw new Error("MONGODB_URI is not defined in the environment variables");
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
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying connection (${retryCount + 1}/${MAX_RETRIES})...`);
      await sleep(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      return connectDB(retryCount + 1);
    }
    
    throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts: ${error.message}`);
  }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

export default connectDB;
