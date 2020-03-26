const express   = require('express')
const router    = express.Router()
const multer    = require('multer')
const validator = require('validator')
// OWN FILES
const User      = require('../models/user')
const auth      = require('../middleware/auth')

const storage   = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'static/upload/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router
    .get('/profile', auth, (req, res) => {
        try {
            const user = req.user
            res.render('pages/profile', {user})
        } catch (err) {
            res.status(500).send(err)
        }
    })

module.exports = router