import ProductCategory from "../Models/ProductCategoryModel.js";
import Product from "../Models/ProductModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async (req, res, next) => {
  try {

    const categories = await ProductCategory.find()

    const categoriesWithProductsCount = await Promise.all(
        categories.map(async (category) => {
            const productCount =await Product.countDocuments({category: category._id})


            return {
                ...category._doc,
                 productCount
            }
        })
    )


   return res.json({ success: true, datas: categoriesWithProductsCount });
  } catch (error) {
    next(error);
  }
};

export const post = async (req, res, next) => {
    try {
        const request = await req.body;

        const name = request.name;

        const isNameExisted = await ProductCategory.findOne({name});
        if (isNameExisted) {
            return next(errorHandler(400, "Name already exists"));
        }

        const newDatas = new ProductCategory(request);

        await newDatas.save();

        return res.json({ success: true, message: 'New product category add successfully.',newDatas });
        
    } catch (error) {
        next(error);
        
    }
}


export const put = async (req, res, next) => {
    try {

        const {_id, ...rest} = await req.body;

        const newDatas = await ProductCategory.findByIdAndUpdate(_id, rest);
        
        await newDatas.save();
        
        return res.json({ success: true, datas: newDatas });
        
    } catch (error) {
        next(error);
        
    }
}

export const dispatch = async (req, res, next) => {
    try {
        const id = req.params.id;

        // Find the category by ID
        const toDeleteCategory = await ProductCategory.findById(id);

        if (!toDeleteCategory) {
            return next(errorHandler(400, "Category not found"));
        }

        // Call .remove() to trigger pre('remove') middleware
        await toDeleteCategory.deleteOne();

        return res.json({ success: true, message: 'Product category and associated products deleted successfully' });
        
    } catch (error) {
        next(error);
    }
};

