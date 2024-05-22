import mongoose, { Schema } from "mongoose";


const FnBSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
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
        type: String,
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