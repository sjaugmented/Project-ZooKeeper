const express = require('express')
const router = express.Router()
const animalsController = require('../controllers/animals')

// ROUTES
// NEW
router.get('/new', animalsController.new)

// CREATE
router.post('/', animalsController.create)

// INDEX
router.get('/', animalsController.index)

// SHOW
router.get('/:id', animalsController.show)

// DELETE
router.delete('/:id', animalsController.delete)

// EDIT
router.get('/:id/edit', animalsController.edit)

// UPDATE
router.put('/:id', animalsController.update)

module.exports = router