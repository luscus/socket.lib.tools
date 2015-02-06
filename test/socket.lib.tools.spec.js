/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var tools    = require('../lib/socket.lib.tools');
var protocol = require('../lib/domains/protocol');
var pattern  = require('../lib/domains/pattern');
var net      = require('../lib/domains/net');
var uri      = require('../lib/domains/uri');


describe('socket.lib.tools:', function () {

  it('protocol', function () {
    tools.should.have.property('protocol');
    tools.protocol.should.be.an('object');
    tools.protocol.should.deep.equal(protocol);
  });

  it('pattern', function () {
    tools.should.have.property('pattern');
    tools.pattern.should.be.an('object');
    tools.pattern.should.deep.equal(pattern);
  });

  it('net', function () {
    tools.should.have.property('net');
    tools.net.should.be.an('object');
    tools.net.should.deep.equal(net);
  });

  it('uri', function () {
    tools.should.have.property('uri');
    tools.uri.should.be.an('object');
    tools.uri.should.deep.equal(uri);
  });

});
