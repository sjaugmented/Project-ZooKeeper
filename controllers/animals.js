const Animal = require('../models/animal')
const Enclosure = require('../models/enclosure')

const newView = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const allEnclosures = await Enclosure.find({})
            res.render('animals/new.ejs', {
                enclosures: allEnclosures,
                user: req.session
            })
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.error(err)
        }
    } else {
        res.redirect('/')
    }
}

const create = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const createdAnimal = await Animal.create(req.body)
            const foundEnclosure = await Enclosure.findById(req.body.enclosureId)
            foundEnclosure.animals.push(createdAnimal)
            foundEnclosure.save()
            res.redirect('/animals')
        } catch (err) {
            res.send('Looks like something went wrong...')
            console.error(err)
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
            const foundEnclosure = await Enclosure.findOne({ 'animals': req.params.id })
                .populate({ path: 'animals', match: { _id: req.params.id } })
            
            res.render('animals/show.ejs', {
                enclosure: foundEnclosure,
                animal: foundEnclosure.animals[0],
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
            const deletedAnimal = await Animal.findByIdAndDelete(req.params.id)
            const foundEnclosure = await Enclosure.findOne({ 'animals': req.params.id })
            await foundEnclosure.animals.remove(req.params.id)
            await foundEnclosure.save()
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
            const allEnclosures = await Enclosure.find({})
            const foundAnimalEnclosure = await Enclosure.findOne({ 'animals': req.params.id })
                .populate({ path: 'animals', match: { _id: req.params.id } })
            // const foundAnimal = await Animal.findById(req.params.id)
            res.render('animals/edit.ejs', {
                animal: foundAnimalEnclosure.animals[0],
                enclosures: allEnclosures,
                animalEnclosure: foundAnimalEnclosure,
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
            const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true })
            const foundEnclosure = await Enclosure.findOne({ 'animals': req.params.id })
            if (foundEnclosure._id.toString() !== req.body.enclosureId) {
                foundEnclosure.animals.remove(req.params.id)
                foundEnclosure.save()
                
                const newEnclosure = await Enclosure.findById(req.body.enclosureId)
                newEnclosure.animals.push(updatedAnimal)
                newEnclosure.save()
                res.redirect('/animals/' + req.params.id)
            }
            else {
                res.redirect('/animals' + req.params.id)
            }
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
