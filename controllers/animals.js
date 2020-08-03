const Animal = require('../models/animal')
const Enclosure = require('../models/enclosure')



const newView = (req, res) => {
    if (req.session.loggedIn) {
        res.render('animals/new.ejs', {
            user: req.session
        })
    } else {
        res.redirect('/')
    }
}

const create = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            await Animal.create(req.body)
            res.redirect('/animals')
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.log(err)
        }
    } else {
        res.redirect('/')
    }
}

const index = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const foundAnimals = await Animal.find({})
            res.render('animals/index.ejs', {
                animals: foundAnimals,
                user: req.session
            })
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.log(err)
        }
    } else {
        res.redirect('/')
    }
}

const show = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const foundAnimal = await Animal.findById(req.params.id)
            res.render('animals/show.ejs', {
                animal: foundAnimal,
                user: req.session
            })
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.log(err)
        }
    } else {
        res.redirect('/')
    }
}

const deleteData = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            await Animal.findByIdAndDelete(req.params.id)
            res.redirect('/animals')
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.log(err)
        }
    } else {
        res.redirect('/')
    }
}

const edit = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const foundAnimal = await Animal.findById(req.params.id)
            res.render('animals/edit.ejs', {
                animal: foundAnimal,
                user: req.session
            })
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.log(err)
        }
    } else {
        res.redirect('/')
    }
}

const update = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            await Animal.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/animals')
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.log(err)
        }
    } else {
        res.redirect('/')
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