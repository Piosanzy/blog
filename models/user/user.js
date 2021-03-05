const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
require("dotenv").config();


const User = new Schema({
    email: String,
    password: String,
    name:String,
    admin: {type: Boolean, default: false},
    createAt: {type: Date, default: Date.now()},
})

User.statics.create = function(email, password,name) {
    const encryptedPassword = crypto.createHmac('sha1',process.env.SECRET).update(password).digest('base64');

    const user = new this({
        email,
        password:encryptedPassword,
        name
    })

    // return the Promise
    return user.save()
}

User.statics.findOneByEmail = function(email) {
    return this.findOne({
        email
    }).exec()
}

User.statics.findOneByName = function(name) {
    return this.findOne({
        name
    }).exec()
}

// verify the password of the User documment
User.methods.verify = function(password) {
    const encryptedPassword = crypto.createHmac('sha1',process.env.SECRET).update(password).digest('base64');

    return this.password === encryptedPassword;
}

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User)