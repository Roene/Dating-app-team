require('dotenv').config({ path: '../.env' })
const userKey = process.env.API_KEY
const axios = require('axios').default
const fs = require('fs')


// This way of making an export possible is from the video listed below
// SOURCE: https://www.youtube.com/watch?v=ZbtZ_79UmjI
const axiosApiCall = (cb) => {
    axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': userKey
        }, 
        // "where parent_game = n & version_parent = n & themes != (42)" Is from the developer of the algorithm.
        // This is an easy way to approach the real algorithm. Source is the IGDB discord, in their #api channelby user "⚔ Loefvet | IGDB", a developer for IGDB
        data: "fields name,id,rating,popularity,summary,total_rating_count,screenshots.*; where parent_game = n & version_parent = n & themes != (42) & rating_count > 150; sort rating desc; limit 100;"
    })
    .then(response => {
        const topGames = JSON.stringify(response.data, null, 4) //(response.data, null, 6)
        fs.writeFile('./api/outputGames.json', topGames, (err) => {
            if (err) {
                console.log('An error occured while writing the JSON file')
                console.log(err)
            }
            else {
                console.log('The JSON was saved')
            }
        })
    })
    .catch(err => {
        console.error(err)
    })
}


module.exports = axiosApiCall