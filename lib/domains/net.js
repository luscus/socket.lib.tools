/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var requestip = require('request-ip');
var Dns       = require('dns');

/**
 * Hashmap holding all resolved and unresolved hostname with the IP address as key
 * if an IP address could not be resolved into an hostname, it will be used as hostname
 *
 * @private
 * @type {{}}
 */
var hostnames = {};

/**
 * Regular expression corresponding to an IPv4 address
 *
 * @type {RegExp}
 */
exports.IPv4_REGEX = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;

/**
 * Builds the base url from the socket options
 *
 * @param {{}} options socket options
 *
 * @returns {string} socket's base url
 */
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

/**
 * Removes non ip information from ip address, such as loadbalancer pool member names (0.0.0.0%<something>)
 *
 * @param {string} ip ip address to be sanitised
 *
 * @returns {string} returns the sanitised raw ip address
 */
exports.sanitiseIp = function sanitiseIp (ip) {
  // TODO: make it available for IPv6
  var check     = ip.match(exports.IPv4_REGEX);
  var sanitised = ip;

  if (check !== null) {
    sanitised = check[0];
  }

  return sanitised;
};

/**
 * Default callback for an DNS lookup
 * if an error was raised and the hostname could not be resolved,
 * then the ip address will be used as hostname
 *
 * @param error
 * @param domains
 */
exports.defaultDnsCallback = function defaultDnsCallback (error, domains) {
  var ip = this;

  if (error) {
    console.error('\ndefaultDnsCallback\n  address: ', ip, '\n  error: ', error, '\n  stack: ', error.stack, '\n');
    hostnames[ip] = ip;
    return;
  }

  hostnames[ip] = domains[0];
};

/**
 * Resolves the hostname for a given ip address
 *
 * @param {string} ip
 * @param {function} [callback]
 *
 * @returns {*} returns either the host ip address or false if none was found and the lookup is still ongoing
 */
exports.dnsLookup = function dnsLookup (ip, callback) {

  if (hostnames[ip]) {
    return hostnames[ip];
  }
  else {
    var sanitisedIp = exports.sanitiseIp(ip);

    callback = callback || exports.defaultDnsCallback.bind(ip);

    try {
      Dns.reverse(sanitisedIp, callback);
    }
    catch (error) {

      // if an error occurs, pass it to the callback for handling
      callback(error);
    }

    return false;
  }
};
