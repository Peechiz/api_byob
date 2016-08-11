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

router.route('/:name')
  .delete((req,res)=>{
    // check token to make sure admin
    var name = req.params.name;
    db.get('beers', function(err,beers){
      beers = beers.reduce((arr,beer)=>{
        if (beer.name !== name){
          arr.push(beer)
        }
        return arr
      },[])
      db.put('beers', beers, function(){
        res.sendStatus(200)
      })
    })
  })

router.route('/:name/edit') // admin only?
  .post((req,res)=>{
    var nameParam = req.params.name;

    var name = req.body.name;
    var brewery = req.body.brewery;
    var type = req.body.type;
    var abv = req.body.abv;

    db.get('beers', function(err,beers){
      beers = beers.map(function(beer){
        if (beer.name === name){
          beer = {
            name: name,
            brewery: brewery,
            type: type,
            abv: abv
          }
        }
        return beer
      })
      db.put('beers', beers, function(){
        res.sendStatus(200)
      })
    })
  })

module.exports = router;
