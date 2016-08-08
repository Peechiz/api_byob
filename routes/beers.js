'use strict'

var express = require('express'),
    router = express.Router();

let level = require('../level/level.js');
let db = level.db
let usersdb = level.usersdb
let beersdb = level.beersdb

router.route('/')
//get all beers
  .get((req,res)=>{

  })

//add new beer
  .post((req,res)=>{

  })

module.exports = router;
