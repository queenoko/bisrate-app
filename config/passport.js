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

       User.findOne({'email':email})
       .then((user) => {
        if (!user) {
            User.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: User.encryptPassword(req.body.password)
            })
        }

        if (user) {
            return done(null, user)
        }
       })
       .catch((err) => console.log(err))
}))
