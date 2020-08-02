const Animal = require('../models/animal')
const Enclosure = require('../models/enclosure')



const newView = (req, res) => {
    res.render('animals/new.ejs')
}

const create = async (req, res) => {
    try {
        await Animal.create(req.body)
        res.redirect('/animals')
    } catch (err) {
        res.send('Looks like something went wrong...')
        console.log(err)
    }
}

const index = async (req, res) => {
    try {
        const foundAnimals = await Animal.find({})
        res.render('animals/index.ejs', {
            animals: foundAnimals
        })
    } catch (err) {
        res.send('Looks like something went wrong...')
        console.log(err)
    }
}

const show = async (req, res) => {
    try {
        const foundAnimal = await Animal.findById(req.params.id)
        res.render('animals/show.ejs', {
            animal: foundAnimal
        })
    } catch (err) {
        res.send('Looks like something went wrong...')
        console.log(err)
    }
}

const deleteData = async (req, res) => {
    try {
        await Animal.findByIdAndDelete(req.params.id)
        res.redirect('/animals')
    } catch (err) {
        res.send('Looks like something went wrong...')
        console.log(err)
    }
}

const edit = async (req, res) => {
    try {
        const foundAnimal = await Animal.findById(req.params.id)
        res.render('animals/edit.ejs', {
            animal: foundAnimal
        })
    } catch (err) {
        res.send('Looks like something went wrong...')
        console.log(err)
    }
}

const update = async (req, res) => {
    try {
        await Animal.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/animals');
    } catch (err) {
        res.send('Looks like something went wrong...')
        console.log(err)
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