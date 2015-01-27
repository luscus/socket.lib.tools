/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var net = require('../../lib/domains/net');

describe('Net Library Methods:', function () {

  describe('getRemoteIp:', function () {

    it('exists', function () {
      net.should.have.property('getRemoteIp');
      net.getRemoteIp.should.be.a('function');
    });
  });

});
