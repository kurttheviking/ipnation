/*jslint node: true*/
'use strict';

var BPromise = require('bluebird');
var inet = require('inet');


var qry = 'SELECT ipv4_iso3.ip, iso_nations.iso2, iso_nations.iso3, iso_nations.iso_nation';
qry += ' FROM ipv4_iso3, iso_nations';
qry += ' WHERE ipv4_iso3.ip < $ip';
qry += ' AND ipv4_iso3.iso3 = iso_nations.iso3';
qry += ' ORDER BY ipv4_iso3.ip DESC';
qry += ' LIMIT 1';


module.exports = function(db) {
  return function fromIPv4(address) {
    if (typeof address !== 'string') {
      throw new TypeError('missing required argument: String(address)');
    }

    var bytes = address.split('.');

    if (bytes.length !== 4) {
      throw new Error('address must be dot-notation IPv4');
    }

    bytes.forEach(function(b, i) {
      b = parseInt(b, 10);

      if (isNaN(b) || b < 0 || b > 255) {
        throw new Error('each ip byte block must be between 0 and 255, inclusive');
      }
    });

    var ip_aton = inet.aton(address);

    if (!ip_aton) {
      throw new Error('cannot convert address to byte-ordered long integer');
    }

    return new BPromise(function(resolve, reject) {
      db.get(qry, {$ip: ip_aton}, function(err, row) {
        if (err) {
          return reject(err);
        }

        return resolve({
          iso2: row.iso2,
          iso3: row.iso3,
          isoNation: row.iso_nation
        });
      });
    });
  };
};
