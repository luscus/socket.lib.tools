/* jshint node:true */
'use strict';

/**
 * Name of the Client Model
 * @type {string}
 */
exports.CLIENT_MODEL_NAME = 'client';

/**
 * Name of the Server Model
 * @type {string}
 */
exports.SERVER_MODEL_NAME = 'server';

/**
 * List of supported client side patterns
 * @type {string[]}
 */
exports.CLIENT_PATTERNS = [
  'req',
  'sub'
];

/**
 * List of supported server side patterns
 * @type {string[]}
 */
exports.SERVER_PATTERNS = [
  'rep',
  'pub'
];

/**
 * Resolves the socket model based on the provided pattern
 *
 * @param {string} pattern socket pattern which has to be listed in {@link exports.CLIENT_PATTERNS} or {@link exports.SERVER_PATTERNS}
 * @returns {string} returns the corresponding model
 *
 * @throws an error is thrown if the provided pattern is unknown (not listed in {@link exports.CLIENT_PATTERNS} or {@link exports.SERVER_PATTERNS})
 */
exports.getModel = function getModel (pattern) {

  if (exports.isClient(pattern)) {
    return exports.CLIENT_MODEL_NAME;
  }
  else if (exports.isServer(pattern)) {
    return exports.SERVER_MODEL_NAME;
  }
  else {

    // provided pattern is unknown
    throw new Error(
      'Unknown pattern "' + pattern.toLowerCase() +
      '". Available patterns are ' +
      '\n   on client side: ' +
      exports.CLIENT_PATTERNS +
      '\n   on server side: ' +
      exports.SERVER_PATTERNS
    );
  }
};

/**
 * Checks whether or not provided client side and server side patterns are compatible
 *
 * @param {string} clientPattern
 * @param {string} serverPattern
 *
 * @returns {boolean} returns true if patterns are compatible, false otherwise
 */
exports.doesPair = function doesPair (clientPattern, serverPattern) {
  exports.isClient(clientPattern, true);
  exports.isServer(serverPattern, true);

  var clientPatternIndex = exports.CLIENT_PATTERNS.indexOf(clientPattern.toLowerCase());
  var serverPatternIndex = exports.SERVER_PATTERNS.indexOf(serverPattern.toLowerCase());

  return (clientPatternIndex === serverPatternIndex);
};

/**
 * Resolves the pairing pattern for the provided client or server side pattern
 *
 * @param {string} pattern pattern for which the pair has to be found
 *
 * @returns {string} returns the pairing pattern
 */
exports.getPair = function getPair (pattern) {
  var model = exports.getModel(pattern);

  switch (model) {
    case exports.CLIENT_MODEL_NAME:
      var clientPatternIndex = exports.CLIENT_PATTERNS.indexOf(pattern.toLowerCase());

      // return pairing server pattern
      return exports.SERVER_PATTERNS[clientPatternIndex];

    case exports.SERVER_MODEL_NAME:
      var serverPatternIndex = exports.SERVER_PATTERNS.indexOf(pattern.toLowerCase());

      // return pairing client pattern
      return exports.CLIENT_PATTERNS[serverPatternIndex];
  }
};

/**
 * Checks whether or not the provided pattern is client sided
 *
 * @param {string} pattern pattern to be checked
 * @param {boolean} [doThrow] throw an error if provided pattern is not a client side pattern
 *
 * @returns {boolean} returns true if the provided pattern is a client side pattern, false otherwise
 */
exports.isClient = function isClient (pattern, doThrow) {
  var isClientPattern = exports.CLIENT_PATTERNS.indexOf(pattern.toLowerCase()) > -1;

  if (doThrow && !isClientPattern) {
    throw new Error(
      'Unknown client pattern "' + pattern.toLowerCase() +
      '". Available patterns are:\n' +
      exports.CLIENT_PATTERNS
    );
  }

  return isClientPattern;
};

/**
 * Checks whether or not the provided pattern is server sided
 *
 * @param {string} pattern pattern to be checked
 * @param {boolean} [doThrow] throw an error if provided pattern is not a server side pattern
 *
 * @returns {boolean} returns true if the provided pattern is a server side pattern, false otherwise
 */
exports.isServer = function isServer (pattern, doThrow) {
  var isServerPattern = exports.SERVER_PATTERNS.indexOf(pattern.toLowerCase()) > -1;

  if (doThrow && !isServerPattern) {
    throw new Error(
      'Unknown server pattern "' + pattern.toLowerCase() +
      '". Available patterns are:\n' +
      exports.SERVER_PATTERNS
    );
  }

  return isServerPattern;
};
