/* jshint node:true */
'use strict';

var Crypto = require('crypto');
var Assert = require('assert-plus');
var Url    = require('url');

exports.parse         = Url.parse;

exports.getPathString = function getPathString (port, sercret) {
  Assert.number(port, 'port');


  var shasum = Crypto.createHash('sha1');

  shasum.update(port.toString());

  if (sercret) {
    Assert.string(sercret, 'sercret');
    shasum.update(sercret);
  }

  return shasum.digest('hex');
};
