const express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var engine = require('ejs-mate')
var session = require('express-session')



const app = express()
app.use(myLo)



const port = 3000


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })