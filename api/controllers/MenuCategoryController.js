import MenuCategory from "../Models/MenuCategoryModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {

    const datas = await MenuCategory.find()

   return res.json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
    try {
        const request = await req.body;

        const name = request.name;

        const isNameExisted = await MenuCategory.findOne({name});
        if (isNameExisted) {
            return next(errorHandler(400, "Name already exists"));
        }

        const newDatas = new MenuCategory(request);

        await newDatas.save();

        return res.json({ success: true,newDatas });
        
    } catch (error) {
        next(error);
        
    }
}


export const put = async (req, res, next) => {
    try {

        const {_id, ...rest} = await req.body;

        const newDatas = await MenuCategory.findByIdAndUpdate(_id, rest);
        
        await newDatas.save();
        
        return res.json({ success: true, datas: newDatas });
        
    } catch (error) {
        next(error);
        
    }
}

export const dispatch = async (req, res, next) => {
    try {
        const id = req.params.id;
        await MenuCategory.findByIdAndDelete(id);
        return res.json({ success: true});
        
    } catch (error) {
        next(error);
        
    }
}
