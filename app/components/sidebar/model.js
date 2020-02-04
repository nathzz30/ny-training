'use strict';

const { search, existsIndex } = require('../../services/server/elastic');

function formattingNumber(data) {
  data.likes = parseInt(data.likes) / 1000 >= 1 ? parseInt(data.likes) / 1000 + 'k' : data.likes;
}

module.exports.render = function(uri, data, locals) {
  const index = 'local_recipes_index';
  const query = {
    query: {
      match_all: {}
    }
  };

  return existsIndex(index).then(existsIndex => {
    if (existsIndex) {
      return search(index, query)
        .then(({ hits }) => hits.hits)
        .then(hits => hits.map(({ _source }) => _source))
        .then(source => {
          data.recommendedRecipe = [];

          let recipeLikes = source.map(recipe => recipe.likes);
          recipeLikes = recipeLikes.sort(function(a, b) {
            return b - a;
          });
          let recipes = source.filter(recipe => {
            return recipe.likes === recipeLikes[0] || recipe.likes === recipeLikes[1];
          });
          recipes.forEach(recipe => {
            let obj = {
              title: recipe.recipeTitle,
              likes: recipe.likes,
              urlImg: recipe.imgBigUrl,
              urlRecipe: recipe.canonicalUrl,
              author: recipe.author
            };
            formattingNumber(obj);
            data.recommendedRecipe.push(obj);
          });

          return data;
        });
    } else {
      return data;
    }
  });
};
