/* jshint node:true */
'use strict';

var CLIENT_MODEL_NAME = 'client';
var SERVER_MODEL_NAME = 'server';
var CLIENT_PATTERNS = [
  'req',
  'sub'
];

var SERVER_PATTERNS = [
  'rep',
  'pub'
];

function getModel (pattern) {

  if (isClient(pattern)) {
    return CLIENT_MODEL_NAME;
  }
  else if (isServer(pattern)) {
    return SERVER_MODEL_NAME;
  }
  else {
    throw new Error(
      'Unknown pattern "' + pattern.toLowerCase() +
      '". Available patterns are ' +
      '\n   on client side: ' +
      CLIENT_PATTERNS +
      '\n   on server side: ' +
      SERVER_PATTERNS
    );
  }
}

function doesPair (clientPattern, serverPattern) {
  isClient(clientPattern, true);
  isServer(serverPattern, true);

  var clientPatternIndex = CLIENT_PATTERNS.indexOf(clientPattern.toLowerCase());
  var serverPatternIndex = SERVER_PATTERNS.indexOf(serverPattern.toLowerCase());

  return (clientPatternIndex === serverPatternIndex);
}

function getPair (pattern) {
  var model = getModel(pattern);

  switch (model) {
    case CLIENT_MODEL_NAME:
      var clientPatternIndex = CLIENT_PATTERNS.indexOf(pattern.toLowerCase());

      // return pairing server pattern
      return SERVER_PATTERNS[clientPatternIndex];

    case SERVER_MODEL_NAME:
      var serverPatternIndex = SERVER_PATTERNS.indexOf(pattern.toLowerCase());

      // return pairing client pattern
      return CLIENT_PATTERNS[serverPatternIndex];
  }
}

function isClient (pattern, doThrow) {
  var isClientPattern = CLIENT_PATTERNS.indexOf(pattern.toLowerCase()) > -1;

  if (doThrow && !isClientPattern) {
    throw new Error(
      'Unknown client pattern "' + pattern.toLowerCase() +
      '". Available patterns are:\n' +
      CLIENT_PATTERNS
    );
  }

  return isClientPattern;
}

function isServer (pattern, doThrow) {
  var isServerPattern = SERVER_PATTERNS.indexOf(pattern.toLowerCase()) > -1;

  if (doThrow && !isServerPattern) {
    throw new Error(
      'Unknown server pattern "' + pattern.toLowerCase() +
      '". Available patterns are:\n' +
      SERVER_PATTERNS
    );
  }

  return isServerPattern;
}

exports.CLIENT_MODEL_NAME     = CLIENT_MODEL_NAME;
exports.CLIENT_PATTERNS = CLIENT_PATTERNS;
exports.SERVER_MODEL_NAME     = SERVER_MODEL_NAME;
exports.SERVER_PATTERNS = SERVER_PATTERNS;
exports.getModel        = getModel;
exports.doesPair        = doesPair;
exports.getPair         = getPair;
exports.isClient        = isClient;
exports.isServer        = isServer;
