/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var protocol = require('../../lib/domains/protocol');


describe('Protocol Library Constants:', function () {

  it('PROTOCOL_PACKAGE_PREFIX_REGEX', function () {
    protocol.should.have.property('PROTOCOL_PACKAGE_PREFIX_REGEX');
    protocol.PROTOCOL_PACKAGE_PREFIX_REGEX.toString().should.equal('/^socket\\.protocol\\./');
  });

});


describe('Protocol Library Methods:', function () {

  describe('fromPackageName:', function () {

    it('exists', function () {
      protocol.should.have.property('fromPackageName');
      protocol.fromPackageName.should.be.a('function');
    });

    it('returns protocol name', function () {
      protocol.fromPackageName('socket.protocol.http').should.equal('http');
    });

    it('throws on false socket protocol package', function () {
      protocol.fromPackageName.should.Throw(Error);
    });
  });

});
