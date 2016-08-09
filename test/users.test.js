'use strict'

let app = require('../server.js');
const expect = require('chai').expect;
const request = require('supertest')(app);
let db = require('../level/level.js').db;


describe('USERS TESTS', function() {

  describe('/users', function() {
    it('should GET all users', function(done) {
      request.get('/users')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body).to.be.ok
          expect(res.body[0]).to.have.keys('name', 'password', 'admin', 'beers', 'friends')
          done();
        })
    })

    it('should POST a new user', function(done) {
      request.post('/users')
        .send({
          name: 'jimbob',
          password: 'anotherBigHash',
          admin: false,
          beers: [],
          friends: []
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          db.get('users', function(err, users) {
            // console.log('USERS:',users);
            var jimbob = users.reduce((bool, user) => {
              if (user.name === 'jimbob') {
                bool = true;
              }
              return bool
            }, false)
            expect(jimbob).to.equal(true)
            done();
          })
        })
    })
  })

  describe('/users/:userName', function(){
    it('should DELETE a user', function(done){
      request.delete('/users/chris')
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          db.get('users', function(err,users){
            var noChris = users.reduce((bool, user) => {
              if (user.name === 'chris') {
                bool = false;
              }
              return bool
            }, true)
            expect(noChris).to.equal(true)
            done();
          })
        })
    })
  })
})
