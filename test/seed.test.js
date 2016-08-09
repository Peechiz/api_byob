'use strict'

let app = require('../server.js');
const expect = require('chai').expect;
const request = require('supertest')(app);
const seed = require('../seed/seed');
let level = require('../level/level.js');

before(function(done){
  // seed the db
  seed.up();
  done();
})

after(function(done){
  //erase the db
  seed.down()
  done()
})

describe('SEED TESTS', function(){

  describe('tests working:', function(){
    it('should be working', function(){
      expect(true).to.equal(true)
    })
  })

  xdescribe('tests using test dbs', function(){
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
})
