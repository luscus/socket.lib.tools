/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var tools    = require('../lib/socket.lib.tools');
var validate = require('../lib/domains/validation');
var protocol = require('../lib/domains/protocol');
var pattern  = require('../lib/domains/pattern');
var net      = require('../lib/domains/net');
var url      = require('../lib/domains/url');


describe('socket.lib.tools:', function () {

  it('validate', function () {
    tools.should.have.property('validate');
    tools.validate.should.be.an('object');
    tools.validate.should.deep.equal(validate);
  });

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

  it('url', function () {
    tools.should.have.property('url');
    tools.url.should.be.an('object');
    tools.url.should.deep.equal(url);
  });

});
