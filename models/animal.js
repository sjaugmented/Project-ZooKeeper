const mongoose = require('mongoose')
const Enclosure = require('./enclosure')

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: String,
    age: Number,
    lastChecked: Date,
    lastKeeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Keeper"
    },
    lastDiagnosis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    currentMeds: [String]
})

const Animal = mongoose.model('Animal', animalSchema)

module.exports = Animal