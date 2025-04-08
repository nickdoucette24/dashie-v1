import { connectToDatabase, closeDatabase } from "../config/database";

const testConnection = async () => {
  try {
    await connectToDatabase();
    console.log("✅ Successfully connected to MongoDB Atlas!");

    // Verify we can access the database
    const mongoose = require("mongoose");
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("Available collections:");
    collections.forEach((collection: { name: string }) =>
      console.log(`- ${collection.name}`)
    );

    await closeDatabase();
  } catch (error) {
    console.error("❌ Connection test failed:", error);
    process.exit(1);
  }
};

// Run the test if this file is executed directly
if (require.main === module) {
  testConnection();
}
