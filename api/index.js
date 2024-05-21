import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mongoose from "mongoose";

import fnbRoutes from "./Routes/fnbRoute.js";


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

app.use("/fnb", fnbRoutes);


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
