require('dotenv').config()
const userKey = process.env.API_KEY
const axios = require('axios').default
const fs = require('fs')

axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': userKey
        }, 
        // "where parent_game = n & version_parent = n & themes != (42)" Is from the developer of the algorithm.
        // This is an easy way to approach the real algorithm. Source is the IGDB discord, in their #api channel
        data: "fields name,id,rating,popularity,summary,total_rating_count; where parent_game = n & version_parent = n & themes != (42) & rating_count > 150; sort rating desc; limit 100;"
    })
    .then(response => {
        const topGames = JSON.stringify(response.data, null, 4)
        // console.log(topGames)
        fs.writeFile('./api/outputGames.json', topGames, (err) => {
            if (err) {
                console.log('An error occured while writing the JSON file')
            }
            else {
                console.log('The JSON was saved')
            }
        })
    })
    .catch(err => {
        console.error(err)
    });
