'use strict'

let app = require('../server.js');
const expect = require('chai').expect;
const request = require('supertest')(app);
let db = require('../level/level.js').db;

describe('AUTH TESTS', function(){

  describe('/auth/login', function(){
    it('should authenticate', function(done){
      request.post('/auth/login')
        .send({
          username: 'Chris',
          password: 'someBigHash',
        })
        .expect(200)
        .end((err,res)=>{
          if (err) return done(err)
          expect(res.body).to.be.ok;
          done();
        })
    })
    it('should respond with 400 for a bogus login', function(done){
      request.post('/auth/login')
        .send({
          username: 'Chris',
          password: 'not my password'
        })
        .expect(400)
        .end((err,res)=>{
          done();
        })
    })
  })
})
