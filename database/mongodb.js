import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env<development/production>.local"
  );
}

const connectDatabase = async () => {
  try {
    // Set a reasonable server selection timeout so connection attempts fail fast in bad network conditions
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log(
      `MongoDB connected in ${NODE_ENV || "development"} environment`
    );
  } catch (error) {
    console.error("Error connecting to database:", error.message || error);
    // Re-throw so caller can decide (usually to exit the process)
    throw error;
  }
};

export default connectDatabase;
