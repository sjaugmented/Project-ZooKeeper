const User = require('../models/user')

// ROUTES
// LOGIN
const login = (req, res) => {
    req.session.username = req.body.username
    req.session.loggedIn = true
    res.redirect('/')
}

const logout = async (req, res) => {
    try {
        await req.session.destroy()
        res.redirect('/')
    } catch (err) {
        res.send('Looks like there was a problem...')
        console.error(err)
    }
}

module.exports = { login, logout }