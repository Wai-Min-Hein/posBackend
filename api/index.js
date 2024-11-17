import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";

import mongoose from "mongoose";

import fnbRoutes from "./Routes/fnbRoute.js";

import retailPriceRoutes from "./Routes/retailPriceRoute.js";
import authRoutes from "./Routes/authRoute.js";
import permissionRoleRoute from "./Routes/permissionRoleRoute.js"

import csaRoute from "./Routes/CsaRoute.js";

import priceTableRoute from "./Routes/PriceTableRoute.js"

import branchRoute from "./Routes/BranchRoute.js"


import menucategoryRoute from './Routes/MenuCategoryRoute.js'
import productcategoryRoute from './Routes/ProductCategoryRoute.js'
import productRoute from './Routes/ProductRoute.js'




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
const allowedOrigins = ['http://localhost:3000','https://alipos-next.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include credentials if needed
}));
app.use(express.json());
app.use(cookieParser());

// app.use("/fnb", authMiddleware, rabcMiddleware(['view'],'Fnb'), fnbRoutes);
app.use("/api/fnb",  fnbRoutes);
app.use("/api/retailprice", rabcMiddleware(['retilPrice']), retailPriceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/permissionsroles",permissionRoleRoute);

app.use("/api/csa",csaRoute);
app.use("/api/pricetable",priceTableRoute);

app.use("/api/branch",branchRoute);
app.use("/api/menucategory",menucategoryRoute);
app.use("/api/productcategory",productcategoryRoute);
app.use("/api/product",productRoute);




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


export default app