const level = require('../test/test_level.js')

let db = level.db;
let usersdb = level.usersdb;
let beersdb = level.beersdb;


const beers = [
  {type: 'put', key: 'zoe', value: {
    brewery: 'Hops & Grain',
    type: 'Experimental Beer (Lager or Ale)',
    abv: 5.2
  }},
  {type: 'put', key: 'Alt-Eration', value: {
    brewery: 'Hops & Grain',
    type: 'German-Style Altbier',
    abv: 5.1
  }},
]

const users = [
  {type: 'put', key: 'chris', value: {
    admin: true,
    beers: [
      { name: 'zoe',
        fav: false,
        notes: "it's pretty good"
      },
      {
        name: "Alt-Eration",
        fav: true,
        notes: "this beer is the bomb"
      }
    ],
    friends: ['dcb','gabe']
  }}
]

module.exports = {
  seedUsers: function() {
    db.batch(users, err => {
      if (err){
        console.error(err);
      }
      console.log('users seeded');
    })
  },
  seedBeers: function() {
    db.batch(beers, err => {
      if (err){
        console.error(err);
      }
      console.log('users seeded');
    })
  }
}
