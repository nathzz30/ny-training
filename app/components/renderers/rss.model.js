'use strict';
const { search, existsIndex } = require('../../services/client/elastic');
const queryServices = require('../../services/query');
const log = require('../../services/universal/log').setup({ file: __filename });
/**
 * Add the Meta property to data object with all the information
 *
 * @param  {Object} data
 * @return {Object} data
 */
function addMeta(data) {
  data.meta = {
    title: 'RSS feeds',
    link: 'https://unsplash.com/s/photos/kitties',
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
      { title: element.title },
      { link: element.link },
      { description: element.description },
      { category: 'rss-feed' },
      { guid: element.guid },
      { 'dc:creator': element.author }
    ]);
  });

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
  const index = 'local_recipes_index';
  let query = queryServices.newQuery();
  query = queryServices.match_all();
  return existsIndex(index)
    .then(existsIndex => {
      if (!existsIndex) return data;

      return search(index, query)
        .then(({ hits }) => hits.hits)
        .then(hits => hits.map(({ _source }) => _source))
        .then(source => {
          data.list = source.map(recipe => {
            return {
              title: recipe.recipeTitle,
              author: recipe.author,
              link: recipe.canonicalUrl,
              description: recipe.descriptionRecipe,
              date: recipe.date,
              guid: recipe.canonicalUrl
            };
          });

          addMeta(data);
          addFeed(data);
          addAttr(data);
          return data;
        });
    })
    .catch(err => {
      log('error', `Failure to render RSS , this is the error ${err}`);
      return data;
    });
};
