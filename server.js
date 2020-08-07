// REQUIREMENTS
const express = require('express');
require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express();

// PASSPORT
require('./config/passport')

// MIDDLEWARE
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(ejsLayouts)


// ROOT ROUTE
app.get('/', (req, res) => {
    if (req.user) {
        console.log(req.user)
        res.render('home', {
            user: req.user
        })
    } else {
        res.render('login.ejs')
    }
})

// ROUTERS
const enclosuresRouter = require('./routes/enclosures')
const animalsRouter = require('./routes/animals')
const sessionsRouter = require('./routes/sessions')

app.use('/', sessionsRouter)
app.use('/enclosures', enclosuresRouter)
app.use('/animals', animalsRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Listening on port: ' + process.env.PORT));
