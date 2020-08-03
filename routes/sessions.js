const express = require('express')
const router = express.Router()
const sessionsController = require('../controllers/sessions')


// ROUTES
// LOGIN
router.post('/login', sessionsController.login)


// DESTROY
router.get('/logout', sessionsController.logout)

module.exports = router