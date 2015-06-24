/* jshint node:true */
'use strict';

var Crypto = require('crypto');
var Assert = require('assert-plus');
var Url    = require('url');

/**
 * References the native method from Node.js "url" module
 */
exports.parse       = Url.parse;

/**
 * Generates a SHA1 hash using the socket port and, if provided, secret string
 * The root of an client side socket may be
 * @param {number} port port number
 * @param {string} [secret] optional secret string to be used in the generation
 * @returns {string} an SHA1 hash string
 */
exports.getRootHash = function getRootHash (port, secret) {
  Assert.number(port, 'port');

  var shasum = Crypto.createHash('sha1');

  shasum.update(port.toString());

  if (secret) {
    Assert.string(secret, 'secret');
    shasum.update(secret);
  }

  return shasum.digest('hex');
};
