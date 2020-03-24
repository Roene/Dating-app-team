require('dotenv').config()

userKey = process.env.API_KEY
console.log(userKey)

const axios = require('axios').default

axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': userKey
        },
        data: "fields alternative_names,artworks,category,cover,first_release_date,genres,keywords,name,platforms,rating,release_dates,screenshots,similar_games,storyline,summary,tags,themes,url,version_title,videos,websites;"
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    })