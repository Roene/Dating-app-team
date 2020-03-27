const express       = require('express')
const bodyParser    = require('body-parser')
const rateLimit     = require("express-rate-limit")
const helmet        = require("helmet")
// OWN FILES
const userRoute     = require('./routes/user')
const profileRoute  = require('./routes/profile')
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
    .use(helmet())
    .use(helmet.featurePolicy({
      features: {
      camera: ["'self'"],
      geolocation:["'none'"],
      midi:["'none'"],
      usb:["'none'"],
      magnetometer:["'none'"],
      pictureInPicture:["'self'"],
      accelerometer:["'none'"],
      gyroscope:["'none'"],
      microphone:["'self'"]
    }}))
    .use(helmet.referrerPolicy({
      policy: 'strict-origin-when-cross-origin'
    }))
    // Set view engine to ejs and let it search in the folder views
    .set('view engine', 'ejs')
    .set('views', 'views')

    .use(userRoute)
    .use(profileRoute)

    .listen(process.env.PORT || 3000);
