import FnB from "../Models/FnBModle.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {
    const datas = await FnB.find();

    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const request = await req.body;

    const sku = request.sku;

    const isSkuExist = await FnB.findOne({ sku });

    if (isSkuExist) return next(errorHandler(400, "Sku already exists"));

    const newFnB = new FnB(request);

    await newFnB.save();

    return res
      .status(200)
      .json({ message: "New fnb imports successfully", datas: request });
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
    const { _id } = await req.body;

   await FnB.findByIdAndDelete(_id);


    return res
      .status(200)
      .json({ message: "fnb deletes successfully"});
  } catch (error) {
    next(error);
  }
};
