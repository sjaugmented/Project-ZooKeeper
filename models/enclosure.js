const mongoose = require('mongoose')
const Animal = require('./animal')

const enclosureSchema = new mongoose.Schema({
    name: {type: String, required: true},
    keeper: String,
    lastChecked: Date,
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    }],
    comments: String,
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // }],
    img: String
})

const Enclosure = mongoose.model('Enclosure', enclosureSchema)

module.exports = Enclosure