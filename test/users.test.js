'use strict'

let app = require('../server.js');
const expect = require('chai').expect;
const request = require('supertest')(app);
const seed = require('../seed/seed');
let level = require('../level/level.js');

// let beersdb = level.beersdb
// let usersdb = level.usersdb
// let db = level.db



describe('/users route', function(){
  it('should be able to GET all users', function(done){
    request.get('/users')
      .expect(200)
      .end(function(err,res){
        if (err) return done(err)
        expect(res.body).to.be.ok
        expect(res.body).to.have.keys('name', 'password', 'admin', 'beers', 'friends')
      })
  })
})
