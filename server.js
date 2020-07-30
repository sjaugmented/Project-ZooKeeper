// require statements
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const app = express()

// database connection
const connectionString = 'mongodb://localhost/'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${connectionString}`))
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'))
mongoose.connection.on('error', (err) => console.log('Mongoose error', err))



