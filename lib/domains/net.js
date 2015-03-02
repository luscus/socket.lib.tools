/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var requestip = require('request-ip');
var Dns       = require('dns');

var hostnames = {};

exports.IPv4_REGEX = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;

exports.getBaseUrl = function getBaseUrl (options) {

  return options.protocol +
    '://' +
    options.host.toLowerCase() +
    ':' +
    options.port;
};

exports.getRemoteIp = function getRemoteIp (request) {
  return requestip.getClientIp(request);
};

exports.sanitiseIp = function sanitiseIp (ip) {
  // TODO: make it available for IPv6
  var check     = ip.match(exports.IPv4_REGEX);
  var sanitised = ip;

  if (check !== null) {
    sanitised = check[0];
  }

  return sanitised;
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
    var sanitisedIp = exports.sanitiseIp(ip);

    callback = callback || exports.defaultDnsCallback.bind(ip);

    Dns.reverse(sanitisedIp, callback);
    return false;
  }
};
