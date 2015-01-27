/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var pattern = require('../../lib/domains/pattern');

var CLIENT_PATTERNS = [
  'req',
  'sub'
];
var SERVER_PATTERNS = [
  'rep',
  'pub'
];

describe('Pattern Library Constants:', function () {

  it('CLIENT_MODEL_NAME', function () {
    pattern.should.have.property('CLIENT_MODEL_NAME');
    pattern.CLIENT_MODEL_NAME.should.be.a('string');
    pattern.CLIENT_MODEL_NAME.should.equal('client');
  });

  it('SERVER_MODEL_NAME', function () {
    pattern.should.have.property('SERVER_MODEL_NAME');
    pattern.SERVER_MODEL_NAME.should.be.a('string');
    pattern.SERVER_MODEL_NAME.should.equal('server');
  });

  it('CLIENT_PATTERNS', function () {
    pattern.should.have.property('CLIENT_PATTERNS');
    pattern.CLIENT_PATTERNS.should.be.an('array');
    pattern.CLIENT_PATTERNS.should.deep.equal(CLIENT_PATTERNS);
  });

  it('SERVER_PATTERNS', function () {
    pattern.should.have.property('SERVER_PATTERNS');
    pattern.SERVER_PATTERNS.should.be.an('array');
    pattern.SERVER_PATTERNS.should.deep.equal(SERVER_PATTERNS);
  });
});

describe('Pattern Library Methods:', function () {

  describe('isClient:', function () {

    it('exists', function () {
      pattern.should.have.property('isClient');
      pattern.isClient.should.be.a('function');
    });

    describe('recognise all client types', function () {
      CLIENT_PATTERNS.forEach(function clientPatternIterator (patternShort) {
        it(patternShort, function () {
          pattern.isClient(patternShort).should.be.true;
        });
      });
    });

    it('returns false on unknown pattern', function () {
      pattern.isClient('unknown').should.be.false;
    });

    it('can throws error on unknown client pattern', function () {
      pattern.isServer.should.Throw(Error);
    });
  });

  describe('isServer:', function () {

    it('exists', function () {
      pattern.should.have.property('isServer');
      pattern.isServer.should.be.a('function');
    });

    describe('recognise all server types', function () {
      SERVER_PATTERNS.forEach(function clientPatternIterator (patternShort) {
        it(patternShort, function () {
          pattern.isServer(patternShort).should.be.true;
        });
      });
    });

    it('returns false on unknown pattern', function () {
      pattern.isServer('unknown').should.be.false;
    });

    it('can throws error on unknown server pattern', function () {
      pattern.isServer.should.Throw(Error);
    });
  });

  describe('getModel:', function () {

    it('exists', function () {
      pattern.should.have.property('getModel');
      pattern.getModel.should.be.a('function');
    });

    it('throws error on unknown pattern', function () {
      pattern.getModel.should.Throw(Error);
    });
  });

  describe('doesPair:', function () {

    it('exists', function () {
      pattern.should.have.property('doesPair');
      pattern.doesPair.should.be.a('function');
    });

    describe('recognise all pattern pairs', function () {
      SERVER_PATTERNS.forEach(function clientPatternIterator (serverPattern, index) {
        var clientPattern = CLIENT_PATTERNS[index];

        it(clientPattern + '/' + serverPattern, function () {
          pattern.doesPair(clientPattern, serverPattern).should.be.true;
        });
      });
    });

    it('returns false on false pair', function () {
      pattern.doesPair(CLIENT_PATTERNS[0], SERVER_PATTERNS[1]).should.be.false;
    });
  });

  describe('getPair:', function () {

    it('exists', function () {
      pattern.should.have.property('getPair');
      pattern.getPair.should.be.a('function');
    });

    describe('find all server pattern pairs', function () {
      SERVER_PATTERNS.forEach(function clientPatternIterator (serverPattern) {
        var clientPattern = pattern.getPair(serverPattern);

        it(serverPattern + ' -> ' + clientPattern, function () {
          pattern.doesPair(clientPattern, serverPattern).should.be.true;
        });
      });
    });

    describe('find all client pattern pairs', function () {
      CLIENT_PATTERNS.forEach(function clientPatternIterator (clientPattern) {
        var serverPattern = pattern.getPair(clientPattern);

        it(clientPattern + ' -> ' + serverPattern, function () {
          pattern.doesPair(clientPattern, serverPattern).should.be.true;
        });
      });
    });
  });
});
