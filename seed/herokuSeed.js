var db = require('../level/level.js').db

db.put('users', [{
  name: 'Chris',
  password: '12345',
  admin: true,
  beers: [],
  friends: []
}],
function(err){
  if (err) {
    console.error(err);
  }
  console.log('adding user');
})

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
}],
function(err){
  if (err) {
    console.error(err);
  }
  console.log('adding beers');
})

db.get('users', function(err,users){
  if (err){
    console.error(err);
  }
  console.log(users)
})
