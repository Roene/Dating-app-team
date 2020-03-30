const dataTop100    = require('./outputGames.json')

let game = "God of War"
let item = dataTop100.find(item => item.name === game)

// console.log(item.screenshots[0].image_id)
// console.log(item.screenshots[0].image_id)

const baseURL = "//images.igdb.com/igdb/image/upload/t_original/"
const bashImageId = item.screenshots[0].image_id
const jpgFormat = ".jpg"

let fullUrl = baseURL.concat(bashImageId, jpgFormat)

console.log(fullUrl)