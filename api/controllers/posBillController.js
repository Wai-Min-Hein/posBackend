import PosBill from "../Models/posBillModel.js";

export const get = async (req, res) => {
  try {
    const datas = await PosBill.find();
    return res.status(200).json({ success: true, datas });
  } catch (error) {
    console.log(error);
  }
};


export const post = async (req, res) => {
    try {
      const request = req.body;
      const newBill = new PosBill(request)
      await newBill.save()
    return res.status(200).json({ success: true, newBill });

    } catch (error) {
      console.log(error);
    }
  };
