const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
const videoRoutes = require('./routes/videos')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat', // encrpytion key for cookies
      resave: false, // 
      saveUninitialized: false, // 
      store: new MongoStore({ mongooseConnection: mongoose.connection }), // what is mongostore?
    })
)
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) // what is this?
  
app.use('/', mainRoutes)  // this is a route for main
app.use('/todos', todoRoutes) // this is a router for todo
app.use('/videos', videoRoutes)

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!') // this is a funny
})    