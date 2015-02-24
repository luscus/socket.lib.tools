/* jshint node:true */
'use strict';

var protocol = require('./domains/protocol');
var pattern  = require('./domains/pattern');
var net      = require('./domains/net');
var uri      = require('./domains/uri');

exports.protocol = protocol;
exports.pattern  = pattern;
exports.net      = net;
exports.uri      = uri;
