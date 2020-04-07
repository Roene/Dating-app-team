# Dating app
This is a prototype dating app for the Hogeschool of Amsterdam, CMD blok Tech 2019/2020 assesment A2. In this prototype we worked with a team of 3 people : 

* [Jelmer Lubberts](https://github.com/jelub2)
* [Andres Pinto](https://github.com/khualu)
* [Roene Verbeek](https://github.com/Roene)

We combined our features to a working protorype, this prototype is for gamers where you can make your own profile by filling in your personal details en select your favorite game from a list of top 100 games. 

**ADD IMAGES**

## Table of contents
1. [To-Do](#to-do)
2. [Install](#install)
3. [Topics](#topics)
4. [Folder structure](#folder-structure)
5. [Packages](#packages)
6. [License](#license)

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
- [ ] User can see detail page from other users
- [ ] User can like and dislike other users
- [ ] User can chat with oter users
- [ ] User can have a private chat with other user

## Install
If you want to run this project on your own device you have to follow our steps. 

First you need to make a database we use MongoDB cloud. You can make free account if you follow this [guide](https://www.mongodb.com/cloud/atlas). If you have created your database we can go to te next step. 

The next step is to make an account on the [IGDB API](https://api.igdb.com/) website. Because we use this external API you have to get a API key from here to use our project.

Now you have your database and API key it is time to clone this project. Go to your terminal and go to the folder where you want to have this project, then you have to do this 
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
```

Now it is time to run the project, you can do this by using this command
```
npm test
```
**OR**
```
npm start
```

## Folder structure
In our project we tried to split up functions and folders to keep it clean. 
In the folder **API** you can find the connection to the external API we use and the JSON file where the games will be saved. In the folder **db** you can find the connection to the database. In the **middleware** folder you can find the authentication file where we want to check if a person who is trying to access a specific resource is authorized to access it. 

In the folder **routes** we have different files which handle routes when we visit a url for example `localhost:3000/sign-up` or `localhost:3000/profile`. In the **views** folder we have to other folders, **pages** and **partials** this is for the frontend all written in ejs. In the folder **static** we have static files like CSS and JavaScript.

## Topics
Everyone had to pick 1 topic from this [list](https://docs.google.com/document/d/e/2PACX-1vR8ETKWNJqVilyVYdPE6vHoYSoSJT7CaKFy4s1a5in9rt0IF-tujSr3TffwuE9TNDaNnMhtNoA_7Kf7/pub). The research for the chosen topics can be found in the wiki : 

* [Externap API](https://github.com/Roene/Dating-app-team/wiki/Feature-External-API)
* [Security](https://github.com/Roene/Dating-app-team/wiki/Security)
* [Hash passwords](https://github.com/Roene/Dating-app-team/wiki/Hash-the-passwords-you-store-in-the-database)

## Packages
In this project we use the following packages : 
* axios
* bcrypt
* body-parser
* dotenv
* ejs
* express
* express-rate-limit
* helmet
* igdb-api-node
* jsonwebtoken
* mongoose
* multer
* node-fetch
* unirest
* rate-limit
* validator

## License
[MIT](https://github.com/Roene/Dating-app-team/blob/master/LICENSE.md) © [Jelmer Lubberts](https://github.com/jelub2) & [Andres Pinto](https://github.com/khualu) & [Roene Verbeek](https://github.com/Roene)