const express   = require('express')
const router    = express.Router()
const multer    = require('multer')
const validator = require('validator')
// OWN FILES
const User          = require('../models/user')
const auth          = require('../middleware/auth')
const dataTop100    = require('../api/outputGames.json')

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
    .get('/match-profile/:_id', auth, (req, res) => {

        const rawId = req.params._id

        User.findOne({ _id : rawId }, (err, foundObject) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                try {
                    const renderData = foundObject 
                    console.log(renderData)
                    res.render('pages/match-profile', { renderData, dataTop100 })
                } catch (err) {
                    res.status(404).send('User not found')
                    console.log(err)
                }
            }
        })
    })

module.exports = router
