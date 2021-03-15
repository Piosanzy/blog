const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postingSchema = new Schema({
    title:String,
    user_name:String,
    user_id:Schema.Types.ObjectId,
    category:String,
    contents:String,
    createAt: {type:Date,default:Date.now()},
    updateAt:{type:Date,default:Date.now()},
})


postingSchema.statics.create = function(title, user_name,user_id,category,contents) {

    const posting = new this({
        title, user_name,user_id,category,contents
    })

    // return the Promise
    return posting.save()
}

postingSchema.statics.readPosting = function (_id) {
    return this.findOne({
        _id
    }).exec()
}

postingSchema.statics.getPosting = function (_id) {
    return this.find({}).exec()
}


module.exports = mongoose.model('Posting',postingSchema)