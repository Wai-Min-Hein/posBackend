import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: { type: String, required: true},
    // permissions: { type: [String], default: [] },
})

const User = mongoose.model("User", userSchema);
export default User;