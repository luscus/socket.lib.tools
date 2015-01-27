/* jshint node:true */
'use strict';

var PROTOCOL_PACKAGE_PREFIX_REGEX = /^socket\.protocol\./;

function fromPackageName (packageName) {

  if (packageName.match(PROTOCOL_PACKAGE_PREFIX_REGEX)) {
    return packageName.replace(PROTOCOL_PACKAGE_PREFIX_REGEX, '');
  }
  else {
    throw new Error(
      'Provided package name "' +
      packageName +
      '" is no Application Framework socket protocol package. ' +
      'Checked against regular expression: ' +
      PROTOCOL_PACKAGE_PREFIX_REGEX.toString()
    );
  }
}

exports.PROTOCOL_PACKAGE_PREFIX_REGEX = PROTOCOL_PACKAGE_PREFIX_REGEX;
exports.fromPackageName = fromPackageName;
