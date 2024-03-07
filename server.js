const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var engine = require('ejs-mate')
const session = require('express-session')
const mongoose = require('mongoose')
var MongoStore = require('connect-mongo')


//lunch express app
const app = express()

// Connect MongoDB
mongoose.connect('mongodb://localhost/bisrate')

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
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/bisrate' })
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