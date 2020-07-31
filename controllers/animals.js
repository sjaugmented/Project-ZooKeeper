const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/Animal');
const route = express.Router();

route.post('/', async(req, res) => {
    const(keyWhatever, keyMore) = req.body;
    let user = {};
    user.keyWhatever = keyWhatever;
    user.keyMore = keyMore;
    let userModel = new User(user);
  await userModel.save();
    // sends data model as a response
    res.json(userModel);
});

module.exports = route;