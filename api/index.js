import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";

import mongoose from "mongoose";

import fnbRoutes from "./Routes/fnbRoute.js";

import retailPriceRoutes from "./Routes/retailPriceRoute.js";
import authRoutes from "./Routes/authRoute.js";
import authMiddleware from "./MiddleWares/AuthMiddleware.js";
import { rabcMiddleware } from "./MiddleWares/RbacMiddleware.js";


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log("MongoDb is not connected " + err.message);
  });





const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/fnb", authMiddleware, rabcMiddleware(['fnbb']), fnbRoutes);
app.use("/retailprice", rabcMiddleware(['retilPrice']), retailPriceRoutes);
app.use("/auth", authRoutes);


app.use((error, req, res, next) => {
  const  statusCode = error.statusCode || 500;
  const  message = error.message || "Internal Server Error";

   return res.status(statusCode).json({
        message,
        statusCode,
        success: false,
      });
})

app.listen(process.env.Port, () => {
  console.log("Server listening on port : " + process.env.Port);
});
