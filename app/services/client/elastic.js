'use strict';

const rest = require('./../universal/rest');

function search(index, query) {
  return rest.post('localhost:9200/_search', {
    index,
    body: query
  });
}

module.exports.search = search;
