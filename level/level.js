'use strict'

var env = process.env.NODE_ENV || '_test'

// let db = require('then-levelup')(require('level')(`./beer${env}`, {valueEncoding: 'json'}));

const level = require('level');
// TODO uncomment this later
// var db = level(`./beer${env}`, {valueEncoding: 'json'})
var db = level(`./beer_test`, {valueEncoding: 'json'})

module.exports = {
  db: db
}
