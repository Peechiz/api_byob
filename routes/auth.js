'use strict'

var express = require('express'),
    router = express.Router();

let level = require('../level/level.js');
let db = level.db
