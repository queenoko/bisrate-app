const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const async = require('async')
const crypto = require('crypto')
var User = require('../models/user')
var secret = require('../secret/secret')

module.exports = (app, passport) => {

    app.get('/', (req, res, next) =>{
        res.render('index', {title: 'Index || Rate/Review Company'});
    });

    app.get('/signup', (req, res) => {
        var errors = req.flash('error');
        console.log(errors)
        res.render('user/signup', {title: 'Sign Up || Rate/Review Company', messages: errors, hasErrors: errors.length > 0})
    });

    app.post('/signup', signupValidation, passport.authenticate('local.signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));
   

    app.get('/login', (req, res) => {
        var errors = req.flash('error');
        res.render('user/login', {title: 'Login || Rate/Review Company', messages: errors, hasErrors: errors.length > 0})
    });

    app.post('/login', loginValidation, passport.authenticate('local.login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash : true
    }));

    app.get('/home', (req, res) => {
        res.render('home', {title: 'Home || Rate/Review Company'});
    });

    app.get('/forgot', (req, res) => {
        var errors = req.flash('error');
        var info = req.flash('info');
        res.render('user/forgot', {title: 'Request Password Reset', messages: errors, hasErrors: errors.length > 0, info: info, noErrors: info.length > 0});
	});

    app.post('/forgot', async (req, res, next) => {
        try {
            const rand = await new Promise((resolve, reject) => {
                crypto.randomBytes(20, (err, buf) => {
                    if (err) reject(err);
                    else resolve(buf.toString('hex'));
                });
            });
    
            const user = await User.findOne({ 'email': req.body.email });
            if (!user) {
                req.flash('error', 'No Account With That Email Exist Or Email is Invalid');
                return res.redirect('/forgot');
            }
    
            user.passwordResetToken = rand;
            user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
    
            await user.save();
    
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: secret.auth.user,
                    pass: secret.auth.pass
                }
            });
    
            const mailOptions = {
                to: user.email,
                from: 'Rate/Review My Business <' + secret.auth.user + '>',
                subject: 'Rate/Review My Business Application Password Reset Token',
                text: 'You have requested for password reset token. \n\n' +
                    'Please click on the link to complete the process: \n\n' +
                    'http://localhost:3000/reset/' + rand + '\n\n'
            };
    
            await smtpTransport.sendMail(mailOptions);
    
            req.flash('info', 'A password reset token has been sent to ' + user.email);
            res.redirect('/forgot');
        } catch (err) {
            next(err);
        }
    });
    
}


function signupValidation(req, res, next) {
    body('fullname', 'Fullname is Required').notEmpty(),
    body('fullname', 'Fullname Must Not Be Less Than 5').isLength({ min: 5 }),
    body('email', 'Email is Required').notEmpty(),
    body('email', 'Email is Invalid').isEmail(),
    body('password', 'Password is Required').notEmpty(),
    body('password', 'Password Must Not Be Less Than 5').isLength({ min: 5 }),
    body('password', 'Password Must Contain at least 1 Number').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array().map(error => error.msg);
        req.flash('error', messages);
        return res.redirect('/signup');
    } else {
        return next();
    }
}


// Middleware for login validation
function loginValidation(req, res, next) {
    body('email', 'Email is Required').notEmpty(),
    body('email', 'Email is Invalid').isEmail(),
    body('password', 'Password is Required').notEmpty(),
    body('password', 'Password Must Not Be Less Than 5').isLength({ min: 5 }),
    body('password', 'Password Must Contain at least 1 Number').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const messages = errors.array().map(error => error.msg);
        req.flash('error', messages);
        return res.redirect('/login');
    } else {
        return next();
    }
}