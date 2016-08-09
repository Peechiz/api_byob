'use strict'

let app = require('../server.js');
const expect = require('chai').expect;
const request = require('supertest')(app);
const seed = require('../seed/seed');
let level = require('../level/level.js');

// let beersdb = level.beersdb
// let usersdb = level.usersdb
let db = level.db

describe('BEERS TESTS', function(){

  describe('/beers route', function(){
    // let db = level.db
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

  describe('/beers/:name/edit', function(){
    it('should EDIT an existing beer', function(done){
      request.post('/beers/zoe/edit')
        .send({
          name: 'zoe',
          brewery: 'Hopes & Grain',
          type: 'Experimental Beer (Lager or Ale)',
          abv: 7.2
        })
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          db.get('beers', function(err,beers){
            var zoeABV = beers.reduce((abv,beer)=>{
              if (beer.name === 'zoe'){
                abv = beer.abv
              }
              return abv
            },0)
            expect(zoeABV).to.equal(7.2)
            done();
          })
        })
    })
  })

  describe('/beers/:name', function(){

    it('should DELETE and existing beer', function(done){
      request.delete('/beers/zoe')
        .expect(200)
        .end(function(err,res){
          if (err) return done(err)
          db.get('beers', function(err,beers){
            var noZoe = beers.reduce((bool,beer)=>{
              if (beer.name === 'zoe'){
                bool = false
              }
              return bool
            },true)
            expect(noZoe).to.equal(true)
            done();
          })
        })
    })
  })
})
