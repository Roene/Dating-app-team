const express       = require('express')
const bodyParser    = require('body-parser')
const rateLimit     = require("express-rate-limit")
// OWN FILES
const userRoute     = require('./routes/user')
const dbconnection  = require('./db/db')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, //Limit to 100 each IP adres
  message: "Teveel request vanaf dit adres. Voor dev: verander in index.js het max aantal in const limiter"
})

// Make connection to the database
dbconnection()

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(limiter)
    // Set view engine to ejs and let it search in the folder views
    .set('view engine', 'ejs')
    .set('views', 'views')

    .use(userRoute)

    .listen(process.env.PORT || 3000);
