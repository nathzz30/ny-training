'use strict';
/**
 * Add the Meta property to data object with all the information
 *
 * @param  {Object} data
 * @return {Object} data
 */
function addMeta(uri, data) {
  data.meta = {
    title: 'RSS feeds',
    link: uri,
    description: 'This pages was created to present a feed in RSS format.'
  };
  return data;
}

/**
 * Add the Feed property to data object with all the information
 *
 * @param  {Object} data
 * @return {Object} data
 */
function addFeed(data) {
  data.feed = [];
  data.list.forEach(element => {
    data.feed.push([
      {
        title: element.title,
        link: element.link,
        description: element.description,
        category: 'rss-feed'
      }
    ]);
  });
  delete data.list;
  return data;
}

/**
 * Add the attr property to data object with all the information
 *
 * @param  {Object} data
 * @return {Object} data
 */
function addAttr(data) {
  data.attr = {};
  return data;
}

module.exports = function(uri, data, locals) {
  // console.log("--------*************--------------------************------------ ");
  // console.log("Hi we are inside the rss model js uri >>>>>> ", uri);
  addMeta(uri, data);
  addFeed(data);
  addAttr(data);
  console.log('--------*************--------------------************------------ ');
  console.log('Hi we are inside the rss model js data >>>>>> ', data);
  console.log('--------*************--------------------************------------ ');
  // console.log("Hi we are inside the rss model js locals >>>>>> ", locals);
  // console.log("--------*************--------------------************------------ ");

  return data;
};
