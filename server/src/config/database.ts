import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in environment variables");
  process.exit(1);
}

export const connectToDatabase = async (): Promise<void> => {
  try {
    // Log the connection string (without password) for debugging
    const sanitizedUri = MONGODB_URI.replace(
      /\/\/([^:]+):([^@]+)@/,
      "//***:***@"
    );
    console.log(`Connecting to MongoDB: ${sanitizedUri}`);

    // Direct connection to MongoDB Atlas
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB Atlas successfully");
    console.log(
      `Using database: ${mongoose.connection.db?.databaseName || "unknown"}`
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
    process.exit(1);
  }
};

export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};

// Monitor connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

// For graceful shutdown
process.on("SIGINT", async () => {
  await closeDatabase();
  process.exit(0);
});
