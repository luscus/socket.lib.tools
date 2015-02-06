/* jshint node:true */
'use strict';

exports.PROTOCOL_PACKAGE_PREFIX_REGEX = /^socket\.protocol\./;

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
