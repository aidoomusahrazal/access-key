const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String
    },
    isVarified: {
        type: Boolean,
        deafult: false
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpire: {
        type: Date
    },
    forgetPasswordToken: {
        type: String
    },
    forgetPasswordTokenExpire: {
        type: Date
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User