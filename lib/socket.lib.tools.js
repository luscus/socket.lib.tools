/* jshint node:true */
'use strict';

var Os       = require('os');
var validate = require('./domains/validation');
var protocol = require('./domains/protocol');
var pattern  = require('./domains/pattern');
var net      = require('./domains/net');
var url      = require('./domains/url');

function getHostName () {
  return Os.hostname();
}


exports.getHostName = getHostName;
exports.validate    = validate;
exports.protocol    = protocol;
exports.pattern     = pattern;
exports.net         = net;
exports.url         = url;
