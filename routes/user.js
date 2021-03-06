const express = require('express')
const router = express.Router()
const multer = require('multer')
const validator = require('validator')
const multerGoogleStorage = require('multer-google-storage')
// OWN FILES
const User = require('../models/user')
const auth = require('../middleware/auth')
const dataTop100 = require('../api/outputGames.json')

const upload = multer({
  storage: multerGoogleStorage.storageEngine({ bucket: 'datingapp' })
})

router
  .get('/', auth, (req, res) => {
    const searchValue = req.query
    searchAge = searchValue.age = { $gte: req.query.ageMin || 18, $lte: req.query.ageMax || 126 }
    let users

    Object.keys(searchValue).forEach(function (key) {
      switch (key) {
        case 'firstname' :
          const nameCapitalized = searchValue[key].charAt(0).toUpperCase() + searchValue[key].slice(1)
          searchValue[key] = nameCapitalized
          break
        case 'age' :
          break
        case 'gender' :
        case 'favorite' :
          break
        case 'ageMin':
        case 'ageMax':
        case 'save' :
        default :
          delete searchValue[key]
          return
      }

      switch (searchValue[key]) {
        case '' :
        case undefined :
        case null :
        case isNaN() :
          delete searchValue[key]
          break
        default :
          break
      }
    })

    users = User.find(searchValue)

    users
      .then((users) => {
        try {
          res.render(('pages/index'), { users, dataTop100 })
        } catch (err) {
          res.status(500).send(err)
        }
      })
  })

  .get('/search', auth, (req, res) => {
    const searchValue = req.query
    searchAge = searchValue.age = { $gte: req.query.ageMin || 18, $lte: req.query.ageMax || 126 }
    let users

    Object.keys(searchValue).forEach(function (key) {
      switch (key) {
        case 'firstname' :
          const nameCapitalized = searchValue[key].charAt(0).toUpperCase() + searchValue[key].slice(1)
          searchValue[key] = nameCapitalized
          break
        case 'age' :
          break
        case 'gender' :
        case 'favorite' :
          break
        case 'ageMin':
        case 'ageMax':
        case 'save' :
        default :
          delete searchValue[key]
          return
      }

      switch (searchValue[key]) {
        case '' :
        case undefined :
        case null :
        case isNaN() :
          delete searchValue[key]
          break
        default :
          break
      }
    })

    users = User.find(searchValue)

    users
      .then((users) => {
        try {
          res.render(('pages/search'), { users, dataTop100 })
        } catch (err) {
          res.status(500).send(err)
        }
      })
  })
  .get('/signup', (req, res) => { res.render('pages/signup', { dataTop100 }) })
  .get('/login', (req, res) => { res.render('pages/login') })

// SOURCE : https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
  .post('/login', async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findByCredentials(email, password)
      if (!user) {
        res.status(401).send('U heeft geen toegang')
      }
      const token = await user.generateAuthToken()
      res.cookie('dating_token', token, {
        maxAge: (24 * 7) * 60 * 60 * 1000
      })
      res.redirect('/')
    } catch (err) {
      req.flash('error_msg', 'Email of wachtwoord klopt niet')
      res.redirect('/login')
    }
  })
// END OF SOURCE
  .post('/signup', upload.single('image'), async (req, res) => {
    const user = new User({
      firstname: req.body.firstname,
      surname: req.body.surname,
      age: req.body.age,
      gender: req.body.gender,
      image: req.file ? req.file.filename : null,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description,
      favorite: req.body.gameName
    })

    if (validator.isEmail(user.email)) {
      console.log('this is an email')
    } else {
      console.log('this is not an email')
    }

    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.cookie('dating_token', token, {
        maxAge: (24 * 7) * 60 * 60 * 1000
      })
      req.flash('success_msg', 'Je bent geregistreerd en kan inloggen')
      res.redirect('/login')
    } catch (err) {
      res.status(400).send(err)
    }
  })

  .get('/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
      })
      await req.user.save()
      res.clearCookie('dating_token')
      req.flash('error_msg', 'Je bent succesvol uitgelogd')
      res.redirect('/login')
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = router
