import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/errorHandler.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;


  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.Secret_Token);
    req.user = decoded;



    next();
  } catch (error) {
    next(errorHandler(401, "Unauthorized"));
  }
};

export default authMiddleware;
