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
    .get('/profile-edit',  auth, (req, res) => { 
        try {
            const user = req.user
            res.render('pages/profile-edit', { user } ) 
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .post('/profile-edit', upload.single('image'), auth, async (req, res) => {
        try {
            const user = req.user

            user.firstname = req.body.firstname,
            user.surname = req.body.surname,
            user.age = req.body.age,
            user.gender = req.body.gender,
            user.email = req.body.email,
            user.description = req.body.description

            await user.save()
            res.redirect('/profile')
        } catch (err) {
            res.status(500).send(err)
        }
    })
    .post('/delete', auth, async (req, res) => {
        try {
            const user = req.user
            await user.remove()
            res.status(204).redirect('/login')
        } catch (err) {
            res.status(500).send(err)
        }
    })

module.exports = router