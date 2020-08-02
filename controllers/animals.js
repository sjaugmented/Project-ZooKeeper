// const express = require('express');
// const mongoose = require('mongoose');
// const User = require('../models/Animal');
// const route = express.Router();

// route.post('/', async(req, res) => {
//     const(keyWhatever, keyMore) = req.body;
//     let user = {};
//     user.keyWhatever = keyWhatever;
//     user.keyMore = keyMore;
//     let userModel = new User(user);
//   await userModel.save();
//     // sends data model as a response
//     res.json(userModel);
// });

// module.exports = route;


// PATH  /animals
router.get('/', (req, res) => {
    Animal.find({}, (err, foundAnimals) => {
        res.render('animals/index.ejs', {
            animals: foundAnimals
        })
    })
})

// PATH /animals/new
router.get('/new', (req, res) => {
    res.render('animals/new.ejs')
})


// PATH  /animals/:id
router.get('/:id', (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        res.render('animals/show.ejs', {
            animal: foundAnimal
        })
    })
})

// PATH  /animal/:id/edit
router.get('/:id/edit', (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        res.render('animals/edit.ejs', {
            animal: foundAnimal
        })
    })
})

// PATH  /animals/:id
router.delete('/:id', (req, res) => {
    Animal.findByIdAndDelete(req.params.id, () => {
        res.redirect('/animals')
    })
})

// PATH   /animals
router.post('/', (req, res) => {
    Animal.create(req.body, (err, createdAnimal) => {
        if (err) console.log("Error in animal#create", err)
        res.redirect('/animals')
    })
})

// PATH  /animals/:id
router.put('/:id', (req, res) => {
	Animal.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('/animals');
	})
})

module.exports = router