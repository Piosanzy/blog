const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postingSchema = new Schema({
    title:String,
    user_name:String,
    user_id:Schema.Types.ObjectId,
    contents:String,
    creatAt: {type:Date,default:Date.now()},
    updateAt:{type:Date,default:Date.now()},
})

module.exports = mongoose.model('posting',postingSchema)