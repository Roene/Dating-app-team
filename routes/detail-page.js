const express = require('express')
const router = express.Router()

// OWN FILES
const User = require('../models/user')
const auth = require('../middleware/auth')
const dataTop100 = require('../api/outputGames.json')

router
  .get('/match-profile/:_id', auth, (req, res) => {
    const rawId = req.params._id

    User.findOne({ _id: rawId }, (err, foundObject) => {
      if (err) {
        res.status(500).send(err)
      } else {
        try {
          const renderData = foundObject
          res.render('pages/match-profile', { renderData, dataTop100 })
        } catch (err) {
          res.status(404).send('User not found')
        }
      }
    })
  })

module.exports = router
