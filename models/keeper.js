const mongoose = require('mongoose')

const keeperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: String,
    img: String
})

const Keeper = mongoose.model('Keeper', keeperSchema)

module.exports = Keeper