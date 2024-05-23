import PermissionRole from "../Models/PermissionRoleModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const rabcMiddleware = (requiredPermissions = [], requiredModule) => {
  return async (req, res, next) => {
    try {
      const { role } = req.user;

      const userRole = await PermissionRole.findOne({ roleName: role });

      const userPermissions = userRole.permissions;

      const filterModule = userPermissions.filter(
        (p) => p.module == requiredModule
      );

      if (
        !requiredPermissions.every((p) =>
          filterModule[0].permissions.includes(p)
        )
      ) {
        return next(errorHandler(401, "You do not have permission"));
      }

      if (!userPermissions.some((p) => p.module == requiredModule)) {
        return next(errorHandler(401, "You do not have permission"));
      }

      next();
    } catch (error) {
      next(errorHandler(401, "You do not have permission"));
    }
  };
};
