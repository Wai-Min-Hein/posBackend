import mongoose, { Schema } from "mongoose";

const RetailPriceShcema = new Schema ({
    sku: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    vat: { type: Number, required: true, default:0 },
    disPercent: { type: Number, required: true },
    disAmount: { type: Number, required: true },
    adjust: { type: Boolean, required: true, default: false },
})

const RetailPrice = mongoose.model('retailPrice', RetailPriceShcema)

export default RetailPrice;