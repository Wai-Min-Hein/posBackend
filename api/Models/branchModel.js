import mongoose, { Schema } from "mongoose";

const branchSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    }
})

 const Branch = mongoose.model("Branch", branchSchema);

 export default Branch;