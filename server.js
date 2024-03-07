const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var engine = require('ejs-mate')
var session = require('express-session')



const app = express()
// Middle wares
app.session('ejs', engine)
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// run server
const port = 3000


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })