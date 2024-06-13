import priceTable from "../Models/PriceTableModel.js";

export const get = async (req, res, next) => {
  try {
    const datas = await priceTable.find()
    return res.status(200).json({ success: true, datas });
  } catch (error) {
    next(error);
  }
};

export const getSingleData =async (req, res, next) =>{
    try {
        const id = req.params.id;
        const datas = await priceTable.findById(id);
        return res.status(200).json({ success: true, datas });
    } catch (error) {
        next(error);
    }
}

export const post = async (req, res, next) => {
    try {

        const request =  req.body;
        const newDatas = new priceTable(request);
        await newDatas.save();
        
        return res.status(200).json({ success: true, datas: newDatas });
    } catch (error) {
        next(error);
        
    }
}
