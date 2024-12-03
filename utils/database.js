import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
  
    console.log(isConnected);
    
    if (isConnected) {
      console.log("MongoDB is already connected");
      return;
    }
  
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "bsg_app",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      isConnected = true;
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.log("MongoDB connection error:", error);
    }
  };
  