const mongoose = require('mongoose')

const Schema = mongoose.Schema

const favGamesSchema = new Schema({
    userName: String,
    gameName: String,
    date: {
        type: String,
        default: Date.now()
    }
})

module.exports = mongoose.model('gamesModel', favGamesSchema)