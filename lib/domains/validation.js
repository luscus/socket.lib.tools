/* jshint node:true */
'use strict';

var Assert       = require('assert-plus');
var EventEmitter = require('events').EventEmitter;
var merge        = require('node.extend');
var protocol     = require('./protocol');
var pattern      = require('./pattern');

function commonOptions (options) {

  // has a "protocol" option: http, https, tcp, ...
  Assert.string(options.protocol, 'options.protocol');

  // has a "pattern" option: req, rep, sub, pub, ...
  Assert.string(options.pattern, 'options.pattern');

  // has a "port" option
  Assert.ok(options.port, 'options.port');
  try {
    // port can be a range: [start, end] => [8080, 8090]
    Assert.optionalArrayOfNumber(options.port, 'options.port');
  }
  catch (ex) {
    // port can be a number: 8080
    Assert.optionalNumber(options.port, 'options.port');
  }
}

function socketObject (_socket, info) {
  if (! (_socket.emitter instanceof EventEmitter)) {
    var config = merge(true, {}, _socket);

    _socket = {};
    _socket.config = config;

    _socket.config.protocol = protocol.fromPackageName(info.name);

    // emitter is not defined,
    // setting the emitter
    _socket.emitter = new EventEmitter();
    _socket.emit    = _socket.emitter.emit;
    _socket.on      = _socket.emitter.on;
  }

  // set auto configuration values
  _socket.config.model    = pattern.getModel(_socket.config.pattern);

  // check common options
  commonOptions(_socket.config);


  return _socket;
}

exports.commonOptions = commonOptions;
exports.socketObject  = socketObject;
