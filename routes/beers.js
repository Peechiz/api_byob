'use strict'

var express = require('express'),
    router = express.Router();

let level = require('../level/level.js');
let db = level.db

router.route('/')
//get all beers
  .get((req,res)=>{
    db.get('beers', function(err,beers){
      res.json(beers)
    })
  })

//add new beer
  .post((req,res)=>{
    // console.log('posting a new beer!');
    var name = req.body.name
    var brewery = req.body.brewery
    var type = req.body.type
    var abv = req.body.abv

    db.get('beers', function(err, beers){
      // console.log('beers received!');
      beers.push({
        name: name,
        brewery: brewery,
        type: type,
        abv: abv
      })
      db.put('beers', beers, function(err){
        // console.log('updating beers!');
        res.sendStatus(200)
      })
    })
  })

module.exports = router;
