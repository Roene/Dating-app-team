const express   = require('express')
const router    = express.Router()
const multer    = require('multer')
// OWN FILES
const User      = require('../models/User')
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
    .get('/', auth, (req, res) => {res.render('pages/index')})
    .get('/signup', (req, res) => {res.render('pages/signup')})
    .get('/login', (req, res) => {res.render('pages/login')})
     // SOURCE : https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
     //END OF SOURCE
    .post('/signup', upload.single('image'), async (req, res) => {
        const user = new User({
            firstname: req.body.firstname,
            surname: req.body.surname,
            age: req.body.age,
            gender: req.body.gender,
            image: req.file ? req.file.filename : null,
            email: req.body.email,
            password: req.body.password,
            description: req.body.description
        })
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.cookie('dating_toeken', token, {
                maxAge: (24*7) * 60 * 60 * 1000 // 7 days it is in milliseconds
            })
            res.redirect('/')
        } catch (err) {
            res.status(400).send(err)
        }
    })


module.exports = router