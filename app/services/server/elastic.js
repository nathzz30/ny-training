'use strict';

const { elastic } = require('amphora-search');

function search(index, query) {
  return elastic.query(index, query);
}

function existsIndex(index) {
  return elastic.existsIndex(index);
}

module.exports.search = search;
module.exports.existsIndex = existsIndex;
