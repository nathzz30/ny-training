'use strict';

const rest = require('./../universal/rest');
const elasticHost = 'http://localhost:9200';

function search(index, query) {
  return rest.post(`${elasticHost}/${index}/_search`, query);
}

function existsIndex(index) {
  return rest
    .get(`${elasticHost}/${index}/`)
    .then(() => true)
    .catch(() => false);
}
module.exports.search = search;
module.exports.existsIndex = existsIndex;
