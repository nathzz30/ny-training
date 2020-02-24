'use strict';

const { search, existsIndex } = require('../../services/client/elastic');
const { formattingNumber } = require('../../services/universal/utils');
const log = require('../../services/universal/log').setup({ file: __filename });

module.exports.render = function(uri, data, locals) {
  const index = 'local_recipes_index';
  const [canonicalUrlRecipe] = locals.url.split('?');

  const query = {
    sort: [
      {
        likes: {
          order: 'desc'
        }
      }
    ],
    query: {
      bool: {
        must_not: [
          {
            match_phrase: {
              canonicalUrl: canonicalUrlRecipe
            }
          }
        ]
      }
    },
    from: 0,
    size: 2
  };

  return existsIndex(index)
    .then(existsIndex => {
      if (!existsIndex) return data;

      return search(index, query)
        .then(({ hits }) => hits.hits)
        .then(hits => hits.map(({ _source }) => _source))
        .then(source => {
          data.recommendedRecipe = source.map(recipe => {
            return {
              title: recipe.recipeTitle,
              likes: formattingNumber(recipe.likes),
              urlImg: recipe.carouselUrls[0].bigImage,
              urlRecipe: recipe.canonicalUrl,
              author: recipe.author
            };
          });

          return data;
        });
    })
    .catch(err => {
      log('error', `Failure to render sidebar component, this is the error ${err}`);
      return data;
    });
};
