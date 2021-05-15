const User = require('../modal/admin');
const JWT = require('jsonwebtoken');
const env = require('../config/env');

module.exports.ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
        JWT.verify(token, env.JWT_SCERET, (err, decoded) => {
            if (err) {
                return res.status(401).json({status: 'error', message: 'Unautherised access.'})
            }
            req.decoded = decoded
            User.findOne({ username: decoded.username}, (err, user) => {
                if (err) {
                    return res.status(401).json({status: 'error', message: 'Unautherised access.'})
                }
                if (user) {
                    const currentUser = {
                        email: user.username,
                        password: user.password,
                    }

                    req.user = currentUser
                    next()
                } else {
                    return res.status(401).json({status: 'error', message: 'Unautherised access.'})
                }
            })
        })
    } else {
        return res.status(401).json({status: 'error', message: 'Unautherised access.'})
    }
}

module.exports.signRefreshToken = (email) => {
    return new Promise((resolve, reject) => {
        const payload = {
            email: email
        }
        const secret = env.JWT_SCERET;
        const options = {
            expiresIn:'2h'
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject({error: 'There was an error'})
                return;
            }
            resolve(token)
            return;
        })
    })
}