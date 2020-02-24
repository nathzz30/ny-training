'use strict';

const { search, existsIndex } = require('../../services/client/elastic');
const { formattingNumber } = require('../../services/universal/utils');
const log = require('../../services/universal/log').setup({ file: __filename });

module.exports.render = function(uri, data, locals) {
  const index = 'local_recipes_index';
  const [canonicalUrlRecipe] = locals.url.split('?');
  let tagsQuery = '';
  data.recipeNormalizedTagsValue.forEach(element => {
    element == 'recipe' ? tagsQuery : (tagsQuery += ' ' + element);
  });
  const query = {
    query: {
      bool: {
        must: [
          {
            match: {
              normalizedTags: tagsQuery
            }
          }
        ],
        must_not: [
          {
            match_phrase: {
              canonicalUrl: canonicalUrlRecipe
            }
          }
        ]
      }
    }
  };

  return existsIndex(index)
    .then(existsIndex => {
      if (!existsIndex) return data;

      return search(index, query)
        .then(({ hits }) => hits.hits)
        .then(hits => hits.map(({ _source }) => _source))
        .then(source => {
          data.relatedRecipe = source.map(recipe => {
            return {
              title: recipe.recipeTitle,
              likes: formattingNumber(recipe.likes),
              urlImg: recipe.carouselUrls[0].bigImage,
              urlRecipe: recipe.canonicalUrl
            };
          });
          return data;
        });
    })
    .catch(err => {
      log('error', `Failure to render recipe related, this is the error ${err}`);
      return data;
    });
};
