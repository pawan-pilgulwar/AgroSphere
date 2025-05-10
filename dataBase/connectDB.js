import mongoose from "mongoose";
import { Connection } from "mongoose";

// const mongooseURL = ;

const connectToMongo = async () => {
  mongoose.connection.on("connected", () => {
    console.log("connected");
  });
  const data = await mongoose.connect(process.env.MONGO_URL);
  console.log(data);
};

export default connectToMongo;
