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
          expect(res.body[0]).to.have.keys('name', 'admin', 'beers', 'friends')
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
      // TODO add request to get all records for a user?
    })
  })

  describe('/users/:userName/edit', function(){
    it('should EDIT a user', function(done){
      request.post('/users/chris2/edit')
        .send({
          name: 'james_bond',
          password: '007',
          admin: true,
          beers: [{
            name: "PBR",
            fav: true,
            notes: "this beer is the bomb"
          }],
          friends: ['Q','the token girl']
        })
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          db.get('users', function(err,users){
            var hasBond = users.reduce((bool,user)=>{
              if (user.name === 'james_bond'){
                bool = true;
              }
              return bool
            },false)
            expect(hasBond).to.equal(true)
            done()
          })
        })
    })
  })
  // /users/:userName/friends
  describe('/users/:userName/friends', function(){
    it('should GET all friends for a user', function(done){
      request.get('/users/james_bond/friends')
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          expect(res.body.length).to.equal(2)
          done();
        })
    })

    it('should POST a new friend for a user', function(done){
      request.post('/users/james_bond/friends')
        .send({friend:'moneyPenny'})
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          db.get('users', function(err,users){
            var friends = users.reduce((friends,user)=>{
              if (user.name === 'james_bond'){
                return user.friends
              }
              return friends
            })
            expect(friends.length).to.equal(3)
            done();
          })
        })
    })
  })
  // /users/:userName/beers
  describe('/users/:userName/beers', function(){
    it('should GET all beers for a user', function(done){
      request.get('/users/james_bond/beers')
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          expect(res.body.length).to.equal(1);
          expect(res.body[0].detail).to.be.ok;
          done();
        })
    })

    it('should POST a new liked beer to a user', function(done){
      request.post('/users/james_bond/beers')
        .send({
          name: 'Franziskaner',
          fav: false,
          notes: 'I felt like a monk, it was glorious',
        })
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          db.get('users', function(err,users){
            var beers = users.reduce((beers,user)=>{
              if (user.name === 'james_bond'){
                return user.beers
              }
              return beers
            })
            expect(beers.length).to.equal(2);
            done();
          })
        })
    })
  })

  describe('/users/:userName/beers/:beerName', function(){
    it('should DELETE a beer from a user', function(done){
      request.delete('/users/james_bond/beers/PBR')
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          //check to make sure it got deleted
          db.get('users', function(err,users){
            var deleted = users.reduce((bool,user)=>{
              if (user.name === 'james_bond'){
                user.beers.forEach(beer=>{
                  if (beer.name === 'PBR'){
                    bool = false
                  }
                })
              }
              return bool
            }, true)
            expect(deleted).to.equal(true);
            done();
          })
        })
    })
    it('should POST to user beer, toggle fav', function(done){
      request.post('/users/james_bond/beers/Franziskaner')
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          // check to make sure it is now fav'd
          db.get('users', function(err,users){
            var fav = users.reduce((bool,user)=>{
              if (user.name === 'james_bond'){
                user.beers.forEach(beer=>{
                  if (beer.name === 'Franziskaner'){
                    bool = beer.fav
                  }
                })
              }
              return bool
            },false)
            expect(fav).to.equal(true)
            done();
          })
        })
    })
  })

  describe('/users/:userName/friends/:friendName', function(){
    it('should DELETE a friend from a user', function(done){
      request.delete('/users/james_bond/friends/Q')
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          //check to make sure it got deleted
          db.get('users', function(err,users){
            var deleted = users.reduce((bool,user)=>{
              if (user.name === 'james_bond'){
                user.friends.forEach(friend=>{
                  if (friend === 'Q'){
                    bool = false
                  }
                })
              }
              return bool
            }, true)
            expect(deleted).to.equal(true);
            done();
          })
        })
    })
  })
})
