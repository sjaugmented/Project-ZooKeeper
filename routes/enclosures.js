const express = require('express')
const router = express.Router()
const enclosuresController = require('../controllers/enclosures')

// ROUTES
// NEW
router.get('/new', enclosuresController.new)

// CREATE
router.post('/', enclosuresController.create)

// INDEX
router.get('/', enclosuresController.index)

// SHOW
router.get('/:id', enclosuresController.show)

// DELETE
router.delete('/:id', enclosuresController.delete)

// EDIT
router.get('/:id/edit', enclosuresController.edit)

// ADD ANIMAL TO ENCLOSURE
router.get('/:id/add', enclosuresController.newAnimal)

// UPDATE
router.put('/:id', enclosuresController.update)

module.exports = router