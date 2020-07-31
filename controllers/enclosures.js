const Enclosure = require('../models/enclosure')
const Animal = require('../models/animal')

const newView = (req, res) => {
    res.render('enclosures/new.ejs')
}

const create = async (req, res) => {
    try {

    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const index = async (res, req) => {
    try {

    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const show = async (res, req) => {
    try {

    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const deleteData = async (res, req) => {
    try {

    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const edit = async (res, req) => {
    try {

    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

const update = async (res, req) => {
    try {

    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}


module.exports = {
    new: newView,
    create,
    index,
    show,
    delete: deleteData,
    edit,
    update
}