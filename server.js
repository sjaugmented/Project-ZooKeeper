const express = require('express');
const connectDB = require('./DB/Connection.js')
const mongoose = require('mongoose')
const app = express();



// middleware
app.use(express.static('./' + '/public'))



connectDB();
//returning json data
app.use(express.json({ extended: false }));

// TODO: remove?
//app.use('/controllers/animals', require('./controllers/animals'));

const enclosuresRouter = require('./routes/enclosures')
//const animalsRouter = require('./routes/animals')
app.use('/enclosures', enclosuresRouter)
//app.use('/animals', animalsRouter)

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log('Server started'));
