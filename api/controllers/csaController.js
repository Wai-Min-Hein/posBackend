import Csa from "../Models/CsaModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {
    const datas = await Csa.find();
    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const {code, name} = await req.body;

    const isCodeExisted = await Csa.findOne({code})

    if (isCodeExisted) return next(errorHandler(400, "Code already exists"));


    const newDatas = new Csa({code, name});
    await newDatas.save();

    return res.status(200).json({ success: true, newDatas, message: 'Upload data successfully' });
  } catch (error) {
    next(error);
  }
};


export const dispatch = async (req, res, next) => {
  try {

    const id = req.params.id;




    const data = await Csa.findByIdAndDelete(id)
    
    return res.status(200).json({ success: true, message: `'${data.name}' has been deleted successfully` });
  } catch (error) {
    next(error);
  }
};