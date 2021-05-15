const mongoose = require('mongoose')
const Schema = mongoose.Schema
var bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const AdminUserSchema = Schema({
    username: {type: String, require: false},
    password: { type: String, require: false },
    createdAt: { type: Date, require: false, default: new Date()},
})

AdminUserSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })    
})

const AdminUser = mongoose.model('AdminUserSchema', AdminUserSchema);

module.exports = AdminUser;

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}