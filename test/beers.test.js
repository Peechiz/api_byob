'use strict'

let app = require('../server.js');
const expect = require('chai').expect;
const request = require('supertest')(app);
const seed = require('../seed/seed');
let level = require('../level/level.js');

// let beersdb = level.beersdb
// let usersdb = level.usersdb
// let db = level.db

before(function(done){
  // seed the db
  seed.up();
  done();
})

describe('tests working:', function(){
  it('should be working', function(){
    expect(true).to.equal(true)
  })
})

describe('tests using test dbs', function(){
  it('should be using the test db', function(){
    expect(process.env.NODE_ENV).to.equal('test')
  })
})

describe('seeds functioning', function(){
  let db = level.db

  it('should seed the testing db', function(done){
    db.get('users', function(err, val){
      // console.log('TEST:',val[0].admin);
      expect(val[0].friends.length).to.equal(2)
      done();
    })
  })

  it('should be able to grab a beer detail', function(){
    db.get('users', function(err, users){
      var beer = users[0].beers[0].name;
      db.get('beers', function(err,beers){
        var detail = beers.map(function(beer){
          if (beer.name === beer){
            return beer
          }
        })[0]
        expect(detail.abv).to.equal(5.2)
      })
    })
  })
})

describe('/beers route', function(){
  let db = level.db
  it('should be able to POST a new beer', function(done){
    request.post('/beers')
      .send({
        name: 'PBR',
        brewery: 'Pabst Brewing Company',
        type: 'American-Style Light (Low Calorie) Lager',
        abv: 4.74
      })
      .expect(200)
      .end(function(err,res){
        if (err) return done(err)
        db.get('beers', function(err,beers){
          // console.log('BEERS:',beers);
          var pbr = beers.reduce((bool,beer)=>{
            if (beer.name === 'PBR'){
              bool = true;
            }
            return bool
          },false)
          expect(pbr).to.equal(true)
          done();
        })
      })
  })

  it('should be able to GET the full library of beers', function(done){
    request.get('/beers')
      .expect(200)
      .end(function(err,res){
        if (err) return done(err)
        expect(res.body).to.be.ok
        expect(res.body[0]).to.have.keys('name','abv','brewery','type')
        done();
      })
  })
})

after(function(done){
  //erase the db
  seed.down()
  done()
})
