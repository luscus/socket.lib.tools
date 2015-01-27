/* jshint node:true */
'use strict';

var Crypto = require('crypto');
var Assert = require('assert-plus');

function getPathString (host, port, sercret) {
  Assert.string(host, 'host');
  Assert.number(port, 'port');


  var shasum = Crypto.createHash('sha1');

  shasum.update(host);
  shasum.update(port.toString());

  if (sercret) {
    Assert.string(sercret, 'sercret');
    shasum.update(sercret);
  }

  return shasum.digest('hex');
}

exports.getPathString = getPathString;
