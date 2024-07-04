const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
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
    role: {
        require: true,
        type: String
    }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin