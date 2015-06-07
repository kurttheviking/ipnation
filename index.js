/*jslint node: true*/
'use strict';

var async = require('bluebird').method;
var path = require('path');
var sqlite3 = require('sqlite3');


var db = new sqlite3.Database(path.resolve(__dirname, 'ipnation.db'));
var api = {
  fromIPv4: require('./lib/fromIPv4')
};

// [kurttheviking] inject common dependency
for (var method in api) {
  var fn = api[method];

  api[method] = async(fn(db));
}


module.exports = api;
