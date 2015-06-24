/* jshint node:true */
'use strict';

/**
 * Prefix of an Application Framework socket protocol package
 * @type {RegExp}
 */
exports.PROTOCOL_PACKAGE_PREFIX_REGEX = /^socket\.protocol\./;

/**
 * Retrieves protocol name from package name
 *
 * @param {string} packageName name of the used protocol package
 * @returns {string} returns the protocol name
 *
 * @throws an error if the provided packageName is not an Application Framework socket protocol package
 */
exports.fromPackageName = function fromPackageName (packageName) {

  if (packageName.match(exports.PROTOCOL_PACKAGE_PREFIX_REGEX)) {
    return packageName.replace(exports.PROTOCOL_PACKAGE_PREFIX_REGEX, '');
  }
  else {
    throw new Error(
      'Provided package name "' +
      packageName +
      '" is no Application Framework socket protocol package. ' +
      'Checked against regular expression: ' +
      exports.PROTOCOL_PACKAGE_PREFIX_REGEX.toString()
    );
  }
};
