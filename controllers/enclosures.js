const Enclosure = require('../models/enclosure')
const Animal = require('../models/animal')

const newView = (req, res) => {
    res.render('enclosures/new.ejs')
}

module.exports = {
    new: newView
}