'use strict';

const _get = require('lodash/get'),
  _ = require('lodash'),
  dateFormat = require('date-fns/format'),
  dateParse = require('date-fns/parse'),
  utils = require('../../services/universal/utils'),
  has = utils.has; // convenience

/**
 * set the publish date from the locals (even if it's already set),
 * and format it correctly
 * @param  {object} data
 * @param  {object} locals
 */
function formatDate(data, locals) {
  if (_get(locals, 'date')) {
    // if locals and locals.date exists, set the article date (overriding any date already set)
    data.date = dateFormat(locals.date); // ISO 8601 date string
  } else if (has(data.recipeDate) || has(data.recipeTime)) {
    // make sure both date and time are set. if the user only set one, set the other to today / right now
    data.recipeDate = has(data.recipeTime) ? data.recipeDate : dateFormat(new Date(), 'YYYY-MM-DD');
    data.recipeTime = has(data.recipeTime) ? data.recipeTime : dateFormat(new Date(), 'HH:mm');
    // generate the `date` data from these two fields
    data.date = dateFormat(dateParse(`${data.recipeDate} ${data.recipeTime}`)); // ISO 8601 date string
  }
}

/**
 * set the canonical url from the locals (even if it's already set)
 * @param {object} data
 * @param {object} locals
 */
function setCanonicalUrl(data, locals) {
  if (_get(locals, 'publishUrl')) {
    data.canonicalUrl = locals.publishUrl;
  }
}

/**
 * formatting the numbers to present on the component
 * @param {object} data
 */
function formatting(data) {
  data.likesFormatting = utils.formattingNumber(data.likes);
  data.reviewsFormatting = utils.formattingNumber(data.reviews);
  data.photosFormatting = utils.formattingNumber(data.photos);
}

module.exports.render = function(uri, data, locals) {
  // first, let's get all the synchronous stuff out of the way:
  // setting fields, etc
  formatDate(data, locals);
  setCanonicalUrl(data, locals);
  formatting(data);
  return data;
};
