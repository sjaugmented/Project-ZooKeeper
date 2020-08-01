const express = require('express');
const mongoose = require('mongoose');
const Animal = require('../models/Animal');
const { post } = require('../routes/enclosures');
const route = express.Router();

route.post('/', async(req, res) => {
  const {name, comments} = req.body;
  let obs = {};
  obs.name = name;
  obs.comments = comments;
  let obsModel = new Animal(obs);
  await obsModel.save();
  // sends data model as a response
  res.json(obsModel);
});

// post.comments.push({ title: }) ---- work on adding to array in place of above
 
module.exports = route;