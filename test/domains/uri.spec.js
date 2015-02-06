/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var uri = require('../../lib/domains/uri');


describe('Url Library Methods:', function () {

  describe('getPathString:', function () {

    it('exists', function () {
      uri.should.have.property('getPathString');
      uri.getPathString.should.be.a('function');
    });

    it('path without secret', function () {
      uri.getPathString(666)
        .should.equal('cd3f0c85b158c08a2b113464991810cf2cdfc387');
    });

    it('path with secret', function () {
      uri.getPathString(666, 'mySecret')
        .should.equal('ea0f45f478353c8a07f825033ab479cd1a885824');
    });
  });

  describe('parse:', function () {

    it('exists', function () {
      uri.should.have.property('parse');
      uri.parse.should.be.a('function');
    });
  });
});
