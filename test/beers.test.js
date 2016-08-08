'use strict'

let app = require('../server.js');
const expect = require('chai').expect;
const request = require('supertest')(app);
// let level = require('../level/test_level.js');

// let beersdb = level.beersdb
// let usersdb = level.usersdb
// let db = level.db

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

// describe('')
