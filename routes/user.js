const express   = require('express')
const router    = express.Router()
// OWN FILES
const User      = require('../models/User')
const auth      = require('../middleware/auth')

router
    .get('/', auth, (req, res) => {res.render('pages/index')})
    .get('/signup', (req, res) => {res.render('pages/signup')})
    .get('/login', (req, res) => {res.render('pages/login')})


module.exports = router