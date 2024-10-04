import Product from "../Models/ProductModel.js";
import { errorHandler } from "../Utils/errorHandler.js";

export const get = async(req, res, next) => {
    try {

        const datas = await Product.find().populate('category').exec()


       return res.status(200).json({ success: true, datas });

        
    } catch (error) {
        next (error);
        
    }
}

export const getProductsByCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.categoryId;
  
      // Find products by category ID
      const products = await Product.find({ category: categoryId }).populate('category').exec();
  
      if (!products || products.length === 0) {
        return next(errorHandler(404, "No products found for this category"));
      }
  
      return res.json({ success: true, datas:products });
    } catch (error) {
      next(error);
    }
  };

export const post = async (req, res, next) => {
    try {
        const request = await req.body;

        const sku = request.sku;

        const isSkuExisted = await Product.findOne({sku});
        if (isSkuExisted) {
            return next(errorHandler(400, "Sku code already exists"));
        }

        const newDatas = new Product(request);

        await newDatas.save();

        return res.json({ success: true, message: 'New product add successfully.',newDatas });
        
    } catch (error) {
        next(error);
        
    }
}