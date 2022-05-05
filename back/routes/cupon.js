'use strict'

var express = require('express');
var cuponController = require('../controllers/CuponController');

var api = express.Router();
var auth = require('../middlewares/authenticate');




module.exports = api;