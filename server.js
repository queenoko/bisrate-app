const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var ejs = require('ejs')
//const ejsLint = require('ejs-lint')
var engine = require('ejs-mate')
const session = require('express-session')
var mongoose = require('mongoose')
var MongoStore = require('connect-mongo')



const app = express()

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/bisrate')

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
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/bisrate' })
  }))


// Route Methods
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/test', (req, res) => {
  res.render('test')
})


// run server
const port = 3000


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })