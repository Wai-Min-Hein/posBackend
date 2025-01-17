import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
    module: {
      type: String ,
      required: true,
      // unique: true,
    },
    permissions: {
      type: [String],
      required: true,
    //   enum: ['create', 'edit', 'delete', 'view']
    }
  },{_id: false});

const permissionRoleSchema = new Schema({
    roleName: { type: String, required: true},
    
    permissions: { type: [permissionSchema], default: [] },
})

const PermissionRole = mongoose.model("PermissionRoles", permissionRoleSchema);
export default PermissionRole;