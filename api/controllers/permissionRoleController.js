import PermissionRole from "../Models/PermissionRoleModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {
    const datas = await PermissionRole.find();

    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
  try {
    const request = await req.body;

    const newDatas = new PermissionRole(request);
    await newDatas.save();

    return res
      .status(200)
      .json({ message: "New role imports successfully", datas: newDatas });
  } catch (error) {
    next(error);
  }
};

export const put = async (req, res, next) => {
  try {
    const { _id, ...rest } = await req.body;

    const newDatas = await PermissionRole.findByIdAndUpdate(_id, rest).save();

    return res
      .status(200)
      .json({ message: "Role edits successfully", datas: newDatas });
  } catch (error) {
    next(error);
  }
};

export const dispatch = async (req, res, next) => {
  try {
    const { _id, ...rest } = await req.body;

     await PermissionRole.findByIdAndDelete(_id)

    return res
      .status(200)
      .json({ message: "Role delete successfully", });
  } catch (error) {
    next(error);
  }
};
