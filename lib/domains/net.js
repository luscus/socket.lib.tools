/* jshint node:true */
'use strict';

var requestip = require('request-ip');

function getRemoteIp (request) {
  return requestip.getClientIp(request);
}

exports.getRemoteIp = getRemoteIp;
