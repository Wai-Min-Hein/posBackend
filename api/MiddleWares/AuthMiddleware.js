import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/errorHandler.js";

const authMiddleware = async (req, res, next) => {


  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];


  // If neither refreshToken nor accessToken is provided, return 401 Unauthorized
  if ( !accessToken) {
    return next(errorHandler(401, "Unauthorized: Missing Access token"));
  }

  
  try {
    const decoded = jwt.verify(accessToken, process.env.Secret_Token);
    req.user = decoded;

    next();
  } catch (error) {
    next(errorHandler(401, "Unauthorized"));
  }
};

export default authMiddleware;
