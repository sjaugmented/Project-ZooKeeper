const express = require('express');
const connectDB = require('./DB/Connection.js')
const app = express();


// middleware
app.use(express.static ('./' +'/public'))

connectDB();
//returning json data
app.use(express.json({ extended: false }));

app.use('/api/userModel',require('./controllers/Animals'));
const Port = process.env.Port || 3000;

app.listen(Port, () => console.log('Server started'));
