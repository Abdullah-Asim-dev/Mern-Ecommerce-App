import "dotenv/config";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mern-ecommerce-app-alpha-henna.vercel.app",
      "https://mern-ecommerce-77cvdmzwg-abdullahasimoffical4737-6115s-projects.vercel.app",
    ],
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((error) => {
    console.log("Mongoose connection error:", error);
  });

// Routes
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});