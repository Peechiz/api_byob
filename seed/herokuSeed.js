var db = require('../level/level.js').db

db.put('users', [{
  name: 'Chris',
  password: '$2a$08$6J04xBErYUBxJpButQqI3uUYesX7FYqciDAxIaE5RJvVjeCOIga1K', // 'password'
  admin: true,
  beers: [{
    name: 'Zoe',
    fav: false,
    notes: "it's pretty good"
  }, {
    name: "Alt-Eration",
    fav: true,
    notes: "this beer is the bomb"
  }],
  friends: ['dcb','erika','gabe']
},
{
  name: 'Erika',
  password: '$2a$08$6J04xBErYUBxJpButQqI3uUYesX7FYqciDAxIaE5RJvVjeCOIga1K', // 'password'
  admin: true,
  beers: [{
    name: 'Zoe',
    fav: true,
    notes: "it's pretty good"
  }, {
    name: "Alt-Eration",
    fav: false,
    notes: "I don't like it"
  }],
  friends: ['dcb','Chris','gabe']
}],
function(err){
  if (err) {
    console.error(err);
  }
  console.log('adding user');
})

db.put('beers', [{
  name: 'Zoe',
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
