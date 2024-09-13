import mongoose, { Schema } from "mongoose";

const MenuCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
   code: {
    type: String,
    required: true,
   },
   status: {
    type: String,
    required: true,
    default: 'active',
   }
})

const MenuCategory = mongoose.model("MenuCategory", MenuCategorySchema);

export default MenuCategory;