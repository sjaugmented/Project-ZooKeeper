const mongoose = require('mongoose')
const Enclosure = require('./enclosure')

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: String,
    age: Number,
    lastChecked: Date,
    lastKeeper: String,
    comments: String,
    currentMeds: [String],
    img: String
})

const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal