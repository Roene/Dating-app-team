const express       = require('express')
const bodyParser    = require('body-parser')

// OWN FILES
const userRoute = require('./routes/user')

express()
    .use('/static', express.static('static'))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    // Set view engine to ejs and let it search in the folder views
    .set('view engine', 'ejs')
    .set('views', 'views')

    .use(userRoute)

    .listen(process.env.PORT || 3000);