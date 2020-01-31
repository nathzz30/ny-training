'use strict';

const { elastic } = require('amphora-search');

function search(index, query) {
  return elastic.query(index, query);
}

module.exports.search = search;
