const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSession = new Schema({
    user_id: Schema.Types.ObjectId,
    email: String,
    name:String,
    connectAt: {type: Date, default: Date.now()},
})

UserSession.statics.create = function(user_id,name,email) {
    const user = new this({
        user_id,
        name,
        email
    })

    // return the Promise
    return user.save()
}

UserSession.statics.lastConnect = function (_id) {
    return this.updateOne({_id:_id},{connectAt:Date.now()})
}

UserSession.statics.findOneByUserId = function(user_id) {
    return this.find({
        user_id
    }).exec()
}

UserSession.statics.disconnect = function(user_id) {
    return this.deleteOne({user_id})
}


module.exports = mongoose.model('UserSession', UserSession)