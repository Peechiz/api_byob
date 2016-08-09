'use strict'

var express = require('express'),
    router = express.Router(),
    db = require('../level/level.js').db;


router.route('/')
//get all users
  .get((req,res)=>{
    db.get('users', function(err, users){
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

module.exports = router;
