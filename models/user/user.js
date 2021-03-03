const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    email: String,
    password: String,
    name:String,
    admin: {type: Boolean, default: false},
    createAt: {type: Date, default: Date.now()},
})

User.statics.create = function(email, password,name) {
    const user = new this({
        email,
        password,
        name
    })

    // return the Promise
    return user.save()
}

User.statics.findOneByUsername = function(email) {
    return this.findOne({
        email
    }).exec()
}

// verify the password of the User documment
User.methods.verify = function(password) {
    return this.password === password
}

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User)