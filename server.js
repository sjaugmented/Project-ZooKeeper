const express = require('express');
const connectDB = require('./DB/Connection.js')
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override')

// LOCAL DB CONNECTION
const connectionString = 'mongodb://localhost/zookeeper'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${connectionString}`))
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'))
mongoose.connection.on('error', (err) => console.log('Mongoose error:', err))


// ATLAS DB CONNECTION
// connectDB();
// //returning json data
// app.use(express.json({ extended: false }));

// // TODO: remove?
// //app.use('/controllers/animals', require('./controllers/animals'));


// MIDDLEWARE
app.use(express.static('./' + '/public'))
app.use(express.urlencoded({
    extended: false
}))
app.use(methodOverride('_method'))


// ROOT ROUTE
app.get('/', async (req, res) => {
    await res.render('home.ejs')
})

// ROUTERS
const enclosuresRouter = require('./routes/enclosures')
//const animalsRouter = require('./routes/animals')
app.use('/enclosures', enclosuresRouter)
//app.use('/animals', animalsRouter)

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log('Server started'));
