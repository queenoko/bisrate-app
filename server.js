const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var engine = require('ejs-mate')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')



const app = express()

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bisrate')

// Middle wares
app.use(express.static('public'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// save cookie session ID
app.use(session({
    secret: 'Thisismytestkey',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }))


// Route Methods
app.get('/', (req, res) => {
  res.render('index')
})


// run server
const port = 3000


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })