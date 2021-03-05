const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postingSchema = new Schema({
    title:String,
    user_name:String,
    user_id:Schema.Types.ObjectId,
    category:String,
    contents:String,
    creatAt: {type:Date,default:Date.now()},
    updateAt:{type:Date,default:Date.now()},
})


postingSchema.statics.create = function(title, user_name,user_id,category,contents) {

    const posting = new this({
        title, user_name,user_id,category,contents
    })

    // return the Promise
    return posting.save()
}

module.exports = mongoose.model('Posting',postingSchema)