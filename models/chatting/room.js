const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room_name:String,
    room_user:[
        {
            user_id:Schema.Types.ObjectId,
            user_name:String,
            user_connectAt:{type:Date,default:Date.now()},
            user_disconnectAt:{type:Date,default:Date.now()}
        }
    ],
    createAt: {type:Date,default:Date.now()},
    messageUpdateAt:{type:Date,default:Date.now()},
});

roomSchema.statics.create = function (room_name,room_user) {
    const room = new this({
        room_name,room_user
    })

    return room.save()
}

roomSchema.statics.getRoomList = function (){
    return this.find({}).exec()
}

roomSchema.statics.joinRoom = function (_id,room_user) {

    return this.update({_id:_id},{$push:{room_user:room_user}})
}

module.exports = mongoose.model('Room',roomSchema)