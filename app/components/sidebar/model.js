'use strict';

const { search, existsIndex } = require('../../services/server/elastic');
const { formattingNumber } = require('../../services/universal/utils');

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

  return existsIndex(index).then(existsIndex => {
    if (!existsIndex) return data;

    return search(index, query)
      .then(({ hits }) => hits.hits)
      .then(hits => hits.map(({ _source }) => _source))
      .then(source => {
        data.recommendedRecipe = source.map(recipe => {
          return {
            title: recipe.recipeTitle,
            likes: formattingNumber(recipe.likes),
            urlImg: recipe.imgBigUrl,
            urlRecipe: recipe.canonicalUrl,
            author: recipe.author
          };
        });

        return data;
      });
  });
};
