'use strict';
const _ = require('lodash');

/**
 * This is a function that create a object query.
 *
 * @return {object} query Object
 *
 */
const newQuery = () => {
  const query = {
    query: {},
    from: 0,
    size: 20
  };
  return query;
};

/**
 * This function add a property called must and other called match to the query object
 * This will be used to executed a filter in ES
 *
 * @param {object} query - A query object
 * @param {object} params - The params to be added in the match object
 * @return {object} query object
 *
 * @example
 *
 *     mustMatch({ query: {} }, { name: 'carlitos' })
 */
const mustMatch = (query, params) => {
  const result = _.get(query, 'query.bool.must', []);

  result.push({ match: params });
  _.set(query, 'query.bool.must', result);

  return query;
};

/**
 * This function add a property called match_all to bring all from ES (Just 20 row for default)
 *
 * @param {object} query - A query object
 * @return {object} query object
 *
 * @example
 *
 *     match_all({ query: {} })
 */
const match_all = query => {
  const result = _.get(query, 'query', {});
  result['match_all'] = {};
  _.set(query, 'query', result);

  return query;
};

/**
 * This function add a property called must and other called match_phrase to the query object
 * to be used in a filter on ES
 *
 * @param {object} query - A query Object
 * @param {object} params - The params to be added to the Match_phrase object
 * @return {object} query object
 *
 * @example
 *
 *     mustMatch_phrase({ query: {} }, { url: 'www.hola.com' })
 */
const mustMatch_phrase = (query, params) => {
  const result = _.get(query, 'query.bool.must', []);

  result.push({ match_phrase: params });
  _.set(query, 'query.bool.must', result);

  return query;
};

/**
 * This function add the property not_match to the query object to be used to excluded
 * some documents that contain the param
 *
 * @param {object} query - A query object param
 * @param {object} params - the param to be used in the filter
 * @return {object} query object
 *
 * @example
 *
 *     mustNotMatch({ query: {} }, { age: 13 })
 */
const mustNotMatch = (query, params) => {
  const result = _.get(query, 'query.bool.must_not', []);

  result.push({ match: params });
  _.set(query, 'query.bool.must_not', result);

  return query;
};

/**
 * This function add the property must_not, and filter add the match_phrase to the query object to be used to excluded
 * some documents that contain the param in the match_phrase
 *
 * @param {object} query - A query object
 * @param {object} params - the params to be filter
 * @return {object} query object
 *
 * @example
 *
 *     mustNotMatch_phrase({ query: {} }, { url: 'www.cocacola.com' })
 */
const mustNotMatch_phrase = (query, params) => {
  const result = _.get(query, 'query.bool.must_not', []);

  result.push({ match_phrase: params });
  _.set(query, 'query.bool.must_not', result);

  return query;
};

/**
 * This function add properties from and size to the query object
 * to be used to filter
 *
 * @param {object} query - A query object
 * @param {object} object - Object with the parameters from and size
 * @return {object} query object
 *
 * @example
 *
 *     fromSize({ query: {} }, { from: 0, size: 0 })
 */
const fromSize = (query, { from, size }) => {
  query.from = from;
  query.size = size;
  return query;
};

/**
 * This function add a property called sort to the query object
 * to be sorted by ES
 *
 * @param {object} query - A query object
 * @param {object} property - the property to be sorted
 * @return {object} query object
 *
 * @example
 *
 *     sort({ query: {} }, { index: { order: 'asc' } })
 */
const sort = (query, property) => {
  query.sort = [property];
  return query;
};

module.exports = {
  fromSize,
  match_all,
  mustMatch,
  mustMatch_phrase,
  mustNotMatch,
  mustNotMatch_phrase,
  newQuery,
  sort
};
