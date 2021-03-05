const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    posting_id:Schema.Types.ObjectId,
    user_name:String,
    user_id:Schema.Types.ObjectId,
    contents:String,
    postingComments_id:{type:String,default:null},
    creatAt: {type:Date,default:Date.now()},
    updateAt:{type:Date,default:Date.now()},
})

module.exports = mongoose.model('comments',commentsSchema)