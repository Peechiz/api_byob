'use strict'

var env = process.env.NODE_ENV || '_test'

// let db = require('then-levelup')(require('level')(`./beer${env}`, {valueEncoding: 'json'}));

const level = require('level');
var db = level(`./beer${env}`, {valueEncoding: 'json'})

module.exports = {
  db: db
}
