const { body, validationResult } = require('express-validator');
module.exports = (app, passport) => {

    app.get('/', (req, res, next) =>{
        res.render('index', {title: 'Index || Rate/Review Company'});
    });

    app.get('/signup', (req, res) => {
        var errors = req.flash('error');
        console.log(errors)
        res.render('user/signup', {title: 'Sign Up || Rate/Review Company', messages: errors, hasErrors: errors.length > 0})
    });

    app.post('/signup', validate, passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));
   

    app.get('/login', (req, res) => {
        //var errors = req.flash('error');
        res.render('user/login', {title: 'Login || Rate/Review Company'})
    });
}


function validate(req, res, next) {
    // Define validation rules using 'body' method
    // Example: body('fieldname').validationChain()
    // Replace 'fieldname' with the actual field name you want to validate

    // body('fullname', 'Fullname is Required').notEmpty();
    // body('fullname', 'Fullname Must Not Be Less Than 5').isLength({min: 5});
    // body('email', 'Email is Required').notEmpty();
    // body('email', 'Email is Invalid').isEmail();
    // body('password', 'Password is Required').notEmpty();
    // body('password', 'Password Must Not Be Less Than 5').isLength({min: 5});
    // body('password', 'Password Must Contain at least 1 Number').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

    // Check for validation errors
    const errors = validationResult(req);
    
    // If there are errors, store them in flash and redirect
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        req.flash('error', errorMessages);
        return res.redirect('/signup');
    }

    // If no errors, proceed to the next middleware
    next();
}
