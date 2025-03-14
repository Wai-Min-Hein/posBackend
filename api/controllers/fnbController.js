import FnB from "../Models/FnBModle.js";
import priceTable from "../Models/PriceTableModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {
    const datas = await FnB.find().populate('category')

    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const getSingle = async (req, res, next) => {
  try {
    const id = req.params.id;
    const datas = await FnB.findById(id).populate('category');

    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const request = await req.body;
   

    const sku = request.sku;
    const name = request.name;

    const isSkuExist = await FnB.findOne({ sku });
    const isNameExist = await FnB.findOne({ name });

    if (isSkuExist && isNameExist)
      return next(errorHandler(400, "Sku already exists"));

    const newFnB = new FnB(request);

    await newFnB.save();

    return res
      .status(200)
      .json({ message: "New fnb imports successfully", datas: newFnB });
  } catch (error) {
    next(error);
  }
};

export const put = async (req, res, next) => {
  try {
    const { _id, ...rest } = await req.body;

    const newFnB = await FnB.findByIdAndUpdate(_id, rest);

    await newFnB.save();

    return res
      .status(200)
      .json({ message: "New fnb imports successfully", datas: rest });
  } catch (error) {
    next(error);
  }
};

export const dispatch = async (req, res, next) => {
  try {
    const id = req.params.id;

    await FnB.findByIdAndDelete(id);

    await priceTable.updateMany(
      { "menus.menu": id }, // Find priceTables where menu references the deleted fnb
      { $pull: { menus: { menu: id } } } // Remove the specific menu entry
    );

    return res.status(200).json({ message: "fnb deletes successfully" });
  } catch (error) {
    next(error);
  }
};
