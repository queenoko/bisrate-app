var passport = require('passport')
var User = require('../models/user');
const user = require('../routes/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email })
        .then((user) => {
            if (!user) {
                // Hash the password before saving
                const hashedPassword = User.encryptPassword(req.body.password);

                // Create a new user with hashed password
                User.create({
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hashedPassword
                }).then(newUser => {
                    return done(null, newUser);
                }).catch(err => {
                    return done(err);
                });
            } else {
                return done(null, user);
            }
        })
        .catch((err) => {
            return done(err);
        });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    User.findOne({'email': email})
        .then(user => {
            if (!user || !user.validPassword(password)) {
                const messages = ['Email Does Not Exist Or Password is Invalid'];
                return done(null, false, req.flash('error', messages));
            }
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}));