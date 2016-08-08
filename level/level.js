'use strict'

const level = require('level');
const sublevel = require('level-sublevel');

var env = process.env.NODE_ENV || 'dev'

let db = sublevel(level('./db', {valueEncoding: 'json'}))
let beersdb;
let usersdb;

if (env === 'dev'){
  console.log('dev db initialized');
  beersdb = db.sublevel('beers');
  usersdb = db.sublevel('users');
}
else if (env === 'test'){
  console.log('test db initialized');
  beersdb = db.sublevel('test_beers');
  usersdb = db.sublevel('test_users');
}

module.exports = {
  db: db,
  beersdb: beersdb,
  usersdb: usersdb
}
