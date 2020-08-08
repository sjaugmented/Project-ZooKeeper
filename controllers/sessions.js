const db = require('../models')

// ROUTES
// INDEX
const index = (req, res, next) => {
    if (req.user) {
        res.redirect('/enclosures')
    } else {
        res.render('home', {
            user: req.user ? req.user.name : ''
        })
    }
}

// LOGOUT
const logout = async (req, res) => {
    try {
        await req.logout()
        res.redirect('/')
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

module.exports = { index, logout }