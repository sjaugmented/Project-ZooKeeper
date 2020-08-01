const mongoose = require('mongoose')
const Animal = require('./animal')
const Keeper = require('./keeper')
const Comment = require('./comment')

const enclosureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    keeper: { type: mongoose.Schema.Types.ObjectId, ref: 'Keeper' },
    lastChecked: Date,
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    img: String
})

const Enclosure = mongoose.model('Enclosure', enclosureSchema)

module.exports = Enclosure