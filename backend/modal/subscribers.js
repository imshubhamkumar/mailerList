const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscribeUserSchema = Schema({
    fullName: {type: String, require: false},
    email: { type: String, require: false },
    createdAt: { type: Date, require: false, default: new Date()},
})

const SubscribeUser = mongoose.model('SubscribeUserSchema', SubscribeUserSchema);

module.exports = SubscribeUser;