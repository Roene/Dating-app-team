require('dotenv').config()
const userKey = process.env.API_KEY
const axios = require('axios').default

axios({
    url: "https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': userKey
    },
    data: "fields name,id,summary; sort popularity desc; limit 10;"
})
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });