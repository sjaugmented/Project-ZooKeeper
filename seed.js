const mongoose = require('mongoose')
const db = require('./models')
const animals = require('./controllers/animals')

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
        "name": "Lions",
        "keeper": "Beverly",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Birds",
        "keeper": "Wesley",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Dolphins",
        "keeper": "Geordi",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Tigers",
        "keeper": "Worf",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Bears",
        "keeper": "Will",
        "lastChecked": "",
        "animals": [],
        "comments": "",
        "img": ""
    }, {
        "name": "Wolves",
        "keeper": "Geordi",
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
const tigers = ["Sheeba", "Milo", "Otis"]
const geckos = ["Bilbo", "Sam"]
const primates = ["Jane", "Tarzan", "Kerchak", "George"]
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
    ...tigers.map(tiger => {
        return new Animal(tiger, 'Tiger', 'James', 'https://c402277.ssl.cf1.rackcdn.com/photos/18134/images/priority_species/Medium_WW226365.jpg?1574452099')
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

console.log(animals_list.length) // TODO: remove

const seedDb = async () => {
    console.log('running seedDb')
    try {
        await db.Enclosure.deleteMany({})
        console.log('removed all enclosures')
        const enclosures = await db.Enclosure.create(enclosures_list)
        console.log('recreated all enclosures')
        console.log(`created ${enclosures.length}`)
        
        await db.Animal.deleteMany({})
        console.log('removed all animals')
        const animals = await db.Animal.create(animals_list)
        console.log('recreated all animals')
        console.log(`created ${animals.length}`)
    } catch (err) {
        console.error(err)
    } finally {
        mongoose.connection.close()
    }
}

seedDb()