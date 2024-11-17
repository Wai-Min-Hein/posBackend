import mongoose, { Schema } from "mongoose";
import Product from "./ProductModel.js";
const ProductCategorySchema = new Schema({
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

ProductCategorySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        await Product.deleteMany({ category: this._id });
        next();
    } catch (err) {
        next(err);
    }
});

const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);

export default ProductCategory;