

module.exports = (app) => {

    app.get('/', (req, res, next) =>{
        res.render('index', {title: 'Index || Rate/Review Company'});
    });

    app.get('/signup', (req, res) => {
        //var errors = req.flash('error');
        res.render('user/signup', {title: 'Sign Up || Rate/Review Company'});
    });
   

//     app.get('/login', (req, res) => {
//         var errors = req.flash('error');
//         res.render('user/login', {title: 'Login || Rate/Review Company', messages: errors, hasErrors: errors.length > 0});
//     });
}
