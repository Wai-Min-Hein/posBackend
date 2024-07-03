import Branch from "../Models/branchModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {
    const datas = await Branch.find();
    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const {code, name, phone, address} =  req.body;

    const isCodeExisted = await Branch.findOne({code})

    if (isCodeExisted) return next(errorHandler(400, "Code already exists"));


    const newDatas = new Branch({code, name, phone, address});
    await newDatas.save();

    return res.status(200).json({ success: true, newDatas, message: 'Upload data successfully' });
  } catch (error) {
    next(error);
  }
};

