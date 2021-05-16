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


router.post('/subscribe', async (req, res) => {
    const filePath = path.join(__dirname, '../view/mailTemplate.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        username: "Bittu"
    };
    const isExist = await Subscriber.find({email: req.body.email})
    if (isExist.length > 0) {
        return res.status(200).json({status: false, message: "This email already exist in our mailing list."})
    }
    const newUser = new Subscriber(req.body)
            newUser.save((err, user) => {
                if (err) {
                    return res.status(200).json({status: false, message: "Error while adding to subscribe list, please try again latter"})
                } else {
                    const htmlToSend = template(replacements);
                    sendMail({
                      from: `Newslatter <no-reply@buddyest.com>`, // sender address
                      to: req.body.email, // list of receivers
                      subject: "Welcome on board", // Subject line
                      html: htmlToSend, // html body
                    }, (err, data) => {
                        if(err) {
                          return res.status(200).json({status: false, message: "Error while adding to subscribe list, please try again latter"})
                        } else {
                            return res.status(200).json({status: true, message: "You are successfully subscribed for the newslatter"})
                        }
                    });
                }
            })
})

router.post('/sendToAll', async (req, res) => {
    const subs = await Subscriber.find()
    var emailList = [];
    for (let i = 0; i < subs.length; i++) {
       emailList.push(subs[i].email);
    }
    emailList = emailList.join(", ");
    sendMail({
        from: `Newslatte admin`, // sender address
        to: emailList, // list of receivers
        subject: req.body.subject, // Subject line
        html: req.body.message, // html body
      }, (err, data) => {
          if(err) {
            return res.status(200).json({status: false, error: err})
          } else {
            return res.status(200).json({status: true, data})
          }
      })
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