const mongoose = require('mongoose')
const Enclosure = require('./enclosure')
const Animal = require('./animal')
const Keeper = require('./keeper')

const commentSchema = new mongoose.Schema({
    body: String,
    urgent: Boolean
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment