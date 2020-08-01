const mongoose = require('mongoose')
const Enclosure = require('./enclosure')
const Animal = require('./animal')
const Comment = require('./comment')

const keeperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: String,
    img: String
})

const Keeper = mongoose.model('Keeper', keeperSchema)

module.exports = Keeper