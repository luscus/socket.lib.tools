/* jshint node:true */
'use strict';

var Crypto = require('crypto');
var Assert = require('assert-plus');
var Url    = require('url');

exports.parse       = Url.parse;

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
