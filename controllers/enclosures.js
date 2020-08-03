const Enclosure = require('../models/enclosure')
const Animal = require('../models/animal') // in case we decide to delete animals when enclosures are deleted

const newView = (req, res) => {
    if (req.session.loggedIn) {
        res.render('enclosures/new.ejs', {
            user: req.session
        })
    } else {
        res.redirect('/')
    }
}

const create = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            await Enclosure.create(req.body)
            res.redirect('/enclosures')
        } catch (err) {
            res.send('Looks like there was a problem...')
            console.error(err)
        }
    } else {
        res.redirect('/')
    }
    
}

const index = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const allEnclosures = await Enclosure.find({})
            res.render('enclosures/index.ejs', {
                enclosures: allEnclosures,
                user: req.session
            })
        } catch (err) {
            res.send('Looks like there was a problem...')
            console.error(err)
        }
    } else {
        res.redirect('/')
    }
    
}

const show = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const foundEnclosure = await Enclosure.findById(req.params.id)
                .populate('animals')
            // .populate('comments')
            res.render('enclosures/show.ejs', {
                enclosure: foundEnclosure,
                user: req.session
            })
        } catch (err) {
            res.send('Looks like there was a problem...')
            console.error(err)
        }
    } else {
        res.redirect('/')
    }
    
}

const deleteData = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const deletedEnclosure = await Enclosure.findByIdAndDelete(req.params.id)
            // what do we do with the animals??? 
            // move them to unspecified enclosure?
            // delete them entirely?
            Animal.deleteMany({
                _id: {
                    $in: deletedEnclosure.animals
                }
            })
            
            res.redirect('/enclosures')
        
        } catch (err) {
            res.send('Looks like there was a problem...')
            console.error(err)
        }
    } else {
        res.redirect('/')
    }
}

const edit = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const foundEnclosure = await Enclosure.findById(req.params.id)
            res.render('enclosures/edit.ejs', {
                enclosure: foundEnclosure,
                user: req.session
            })
        } catch (err) {
            res.send('Looks like there was a problem...')
            console.error(err)
        }
    } else {
        res.redirect('/')
    }
}

const update = async (req, res) => {
    if (req.session.loggedIn) {
        try {
            await Enclosure.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/enclosures/' + req.params.id)
        } catch (err) {
            res.send('Looks like there was a problem...')
            console.error(err)
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