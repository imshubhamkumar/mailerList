const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport');
const AdminUser = require('../modal/admin');
const Subscriber = require('../modal/subscribers');
const nodemailer = require('nodemailer');
const sendMail = require('sendmail')();
const {signRefreshToken, ensureAuthenticated} = require('../utilities/authService');
const handlebars = require('handlebars');
const fs  = require('fs');
const path  = require('path');


router.get('/subscribe', async (req, res) => {
    // const subs = await Subscriber.find()
    // var emailList = [];
    // for (let i = 0; i < subs.length; i++) {
    //    emailList.push(subs[i].email);
    // }
    const filePath = path.join(__dirname, '../view/mailTemplate.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        username: "Bittu"
    };
    const htmlToSend = template(replacements);
      sendMail({
        from: `Admin <no-reply@buddyest.com>`, // sender address
        to: 'imbittuk0@gmail.com', // list of receivers
        subject: "Welcome on board", // Subject line
        html: htmlToSend, // html body
      }, (err, data) => {
          if(err) {
            return res.status(200).json({status: false, data: "Error"})
          } else {
            return res.status(200).json({status: true, data})
          }
      });
})

router.post('/login', async (req, res, next) => {
    const user = await AdminUser.countDocuments();
    if (user <= 0) {
        const firstUser = new AdminUser({
            username: 'admin',
            password: 'admin'
        })
        firstUser.save();
    } else {
        passport.authenticate('local', (err, user) => {
            if (err)  return next(err);
            if (!user) {
                return res.status(200).json({status: false, errors: 'Email/Password is wrong.'})
            }
            req.logIn(user, async (err) => {
                if (err) {  
                    return next(err)
                }
                const accessToken = await signRefreshToken(user.username)
                const refreshToken = await signRefreshToken(user.username)
                AdminUser.updateOne({_id: user._id}, {active: true}, (err, data) => {
                    if(err) {
                        return res.status(200).json({status: false, data: 'Error while login please try again'})
                    } else {
                        return res.status(200).json({status: true, message: 'Login Successfull', accessToken: accessToken, refreshToken: refreshToken, user})
                    }
                })
            })
        })(req, res, next)
    }
})

passport.use(new LocalStrategy({usernameField: 'username'},
    (username, password, done) =>{
        AdminUser.findOne({username: username}, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'There is no user with this email id.' });
            }
            AdminUser.comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    return done(err)
                }
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    User.findOne({ _id: user._id }, (err, user) => {
        done(err, user)
    })
})

module.exports = router;