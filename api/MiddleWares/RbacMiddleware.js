import { errorHandler } from "../Utils/errorHandler.js";

export const rabcMiddleware = (requiredPermissions = []) => {
  return (req, res, next) => {
    try {
      const { permissions, role } = req.user;

      if (
        requiredPermissions.length &&
        !requiredPermissions.every((p) => permissions.includes(p)) &&
        role !== "admin"
      ) {
        return next(errorHandler(401, "You do not have permission"));
      }
      next();
    } catch (error) {
      next(errorHandler(401, "You do not have permission"));
    }
  };
};
