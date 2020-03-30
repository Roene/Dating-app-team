const gamesModel = require('../models/games')

function postGamesDD(req, res) {
    const gameData = {
        userName: req.body.userName,
        gameName: req.body.gameName
    }


    const NewDropDownGames = new gamesModel(gameData)

    NewDropDownGames.save((err) => {
        if (err) {
            console.log('Could not save games')
            res.status(400).send('Game was not saved')
        } else {
            console.log('Dropdown game was saved succesfully')
        }
    })
}

module.exports = postGamesDD