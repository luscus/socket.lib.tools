/* jshint node:true */
'use strict';

var requestip = require('request-ip');
var Dns       = require('dns');

var hostnames = {};


exports.getUri = function getUri (config) {

  return config.protocol +
    '://' +
    config.host.toLowerCase() +
    ':' +
    config.port +
    '/';
};

exports.getRemoteIp = function getRemoteIp (request) {
  return requestip.getClientIp(request);
};

exports.defaultDnsCallback = function defaultDnsCallback (error, domains) {
  var ip = this;

  if (error) {
    console.error(ip, error, error.stack);
    hostnames[ip] = ip;
    return;
  }

  hostnames[ip] = domains[0];
};

exports.dnsLookup = function dnsLookup (ip, callback) {

  if (hostnames[ip]) {
    return hostnames[ip];
  }
  else {
    callback = callback || exports.defaultDnsCallback.bind(ip);

    Dns.reverse(ip, callback);

    return false;
  }
};
