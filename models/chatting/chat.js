const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    room_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    user_name: String,
    answer: String,
    sendAt: {type: Date, default: Date.now()}
});

chatSchema.statics.create = function (room_id, user_id, user_name, answer) {
    const room = new this({
        room_id, user_id, user_name, answer
    })

    return room.save()
}




module.exports = mongoose.model('Chat', chatSchema);