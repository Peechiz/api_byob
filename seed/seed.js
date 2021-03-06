'use strict'

let db = require('../level/level.js').db

function seed() {
  console.log('LOG: seeding db...\n');
  db.put('beers', [{
    name: 'zoe',
    brewery: 'Hops & Grain',
    type: 'Experimental Beer (Lager or Ale)',
    abv: 5.2
  }, {
    name: 'Alt-Eration',
    brewery: 'Hops & Grain',
    type: 'German-Style Altbier',
    abv: 5.1
  }])

  db.put('users', [{
    name: 'chris',
    password: '$2a$08$Rx2NStoeL9OvTraTWIoWHuWjLiXKtCu8ofEf/dUS9AMfU.b0TnDDm', // someBigHash
    admin: true,
    beers: [{
      name: 'zoe',
      fav: false,
      notes: "it's pretty good"
    }, {
      name: "Alt-Eration",
      fav: true,
      notes: "this beer is the bomb"
    }],
    friends: ['dcb', 'gabe']
  },{
    name: 'chris2',
    password: '$2a$08$9K7rkMb.tIkZNR1zxDELPeZ7UmeNQ1xpllUYeu2DvXdJg6XWHK1vC', // someBigOlHash
    admin: true,
    beers: [{
      name: 'zoe',
      fav: false,
      notes: "it's pretty good"
    }, {
      name: "Alt-Eration",
      fav: true,
      notes: "this beer is the bomb"
    }],
    friends: ['dcb', 'gabe']
  }])

  // db.get('beers', function(err, val) {
  //   // console.log(val);
  // })
  // db.get('users', function(err, val) {
  //   // console.log(val);
  // })
}

function erase(){
  console.log('LOG: clearing db\n');
  db.del('beers')
  db.del('users')
  db.close();
}

module.exports.up = seed;
module.exports.down = erase;
