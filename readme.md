# Dating app
This is a prototype dating app for the Hogeschool of Amsterdam, CMD blok Tech 2019/2020 assesment A2. In this prototype we worked with a team of 3 people :

* [Jelmer Lubberts](https://github.com/jelub2)
* [Andres Pinto](https://github.com/khualu)
* [Roene Verbeek](https://github.com/Roene)

We combined our features to a working protorype, this prototype is for gamers where you can make your own profile by filling in your personal details en select your favorite game from a list of top 100 games.

![Login](https://i.imgur.com/pw3hG7I.png)
![index](https://i.imgur.com/DRpB2oI.png)
![own-profile](https://i.imgur.com/vkKCn6A.png)
![Login](https://i.imgur.com/lh9qdwB.png)


## Table of contents
1. [To-Do](#to-do)
2. [Install](#install)
3. [Database](#database)
4. [Api calls](#api-calls)
5. [Security](#security)
6. [Topics](#topics)
7. [Folder structure](#folder-structure)
8. [Packages](#packages)
9. [License](#license)

## To-do
In this project we wanted to complete a lot of things for our prototype. Here you can find what we finished and what we would have added if we had more time for this project.

- [X] User can sign-up
- [X] User can login
- [X] List of 100 games from API
- [X] Security against brute force attacks
- [X] Security for people who haven't signed up yet
- [X] User can logout
- [X] User can edit profile
- [X] User can delete profile
- [X] User can search to find other users
- [X] User can view other users
- [X] User can see detail page from other users
- [ ] User can like and dislike other users
- [ ] User can chat with oter users
- [ ] User can have a private chat with other user

## Install
If you want to run this project on your own device you have to follow our steps.

First you need to make a database we use MongoDB cloud. You can make free account if you follow this [guide](https://www.mongodb.com/cloud/atlas). If you have created your database we can go to te next step.

The next step is to make an account on the [IGDB API](https://api.igdb.com/) website. Because we use this external API you have to get a API key from here to use our project.

Next step is to create a Google Cloud Storage account, because we upload images to a Google cloud storage bucket. Follow this [guide](https://cloud.google.com/storage/docs/how-to) to create a Google cloud Storage account and a bucket you have to make.

Now you have your database, API key and a Google cloud storage bucket it is time to clone this project. Go to your terminal and go to the folder where you want to have this project, then you have to do this
```
git clone https://github.com/Roene/Dating-app-team.git
```
Now you have cloned the project you have to go to the folder by doing this
```
cd Dating-app-team
```
Now you have the project on your device. Next step is to install the **node_modules** by running this command
```
npm install
```
Now you have all the packages to run this project. The last step is to create a file named **.env**, in here you have to put the following key values
```
MONGODB_URI=<URL to database>
JWT_KEY=<Random text>
API_KEY=<API key>
API_TIME=<Time value for example 60000>
GCS_BUCKET=<BucketName>
GCLOUD_PROJECT=<BucketID>
GCS_KEYFILE=<JSON File name you get from the bucket>
```

Now it is time to run the project, you can do this by using this command
```
npm test
```
**OR**
```
npm start
```
Now you can visit our app at `localhost:3000`. 

## Database
For our database we use the Mongoose package. The model can be found in the folder **models/User.js**.
```js
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  favorite: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  tokens: [{
    token: {
      type: String,
      require: true
    }
  }]
})
```
And this is data in the datbase : 
![Imgur](https://i.imgur.com/qZhxEgp.png)

## API calls
The format for the API calls is based on the npm package `Axios`. The basic form for a request to the `games` endpoint will look like this:
```javascript
axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': userKey
        },
        data: "fields name,id,rating,popularity,summary; where name = Overwatch;"
    })
    .then(response => {
       console.log(response.data)
    })
    .catch(err => {
        console.error(err)
    })
```

## Security

For security we use multiple packages to ensure our data is somewhat secured.

List of packages:  
+ rate-limit  
+ validator
+ helmet

### rate-limit
To prevent our site from Denial of service we installed rate-limiter. We have set the maximum of request to 300 each 15 minutes. This is easy to set to another value. For now we took a high number, because we are in the development fase and it could be possible to reach to the 300 requests.

### validator
This packages makes sure the values send to the server are what they supposed to be. Due to lack of time this still needs some attention, till now we only have a `console.log` to check if at the registerform an e-mail is a correctly formulated e-mail. We could work this out to check every input and send feedback to the users if the values aren't correct.

### Helmet
Helmet is a package that deals with the HTTP-headers. For instance If you're app is developed with Express a header is set to Express. With this information it's easier to attack our server with specific Express attacks. Helmet sets this to another value.  

Express also deals with the acces to sensors in the client's device. Our site or third-parties(If adds will ever become a thing on Aite) won't be able to access the microphone or camera ever.  

For the implementation of the security packages there is more information in the [wiki](https://github.com/Roene/Dating-app-team/wiki/Security).

## Topics
Everyone had to pick 1 topic from this [list](https://docs.google.com/document/d/e/2PACX-1vR8ETKWNJqVilyVYdPE6vHoYSoSJT7CaKFy4s1a5in9rt0IF-tujSr3TffwuE9TNDaNnMhtNoA_7Kf7/pub). The research for the chosen topics can be found in the wiki :

* [Externap API](https://github.com/Roene/Dating-app-team/wiki/Feature-External-API)
* [Security](https://github.com/Roene/Dating-app-team/wiki/Security)
* [Hash passwords](https://github.com/Roene/Dating-app-team/wiki/Hash-the-passwords-you-store-in-the-database)

## Folder structure
In our project we tried to split up functions and folders to keep it clean.
In the folder **API** you can find the connection to the external API we use and the JSON file where the games will be saved. In the folder **db** you can find the connection to the database. In the **middleware** folder you can find the authentication file where we want to check if a person who is trying to access a specific resource is authorized to access it.

In the folder **routes** we have different files which handle routes when we visit a url for example `localhost:3000/sign-up` or `localhost:3000/profile`. In the **views** folder we have to other folders, **pages** and **partials** this is for the frontend all written in ejs. In the folder **static** we have static files like CSS and JavaScript.

## Packages
In this project we use the following packages :
* axios
* bcrypt
* body-parser
* connect-flash
* dotenv
* ejs
* express
* express-rate-limit
* express-ejs-layouts
* helmet
* jsonwebtoken
* mongoose
* multer
* multer-google-storage
* rate-limit
* validator

## License
[MIT](https://github.com/Roene/Dating-app-team/blob/master/LICENSE.md) © [Jelmer Lubberts](https://github.com/jelub2) & [Andres Pinto](https://github.com/khualu) & [Roene Verbeek](https://github.com/Roene)
