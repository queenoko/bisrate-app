module.exports = (app, passport) => {

    app.get('/', (req, res, next) =>{
        res.render('index', {title: 'Index || Rate/Review Company'});
    });

    app.get('/signup', (req, res) => {
        var errors = req.flash('error');
        res.render('user/signup', {title: 'Sign Up || Rate/Review Company'})
    });

    app.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));
   

    app.get('/login', (req, res) => {
        //var errors = req.flash('error');
        res.render('user/login', {title: 'Login || Rate/Review Company'})
    });
}
