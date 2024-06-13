import mongoose, { Schema } from "mongoose";

const CsaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    }
})

 const Csa = mongoose.model("Csa", CsaSchema);

 export default Csa;