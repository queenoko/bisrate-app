const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
var ejs = require('ejs')
var engine = require('ejs-mate')
const session = require('express-session')
var mongoose = require('mongoose')
var MongoStore = require('connect-mongo')
var passport = require('passport')
var flash = require('connect-flash')


//lunch express app
const app = express()

//mongoose.Promise = global.Promise();
// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/bisrate')

require('./config/passport')
require('./secret/secret')

// Middle wares
app.use(express.static('public'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Express-validator middleware

// app.use(
//   body('fullname', 'Fullname is Required').notEmpty(),
//   body('fullname', 'Fullname Must Not Be Less Than 5').isLength({min: 5}),
//   body('email', 'Email is Required').notEmpty(),
//   body('email', 'Email is Invalid').isEmail(),
//   body('password', 'Password is Required').notEmpty(),
//   body('password', 'Password Must Not Be Less Than 5').isLength({ min: 5 }),
//   body('password', 'Password Must Contain at least 1 Number').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i")
//   // Add more validations as needed
// );
//app.use(validator());


// save cookie session ID
app.use(session({
    secret: 'Thisismytestkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/bisrate' })
  }))

  app.use(flash())

  app.use(passport.initialize())
  app.use(passport.session())

  require('./routes/user')(app, passport)
  require('./routes/company')(app)

// run server
const port = 3000

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })