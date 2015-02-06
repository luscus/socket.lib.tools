/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var net = require('../../lib/domains/net');
var config = {
  protocol: 'http',
  host: 'LOCALHOST',
  port: 8080
};

describe('Net Library Methods:', function () {

  describe('getUri:', function () {

    it('exists', function () {
      net.should.have.property('getUri');
      net.getUri.should.be.a('function');
    });

    it('returns correct uri', function () {
      net.getUri(config).should.equal('http://localhost:8080/');
    });
  });

  describe('getRemoteIp:', function () {

    it('exists', function () {
      net.should.have.property('getRemoteIp');
      net.getRemoteIp.should.be.a('function');
    });
  });

  describe('defaultDnsCallback:', function () {

    it('exists', function () {
      net.should.have.property('defaultDnsCallback');
      net.defaultDnsCallback.should.be.a('function');
    });
  });

  describe('dnsLookup:', function () {

    it('exists', function () {
      net.should.have.property('dnsLookup');
      net.dnsLookup.should.be.a('function');
    });
  });

});
