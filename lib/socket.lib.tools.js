/* jshint node:true */
'use strict';

var protocol = require('./domains/protocol');
var pattern  = require('./domains/pattern');
var packet   = require('./domains/packet');
var net      = require('./domains/net');
var uri      = require('./domains/uri');

exports.protocol = protocol;
exports.pattern  = pattern;
exports.packet   = packet;
exports.net      = net;
exports.uri      = uri;
