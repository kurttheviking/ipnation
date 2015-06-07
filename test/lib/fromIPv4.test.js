/* jslint node: true */
/* global describe, it */
'use strict';

var expect = require('chai').expect;


function noop() {}

describe('fromIPv4', function() {
  var fn = require('../../index').fromIPv4;

  it('converts a known Belgium address', function() {
    var sample = '78.29.198.10';
    var target = {
      iso2: 'BE',
      iso3: 'BEL',
      isoNation: 'Belgium'
    };

    return fn(sample).then(function(res) {
      expect(res).to.deep.equal(target);
    });
  });

  it('converts a known India address', function() {
    var sample = '210.89.32.26';
    var target = {
      iso2: 'IN',
      iso3: 'IND',
      isoNation: 'India'
    };

    return fn(sample).then(function(res) {
      expect(res).to.deep.equal(target);
    });
  });

  it('converts a known United States address', function() {
    var sample = '50.19.117.83';
    var target = {
      iso2: 'US',
      iso3: 'USA',
      isoNation: 'United States'
    };

    return fn(sample).then(function(res) {
      expect(res).to.deep.equal(target);
    });
  });

  it('rejects if passed null', function(done) {
    var sample = null;

    fn(sample).then(noop, function(err) {
      expect(err).to.be.instanceof(Error);
      expect(err.toString()).to.equal('TypeError: missing required argument: String(address)');
    }).then(done, done);
  });

  it('rejects if passed Number', function(done) {
    var sample = 255;

    fn(sample).then(noop, function(err) {
      expect(err).to.be.instanceof(Error);
      expect(err.toString()).to.equal('TypeError: missing required argument: String(address)');
    }).then(done, done);
  });

  it('rejects if passed incomplete IPv4 address', function(done) {
    var sample = '50.19.117';

    fn(sample).then(noop, function(err) {
      expect(err).to.be.instanceof(Error);
      expect(err.toString()).to.equal('Error: address must be dot-notation IPv4');
    }).then(done, done);
  });

  it('rejects if passed malformed IPv4 address', function(done) {
    var sample = '50.19.117.';

    fn(sample).then(noop, function(err) {
      expect(err).to.be.instanceof(Error);
      expect(err.toString()).to.equal('Error: each ip byte block must be between 0 and 255, inclusive');
    }).then(done, done);
  });

  it('rejects if passed an IPv6 address', function(done) {
    var sample = '2101:88h:4f02:c3d8:507:26cd:f6a:faf9';

    fn(sample).then(noop, function(err) {
      expect(err).to.be.instanceof(Error);
      expect(err.toString()).to.equal('Error: address must be dot-notation IPv4');
    }).then(done, done);
  });
});
