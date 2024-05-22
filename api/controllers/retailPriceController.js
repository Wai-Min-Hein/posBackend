import FnB from "../Models/FnBModle.js";
import RetailPrice from "../Models/RetailPriceModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {
    const datas = await RetailPrice.find();

    return res
      .status(200)
      .json({ message: "Data returned successfully", datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const request = await req.body;

    const fnbDatas = await FnB.find();

    const isfnbExisted = fnbDatas.filter((fnb) => fnb.sku == request.sku);

    if (isfnbExisted.length <= 0) {
      return next(errorHandler(400, "Menu do not exist"));
    }

    const newData = await new RetailPrice(request).save();

    return res
      .status(200)
      .json({ message: "Data returned successfully", datas: newData });
  } catch (error) {
    next(error);
  }
};


export const put = async (req, res, next) => {
    try {
      const request = await req.body;


      const newData = await RetailPrice.findByIdAndUpdate(request._id, request);
  
      
  
      return res
        .status(200)
        .json({ message: "Menu edited successfully" });
    } catch (error) {
      next(error);
    }
  };

  export const dispatch = async (req, res, next) => {
    try {
      const request = await req.body;


      const newData = await RetailPrice.findByIdAndDelete(request._id, request);
  
      
  
      return res
        .status(200)
        .json({ message: "Menu deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
