ipnation
========

[![Build Status](https://travis-ci.org/kurttheviking/ipnation.svg?branch=master)](https://travis-ci.org/kurttheviking/ipnation)

Quickly convert an [IPv4](http://en.wikipedia.org/wiki/IPv4) address to an [ISO Nation](http://en.wikipedia.org/wiki/ISO_3166-1)


## Install

```
npm install ipnation
```


## Basic use

```
> var ipnation = require('ipnation');
> ipnation.fromIPv4('50.19.117.93').then(function(res) {
  console.log(res);
});

{
  iso2: 'US',
  iso3: 'USA',
  isoNation: 'United States'
}
```


## API

#### `fromIPv4(address)`

Query the IPv4 address space for a matching ISO nation code.

*Arguments*

- `address`: String; a dot-decimal IPv4 address (e.g. `50.19.117.93`)

*Returns*

[Promise](https://www.npmjs.com/package/bluebird) that resolves to an ISO code set for the address; the promise is rejected with an error if the address is malformed or invalid

*Example*

```
> ipnation.fromIPv4('50.19.117.93').then(function(res) {
  console.log(res);
});

{
  iso2: 'US',
  iso3: 'USA',
  isoNation: 'United States'
}
```


## Data

This project is based on the publicly available dataset at [ip2nation.com](http://www.ip2nation.com). The source data has been migrated to the following schema:

#### `ipv4_iso3`

|     | field | type definition    |
| --- | :---- | :----------------- |
|  *  | ip    | `UNSIGNED INTEGER` |
|     | iso3  | `CHAR(3)`          |

`ip` is the dot-decimal IPv4 address converted to binary representation ([`inet_aton`](http://linux.die.net/man/3/inet_aton)) then unpacked to a long integer.

#### `iso_nations`

|     | field      | type definition    |
| --- | :--------- | :------------- |
|     | iso2       | `CHAR(2)`      |
|  *  | iso3       | `CHAR(3)`      |
|     | iso_nation | `VARCHAR(255)` |


#### Persistence

All data resides in a local SQLite3 database which provides portable storage, efficient indexing, and fast querying. If you receive build warnings/errors from SQLite, consult the [`node-sqlite3`](https://github.com/mapbox/node-sqlite3) documentation.

Nation data is based on [ISO 3166-1 country codes](http://en.wikipedia.org/wiki/ISO_3166-1) available in the source dataset with a few additions necessary to achieve internal consistency:

- `AP`; `APN`; Asia/Pacific Region
- `BQ`; `BES`; Bonaire, Sint Eustatius and Saba
- `CW`; `CUW`; Curacao
- `EU`, `EUR`, Europe
- `GG`; `GGY`; Guernsey
- `IM`; `IMN`; Isle of Man
- `JE`, `JEY`, Jersey
- `MF`, `MAF`, Saint Martin (French)
- `SS`, `SSD`, South Sudan
- `SX`, `SXM`, Sint Maarten (Dutch)

Currently, a few addresses may resolve to an unknown nation response:

```
{
  iso2: '??',
  iso3: '???',
  isoNation: 'UNK'
}
```


## Tests

```
npm test
```

To get the coverage report:

```
npm run coverage
```

Detailed reports are available in the `./artifacts` directory. This project maintains 100% coverage of functions and 80%+ coverage of branches.


## Contribute

PRs are welcome! PRs must improve or maintian test coverage to be accepted.

For bugs, please include a failing test which passes when your PR is applied. For CRUD actions against the underlying SQLite database, please submit a `.sql` migration file in the `sql` directory.
