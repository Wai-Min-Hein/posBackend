import mongoose, { Schema } from "mongoose";


const FnBSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
  
    createdByImage: {
        type: String,
        required: false
    },
    createdByName: {
        type: String,
        required: false
    },
    category: {
        type: Schema.ObjectId,
        ref:'MenuCategory',
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
})

const FnB = mongoose.model("FnB", FnBSchema);

export default FnB;