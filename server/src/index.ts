import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectToDatabase } from "./config/database";
import authRoutes from "./routes/AuthRoute";
import userRoutes from "./routes/UserRoute";
// import dashboardRoutes from './routes/DashboardRoute';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use('/api/dashboards', dashboardRoutes);

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Connect to MongoDB and start server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `🔍 Health check available at http://localhost:${PORT}/api/health`
      );
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
