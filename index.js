const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
require('dotenv').config()
// OWN FILES
const userRoute = require('./routes/user')
const profileRoute = require('./routes/profile')
const detailRoute = require('./routes/detail-page')
const dbconnection = require('./db/db')
const axiosApiCall = require('./api/searchGames')
const apiTime = process.env.API_TIME

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Teveel request vanaf dit adres.'
})

dbconnection()

const apiTimer = setInterval(function () {
  axiosApiCall()
}, apiTime)

apiTimer

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true
    })
  )
  .use(flash())
  .use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
  })
  .use(limiter)
  .use(helmet())
  .use(helmet.featurePolicy({
    features: {
      camera: ["'self'"],
      geolocation: ["'none'"],
      midi: ["'none'"],
      usb: ["'none'"],
      magnetometer: ["'none'"],
      pictureInPicture: ["'self'"],
      accelerometer: ["'none'"],
      gyroscope: ["'none'"],
      microphone: ["'self'"]
    }
  }))
  .use(helmet.referrerPolicy({
    policy: 'strict-origin-when-cross-origin'
  }))
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(userRoute)
  .use(profileRoute)
  .use(detailRoute)
  .use('/static', express.static('static'))
  .use((req, res) => {
    res.status(404).render('pages/not-found')
  })

  .listen(process.env.PORT || 3000)
