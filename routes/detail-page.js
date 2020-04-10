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
        // MOET MOGELIJK NOG GECHECKT WORDEN
        const rawId = req.params._id
        // const searchId = rawId.substr(2)
        // console.log(searchId)
        
        User.findOne({ _id : rawId }, (err, foundObject) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (!foundObject) {
                    res.status(404).send('User not found')
                    console.log('User could not be found')
                } else {
                    const renderData = foundObject 
                    console.log(renderData)
                    res.render('pages/match-profile', { renderData, dataTop100 })
                }
            }
        })
        
    })

module.exports = router

// const name = req.body.userName
//     console.log(name)

//     gamesModel.findOne({ userName: name }, (err, foundObject) => {
//       if (err) {
//         console.log(err)
//         res.status(500).send()
//       } else {
//         if (!foundObject) {
//           res.status(404).send('404, User: ' + name + ' not found')
//           console.log('Could not find user')
//         } else {
//           if (req.body.name) {
//             foundObject.name = req.body.name
//           }
//           //   ZORGEN DAT GAME RENDER PLAATS VIND
//           const userData = foundObject
//           console.log(userData)
//           res.render('pages/profile', { userData, top100Games })
//         }
//       }
//     })
//   })