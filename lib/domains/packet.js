/* jshint node:true */
'use strict';

var Crypto = require('crypto');

exports.getId = function getId (connection, now) {
  now = (now ? now.toString() : exports.now().toString());

  var target = (typeof connection === 'string' ? connection : connection.uri);
  var shasum = Crypto.createHash('sha1');

  shasum.update(target);
  shasum.update(now);

  return shasum.digest('hex');
};

exports.now = function now (limitInThePast) {

  var timestamp = Date.now();

  if (timestamp < limitInThePast) {
    timestamp = limitInThePast + 1;
  }

  return timestamp;
};

exports.wrapData = function wrapData (data, connection) {
  var packet = {};

  packet.data                     = data;

  packet.header                   = {};
  packet.header.id                = exports.getId(connection);
  packet.header.created           = exports.now();

  return packet;
};

exports.addRequestStart = function addRequestStart (packet) {

  if (packet.header.created) {
    var now  = exports.now(packet.header.created);

    packet.header.requestStart = now;
    packet.header.queueLatency = now - packet.header.created;
  }

  return packet;
};

exports.addResponseStart = function addResponseStart (packet) {

  if (packet.header.requestStart) {
    var now  = exports.now(packet.header.requestStart);

    packet.header.requestLatency = now - packet.header.requestStart;
    packet.header.responseStart  = now;
  }

  return packet;
};

exports.addResponseTime = function addResponseTime (packet) {
  if (packet.header.responseStart) {
    var now  = exports.now(packet.header.responseStart);

    packet.header.responseTime   = now - packet.header.responseStart;
  }

  return packet;
};

exports.addResponseLatency = function addResponseLatency (packet) {

  if (packet.header.responseStart && packet.header.responseTime !== undefined) {
    var responseSendTime = packet.header.responseStart + packet.header.responseTime;
    var now = exports.now(responseSendTime);

    packet.header.responseLatency = now - responseSendTime;

    packet.header.latency         = packet.header.requestLatency + packet.header.responseLatency;
    packet.header.processTime     = packet.header.latency + packet.header.responseTime;
  }

  return packet;
};
