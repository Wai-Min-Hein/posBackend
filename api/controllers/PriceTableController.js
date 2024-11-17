import Csa from "../Models/CsaModel.js";
import priceTable from "../Models/PriceTableModel.js";

export const get = async (req, res, next) => {
  try {
    const datas = await priceTable
      .find()
      .populate("branch")
      .populate("area")
      .exec();
    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const getSingleData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const datas = await priceTable
      .findById(id)
      .populate("branch")
      .populate("area")
      .exec();
    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const getSingleDataByName = async (req, res, next) => {
  try {
    const name = req.params.name;

    const area = await Csa.findOne({ name: name });

    if (!area) {
      return res
        .status(400)
        .json({ success: false, message: "Area not found" });
    }
    const datas = await priceTable
      .findOne({ area: area._id })
      .populate("branch")
      .populate("area")
      .populate({
        path: "menus.menu",
      })
      .exec();

    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const request = req.body;

    const newDatas = new priceTable(request);
    await newDatas.save();

    return res.status(200).json({ success: true, datas: newDatas });
  } catch (error) {
    next(error);
  }
};

export const put = async (req, res, next) => {
  try {
    const id = req.params.id;

    const request = req.body;


    const newDatas = await priceTable.findByIdAndUpdate(id, request);

    await newDatas.save();

    return res.status(200).json({ success: true, datas: newDatas });
  } catch (error) {
    next(error);
  }
};

export const dispatch = async (req, res, next) => {
  try {
    const id = req.params.id;
    await priceTable.findByIdAndDelete(id);

    return res.status(200).json({ message: "priceTable deletes successfully" });
  } catch (error) {
    next(error);
  }
};
