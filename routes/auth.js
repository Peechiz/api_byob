'use strict'

var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');


let level = require('../level/level.js');
let db = level.db;



// login
router.route('/login')
  .post((req,res)=>{
    var name = req.body.username
    var password = req.body.password

    if (!name){
      res.status(400).send('username required');
      return
    }
    if (!password){
      res.status(400).send('password required')
      return
    }

    db.get('users', function(err,users){
      var user = users.reduce((out,user)=>{
        if (user.name === name){
          return user
        }
        return out
      })

      if (!user){
        res.status(400).send('user not found')
        return
      }
      var validPass = bcrypt.compareSync(password, user.password)

      if (validPass){
        var token = jwt.sign({
          user: user.name,
          admin: user.admin,
          thing: 'great'
        }, process.env.SECRET)

        res.json(token);
      }
      else {
        res.status(400).send('invalid password')
      }
    })
  })

// logout

// signup -- redirect to users POST

module.exports = router;
