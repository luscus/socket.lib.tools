/* jshint node:true */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var packetLib = require('../../lib/domains/packet');

var packet     = null;
var data       = {
  test: true
};
var connection = {
  uri: 'http://localhost:8080/'
};


describe('Packet Library Methods:', function () {

  describe('getId:', function () {

    it('exists', function () {
      packetLib.should.have.property('getId');
      packetLib.getId.should.be.a('function');
    });

    it('returns packet id d5949c77e1ab56a2c217dea1cad609eaef0aa628', function () {
      packetLib.getId(connection, 22222).should.equal('d5949c77e1ab56a2c217dea1cad609eaef0aa628');
    });

    it('returns packet id', function () {
      packetLib.getId(connection).should.be.an('string');
    });
  });

  describe('now:', function () {

    it('exists', function () {
      packetLib.should.have.property('now');
      packetLib.now.should.be.a('function');
    });

    it('returns timestamp in the future', function () {
      var now = Date.now() + 10000;
      var result = now + 1;

      packetLib.now(now).should.equal(result);
    });

    it('returns timestamp', function () {
      packetLib.now().should.be.a('number');
    });
  });

  describe('wrapData:', function () {

    it('exists', function () {
      packetLib.should.have.property('wrapData');
      packetLib.wrapData.should.be.a('function');
    });

    it('returns packet', function () {
      packet = packetLib.wrapData(data, connection);

      packet.should.be.an('object');
    });

    it('packet has a "data" property', function () {
      packet.should.have.property('data');
      packet.data.should.be.an('object');
      packet.data.should.have.property('test', true);
    });

    it('packet has a "header" property', function () {
      packet.should.have.property('header');
      packet.header.should.be.an('object');
    });

    describe('header:', function () {

      it('packet has a "id" property', function () {
        packet.header.should.have.property('id');
        packet.header.id.should.be.an('string');
      });

      it('packet has a "created" property', function () {
        packet.header.should.have.property('created');
        packet.header.created.should.be.an('number');
      });
    });
  });

  describe('addRequestStart:', function () {

    it('exists', function () {
      packetLib.should.have.property('addRequestStart');
      packetLib.addRequestStart.should.be.a('function');
    });

    describe('header:', function () {

      it('packet has a "requestStart" property', function () {
        packet = packetLib.addRequestStart(packet);

        packet.header.should.have.property('requestStart');
        packet.header.requestStart.should.be.an('number');
      });

      it('packet has a "queueLatency" property', function () {
        packet.header.should.have.property('queueLatency');
        packet.header.queueLatency.should.be.an('number');
      });
    });
  });

  describe('addResponseStart:', function () {

    it('exists', function () {
      packetLib.should.have.property('addResponseStart');
      packetLib.addResponseStart.should.be.a('function');
    });

    describe('header:', function () {

      it('packet has a "requestLatency" property', function () {
        packet = packetLib.addResponseStart(packet);

        packet.header.should.have.property('requestLatency');
        packet.header.requestLatency.should.be.an('number');
      });

      it('packet has a "responseStart" property', function () {
        packet.header.should.have.property('responseStart');
        packet.header.responseStart.should.be.an('number');
      });
    });
  });

  describe('addResponseTime:', function () {

    it('exists', function () {
      packetLib.should.have.property('addResponseTime');
      packetLib.addResponseTime.should.be.a('function');
    });

    describe('header:', function () {

      it('packet has a "responseTime" property', function () {
        packet = packetLib.addResponseTime(packet);

        packet.header.should.have.property('responseTime');
        packet.header.responseTime.should.be.an('number');
      });
    });
  });

  describe('addResponseLatency:', function () {

    it('exists', function () {
      packetLib.should.have.property('addResponseLatency');
      packetLib.addResponseLatency.should.be.a('function');
    });

    describe('header:', function () {

      it('packet has a "responseLatency" property', function () {
        packet = packetLib.addResponseLatency(packet);

        packet.header.should.have.property('responseLatency');
        packet.header.responseLatency.should.be.an('number');
      });

      it('packet has a "latency" property', function () {
        packet.header.should.have.property('latency');
        packet.header.latency.should.be.an('number');
      });

      it('packet has a "processTime" property', function () {
        packet.header.should.have.property('processTime');
        packet.header.processTime.should.be.an('number');
      });
    });
  });

});
