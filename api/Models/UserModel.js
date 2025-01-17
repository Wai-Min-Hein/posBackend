import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  role: { type: Schema.ObjectId, ref: 'PermissionRoles', required: true },
  // permissions: { type: [String], default: [] },
});

const User = mongoose.model("User", userSchema);
export default User;
