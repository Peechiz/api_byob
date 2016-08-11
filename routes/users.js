'use strict'

var express = require('express'),
    router = express.Router(),
    db = require('../level/level.js').db;

function hidePasswords(users){
  users.forEach(user=>{
    delete user.password
  })
}

router.route('/')
//get all users
  .get((req,res)=>{
    // TODO DON'T SENT THE PASSWORD BACK IDIOT
    db.get('users', function(err, users){
      if (err) {
        console.error(err);
        res.sendStatus(500)
      }
      hidePasswords(users);
      res.json(users);
    })
  })

// add new user
  .post((req,res)=>{
    var name = req.body.name,
        password = req.body.password,
        admin = req.body.admin,
        beers = req.body.beers,
        friends = req.body.friends;

    db.get('users', function(err,users){
      users.push({
        name: name,
        password: password,
        admin: admin,
        beers: beers,
        friends: friends
      })
      db.put('users',users, function(){
        res.sendStatus(200)
      })
    })

  })

router.route('/:userName')
  .delete((req,res)=>{
    var name = req.params.userName;
    db.get('users', function(err,users){
      users = users.reduce((arr,user)=>{
        if (user.name !== name){
          arr.push(user)
        }
        return arr
      },[])
      db.put('users', users, function(){
        res.sendStatus(200)
      })
    })
  })

router.route('/:userName/edit')
  .post((req,res)=>{
    const nameParam = req.params.userName;

    const name = req.body.name,
        password = req.body.password,
        admin = req.body.admin,
        beers = req.body.beers,
        friends = req.body.friends;

    db.get('users', function(err,users){
      users = users.map(function(user){
        if (user.name = nameParam){
          user = {
            name: name,
            password: password,
            admin: admin,
            beers: beers,
            friends: friends
          }
        return user
        }
      })
      db.put('users',users, function(){
        res.sendStatus(200)
      })
    })
  })

router.route('/:userName/friends')
  .get((req,res)=>{
    var name = req.params.userName
    db.get('users', function(err,users){
      var friends = users.reduce((friends,user)=>{
        if (user.name === name){
          return user.friends
        }
        return friends
      })
      res.json(friends)
    })
  })
  .post((req,res)=>{
    var name = req.params.userName
    var friend = req.body.friend
    db.get('users', function(err,users){
      var newUsers = users.map(function(user){
        if (user.name === name){
          user.friends.push(friend)
        }
        return user
      })
      db.put('users',newUsers, function(){
        res.sendStatus(200)
      })
    })
  })

router.route('/:userName/beers')
  .get((req,res)=>{
    var name = req.params.userName
    db.get('users', function(err,users){
      var userBeers = users.reduce((beers,user)=>{
        if (user.name === name){
          return user.beers
        }
        return beers
      },[])
      db.get('beers', function(err,beers){
        // Adds Beer Detail to JSON response object
        beers.forEach(beer=>{
          userBeers.forEach(userBeer=>{
            // console.log(beer.name,userBeer.name);
            if (userBeer.name === beer.name){
              userBeer.detail = {
                brewery: beer.brewery,
                type: beer.type,
                abv: beer.abv
              }
            }
          })
        })
        res.json(userBeers)
      })
    })
  })

  .post((req,res)=>{
    var name = req.params.userName,
        beerName = req.body.name,
        fav = req.body.fav,
        notes = req.body.notes;

    db.get('users', function(err,users){
      users = users.map(user=>{
        if (user.name = name){
          user.beers.push({
            name: beerName,
            fav: fav,
            notes: notes
          })
        }
        return user
      })
      db.put('users',users, function(){
        res.sendStatus(200)
      })
    })
  })

router.route('/:userName/beers/:beerName')
  .delete((req,res)=>{
    var userName = req.params.userName;
    var beerName = req.params.beerName;

    db.get('users', function(err,users){
      users = users.map(user=>{
        if (user.name === userName){
          user.beers = user.beers.reduce((arr,beer)=>{
            if (beer.name !== beerName){
              arr.push(beer)
            }
            return arr
          },[])
        }
        return user;
      })
      db.put('users', users, function(){
        res.sendStatus(200)
      })
    })
  })
  .post((req,res)=>{
    // Toggles Fav Status on beer

    var userName = req.params.userName;
    var beerName = req.params.beerName;

    db.get('users', function(err,users){
      users = users.map(user=>{
        if (user.name === userName){
          user.beers.forEach(beer=>{
            if (beer.name === beerName){
              beer.fav = !beer.fav
            }
          })
        }
        return user
      })
      db.put('users',users, function(){
        res.sendStatus(200)
      })
    })
  })

router.route('/:userName/friends/:friendName')
  .delete((req,res)=>{
    var userName = req.params.userName;
    var friendName = req.params.friendName;

    db.get('users', function(err,users){
      users = users.map(user=>{
        if (user.name === userName){
          user.friends = user.friends.reduce((arr,friend)=>{
            if (friend !== friendName){
              arr.push(friend)
            }
            return arr
          },[])
        }
        return user;
      })
      db.put('users', users, function(){
        res.sendStatus(200)
      })
    })
  })
module.exports = router;
