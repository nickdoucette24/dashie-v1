import { connectToDatabase, closeDatabase } from "../config/database";
import mongoose from "mongoose";

const runMigrations = async () => {
  try {
    console.log("Starting migrations...");
    await connectToDatabase();

    // Example migration: Create collections if they don't exist
    const collections = ["users", "settings", "dashboards"];
    for (const collectionName of collections) {
      if (!mongoose.connection.db) {
        throw new Error("Database connection is not established");
      }
      const exists = await mongoose.connection.db
        .listCollections({ name: collectionName })
        .toArray();

      if (exists.length === 0) {
        console.log(`Creating collection: ${collectionName}`);
        await mongoose.connection.db.createCollection(collectionName);
      } else {
        console.log(`Collection ${collectionName} already exists`);
      }
    }

    console.log("All migrations completed successfully");
    await closeDatabase();
  } catch (error) {
    console.error(
      "Migration failed:",
      error instanceof Error ? error.message : String(error)
    );
    await closeDatabase();
    process.exit(1);
  }
};

runMigrations();
