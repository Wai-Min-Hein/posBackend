import PermissionRole from "../Models/PermissionRoleModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const rabcMiddleware = ( requiredModule,requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const { role } = req.user;

      
      const userRole = await PermissionRole.findById(role);

      const userPermissions = userRole.permissions;


      if(userRole.roleName == "admin"){
        return next();
      }


      const isAuthorizedModule = userPermissions.some(
        (p) => p.module == requiredModule
      );

      
      const isAuthorizedPermission = userPermissions.some(
        (p) => p.permissions.includes(requiredPermissions) 
      );
  

      if(!isAuthorizedModule || !isAuthorizedPermission){
        return next(errorHandler(403, "You do not have permission"));
      }


      next();
    } catch (error) {
      next(errorHandler(403, "You do not have permission"));
    }
  };
};

