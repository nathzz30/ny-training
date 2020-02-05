'use strict';

const { search, existsIndex } = require('../../services/server/elastic');

function formattingNumber(data) {
  data.likes = parseInt(data.likes) / 1000 >= 1 ? parseInt(data.likes) / 1000 + 'k' : data.likes;
}

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

  data.relatedRecipe = [];

  return existsIndex(index).then(existsIndex => {
    if (!existsIndex) return data;

    return search(index, query)
      .then(({ hits }) => hits.hits)
      .then(hits => hits.map(({ _source }) => _source))
      .then(source => {
        source.forEach(recipe => {
          let obj = {
            title: recipe.recipeTitle,
            likes: recipe.likes,
            urlImg: recipe.imgBigUrl,
            urlRecipe: recipe.canonicalUrl
          };
          formattingNumber(obj);
          data.relatedRecipe.push(obj);
        });

        return data;
      });
  });
};
