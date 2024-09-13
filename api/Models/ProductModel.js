import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true },
    unit: { type: String, required: true },
    image: { type: String, required: false },
    category: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required:true },
    createBy: { type: String, required:false },
})

const Product = mongoose.model('Product', productSchema)

export default Product;