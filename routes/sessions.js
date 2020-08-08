const express = require('express')
const router = express.Router()
const sessionsController = require('../controllers/sessions')
const passport = require('passport')


// ROUTES
// ROOT
router.get('/', sessionsController.index)

// LOGIN
router.post('/login', (req, res) => {
    res.redirect('/auth/google')
})

// OAUTH
router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
))

// AUTHENTICATE
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
))

// DESTROY
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router