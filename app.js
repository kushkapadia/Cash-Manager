const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express()


let sessionOptions = session({
    secret:  "Maheshmati is Ruled by BhalalDev Instead of Baahubali",
    store: MongoStore.create({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 48, httpOnly: true}
})

app.use(sessionOptions)


app.use(function(req, res, next){
res.locals.user = req.session.user
next()
})

const router = require('./router')
// const router = require('./router')
const userController = require('./controllers/userController')
//To access the data user inputs in form.
app.use(express.urlencoded({extended: false}))
//just a bolierplate code, tells our express server to add the user submitted data to request object.
app.use(express.json())


app.use(express.static('public'))
//We are telling our express server to make the folder accessible.
//in public folder there are all the files who that we want to show all the visitors of our app. (css, browser.js, etc)
app.set('views', 'views')
//a has to be views, it is an express option(views configeration).b is the folder created for our views.
app.set('view engine', 'ejs')
//The template system we are using is ejs. There are many different options in javascript community
//npm install ejs


// app.use(userController.passwordProtected)

app.use('/', router)


module.exports = app
