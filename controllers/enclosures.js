const db = require('../models')

const newView = (req, res) => {
    if (req.user) {
        res.render('enclosures/new', {
            user: req.user.name
        })
    } else {
        res.redirect('/')
    }
}

const create = async (req, res) => {
    if (req.user) {
        try {
            await db.Enclosure.create(req.body)
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
    if (req.user) {
        try {
            const allEnclosures = await db.Enclosure.find({})
            res.render('enclosures/index', {
                enclosures: allEnclosures,
                user: req.user.name
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
    if (req.user) {
        try {
            const foundEnclosure = await db.Enclosure.findById(req.params.id)
                .populate('animals')
            // .populate('comments')
            res.render('enclosures/show', {
                enclosure: foundEnclosure,
                user: req.user.name
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
    if (req.user) {
        try {
            // attempt at only deleting if animals array is empty
            const enclosureToDelete = await db.Enclosure.findById(req.params.id)
            enclosureToDelete.populate({ path: 'animals', match: 'any' })
            // TODO: redirect to page/pop-up explaining you cannot delete if enclosure is not empty
            if (enclosureToDelete.animals.length > 0) res.redirect('/enclosures/' + req.params.id)
            else {
                await db.Enclosure.findByIdAndDelete(req.params.id)
                res.redirect('/enclosures')
            }        
        } catch (err) {
            res.send('Looks like there was a problem...')
            console.error(err)
        }
    } else {
        res.redirect('/')
    }
}

const edit = async (req, res) => {
    if (req.user) {
        try {
            const foundEnclosure = await db.Enclosure.findById(req.params.id)
            res.render('enclosures/edit', {
                enclosure: foundEnclosure,
                user: req.user.name
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
    if (req.user) {
        try {
            await db.Enclosure.findByIdAndUpdate(req.params.id, req.body)
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