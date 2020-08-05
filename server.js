const express = require('express');
require('dotenv').config()
const connectDB = require('./DB/Connection.js')
const mongoose = require('mongoose')
const session = require('express-session')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const app = express();
const enclosuresRouter = require('./routes/enclosures')
const animalsRouter = require('./routes/animals')
const sessionsRouter = require('./routes/sessions')




// ATLAS DB CONNECTION
//connectDB();
// //returning json data
// app.use(express.json({ extended: false }));


// // TODO: remove?
// app.use('/controllers/animals', require('./controllers/animals'));


// MIDDLEWARE
app.use(session({
    secret: "epsteinHangedHimself",
    resave: false,
    saveUninitialized: false
}))
app.use(express.static('./' + '/public/'))
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(ejsLayouts)

// ROOT ROUTE
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.render('home', {
            user: req.session
        })
    } else {
        res.render('login.ejs')
    }
})

// ROUTERS
app.use('/', sessionsRouter)
app.use('/enclosures', enclosuresRouter)
app.use('/animals', animalsRouter)



const PORT = process.env.Port || 3000;
app.listen(PORT, () => console.log('Server started'));
