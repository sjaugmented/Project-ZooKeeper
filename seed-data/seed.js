const db = require('../models')

const enclosures_list = [
    {
        "name": "Reptiles",
        "keeper": "Deanna",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Elephants",
        "keeper": "Data",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Primates",
        "keeper": "Jean-Luc",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Cats",
        "keeper": "Beverly",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Birds",
        "keeper": "Will",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Oceans",
        "keeper": "Geordi",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Snakes",
        "keeper": "",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Bears",
        "keeper": "Worf",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Wolves",
        "keeper": "Wesley",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }
]

class Animal {
    constructor(name, species, keeper, img) {
        this.name = name
        this.species = species
        this.age = Math.floor(Math.random() * 10) + 1
        this.lastChecked = new Date()
        this.lastKeeper = keeper
        this.comments = 'None'
        this.currentMeds = 'None'
        this.img = img
    }
}

//#region Animal Names
const lions = ["Simba", "Mufasa", "Scar", "Nala", "Georgia", "Nelly"]
const elephants = ["Dumbo", "Alto", "Othello", "Clarissa"]
const wolves = ["Baltar", "Perseus", "Doug", "Malik"]
const snakes = ["Sheeba", "Milo", "Otis"]
const geckos = ["Greg", "Sam"]
const primates = ["Diane", "Tarzan", "Kerchak", "George"]
const birds = ["Tucan", "Sam", "Iago", "Smiley"]
const dolphins = ["Flipper", "Darwin", "Shimmer", "Dieter"]
const bears = ["Griz", "Bubba", "Eddie", "Saphron"]
//#endregion

const animals_list = [
    ...lions.map(lion => {
        return new Animal(lion, 'Lion', 'Toki', 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/E0F0/production/_112548575_gettyimages-492611032-1.jpg')
    }),
    ...elephants.map(elephant => {
        return new Animal(elephant, 'Elephant', 'Norbert', 'https://i0.wp.com/africanelephantjournal.com/wp-content/uploads/2020/02/190124_Tim_Ryan_Wilkie.jpg.jpg?fit=2048%2C1280&ssl=1')
    }),
    ...wolves.map(wolf => {
        return new Animal(wolf, 'Wolf', 'Jelani', 'https://img.apmcdn.org/5d713a4d4e43cf212c9a4792aa2f68aa954d1731/square/588c9d-20171019-wolf.jpg')
    }),
    ...snakes.map(snake => {
        return new Animal(snake, 'Snake', 'James', 'https://thumbs-prod.si-cdn.com/nGo4Lb3cFOCAKggHb0vYam-M3Cs=/fit-in/1600x0/https://public-media.si-cdn.com/filer/d9/7e/d97eb52e-9985-48f4-b6b8-ae6de46dff00/oo_400559.jpg')
    }),
    ...geckos.map(gecko => {
        return new Animal(gecko, 'Gecko', 'Marissa', 'https://www.treehugger.com/thmb/jW7AJdxhmumgojTkEqtOMsThdmQ=/889x667/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2016__09__gecko-on-sand-e5f7facb4d8e4dc19a81ed03dd166451.jpg')
    }),
    ...primates.map(primate => {
        return new Animal(primate, 'Primate', 'Seth', 'https://www.sustainability-times.com/wp-content/uploads/thumbs/photo-1540573133985-87b6da6d54a9-38rh6ylbrs98vl3ftqg5xc.jpg')
    }),
    ...birds.map(bird => {
        return new Animal(bird, 'Bird', 'Christy', 'https://ichef.bbci.co.uk/news/1024/branded_news/67CF/production/_108857562_mediaitem108857561.jpg')
    }),
    ...dolphins.map(dolphin => {
        return new Animal(dolphin, 'Dolphin', 'Uyen', 'https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/06/931/524/Dolphin-istock.jpg?ve=1&tl=1')
    }),
    ...bears.map(bear => {
        return new Animal(bear, 'Bear', 'Manny', 'https://i.guim.co.uk/img/media/bcd9b1ca747ed4d274a70eb884f70ef91f5d313b/0_81_1440_864/master/1440.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=112135b354f88abd3187c3bdba0a9e99')
    })
]

console.log(animals_list) // TODO: remove

const seedDb = async () => {
    try {
        await db.Enclosure.deleteMany({})
        console.log('removed all enclosures')
        const enclosures = await db.Enclosure.create(enclosures_list)
        console.log('recreated all enclosures')
        console.log(`created ${enclosures.length}`)
        
        await db.Animal.deleteMany({})
        console.log('removed all animals')
        animals_list.forEach(animalData => {
            const animal = new db.Animal({
                name: animalData.name,
                species: animalData.species,
                age: animalData.age,
                lastChecked: animalData.lastChecked,
                comments: animalData.comments,
                currentMeds: animalData.currentMeds,
                img: animalData.img
            })
            const savedAnimal = animal.save()
            console.log(`saved ${savedAnimal}`)
        })
    } catch (err) {
        console.error(err)
    }
}

// db.Enclosure.deleteMany({}, (err, authors) => {
//     if (err) return console.log(err);
//     console.log('removed all authors');
//     db.Author.create(authors_list, (err, authors) => {
//         if (err) return console.log(err);
//         console.log('recreated all authors');
//         console.log(`created ${authors.length} authors`);
//         db.Book.deleteMany({}, (err, books) => {
//             if (err) return console.log(err);
//             console.log('removed all books');
//             books_list.forEach(bookData => {
//                 const book = new db.Book({
//                     title: bookData.title,
//                     image: bookData.image,
//                     releaseDate: bookData.releaseDate
//                 });
//                 db.Author.findOne({
//                     name: bookData.author
//                 }, (err, foundAuthor) => {
//                     console.log(`found author  ${foundAuthor.name} for book ${book.title}`);
//                     if (err) return console.log(err);
//                     book.author = foundAuthor;
//                     book.save((err, savedBook) => {
//                         if (err) return console.log(err);
//                         console.log(`saved ${savedBook.title} by ${foundAuthor.name}`);
//                     });
//                 });
//             });
//         });
//     });
// });