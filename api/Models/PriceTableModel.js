import mongoose, { Schema } from "mongoose";

const menuSchema = new Schema({
  // name: { type: String, required: true },
  menu: { type: Schema.ObjectId,ref: 'FnB', required: true },
  // category: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Mixed, required: true },
  vat: { type: mongoose.Schema.Types.Mixed, required: true },
  disPercent: { type: mongoose.Schema.Types.Mixed, required: true },
  disAmount: { type: mongoose.Schema.Types.Mixed, required: true },
  adjust: { type: Boolean, required: true },
}, { _id: false });

const priceTableSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  branch: { type: Schema.ObjectId,ref: 'Branch', required: true },
  area: { type: Schema.ObjectId,ref: 'Csa', required: true },
  startDate: { type: Date , required: true },
  endDate: { type: Date, required: true },
  menus: { type: [menuSchema], required: true },
});

const priceTable = mongoose.model('priceTable',priceTableSchema);

export default priceTable;
