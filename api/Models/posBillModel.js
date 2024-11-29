import mongoose, {Schema} from "mongoose";

const BillMenuSchema = new Schema({
    menuId: 
    {
        type: String,
        required: true
    },
    discountedAmount: 
    {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    totalDiscountedAmount:{
        type: Number,
        required: true
    }
}, {_id: false})
const PosBillSchema = new Schema({
    orderId: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    billDiscount:{
        type: Number,
        required: true
    },
    billTax: {
        type: Number,
        required: true
    },
    customer: {
        type: String
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalDiscount: {
        type: Number,
        required: true
    },
    totalPaymentAmount: {
        type: Number,
        required: true
    },
    totalQty: {
        type: Number,
        required: true
    },
    totalTax: {
        type: Number,
        required: true
    },
    billMenus: {
        type: [BillMenuSchema],
        required: true
    }
})

const PosBill = mongoose.model('PosBill', PosBillSchema)
export default PosBill