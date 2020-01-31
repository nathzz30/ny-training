'use strict';

const { search } = require('../../services/server/elastic');

module.exports.render = function(uri, data, locals) {
  let tagsQuery = '';
  data.recipeNormalizedTagsValue.forEach(element => {
    element == 'recipe' ? tagsQuery : (tagsQuery += ' ' + element);
  });
  const query = {
    query: {
      match: {
        normalizedTags: tagsQuery
      }
    }
  };

  data.relatedRecipe = [];

  console.log('Data >>>>> : ', data);

  return search('local_recipes_index', query)
    .then(({ hits }) => hits.hits)
    .then(hits => hits.map(({ _source }) => _source))
    .then(source => {
      //console.log("_sourcess >>>>>>>> ", source);
      source.forEach(recipe => {
        let obj = {
          title: '',
          likes: '',
          urlImg: '',
          urlRecipe: ''
        };
        obj.title = recipe.recipeTitle;
        obj.likes = recipe.cantMadeIt;
        obj.urlImg = recipe.imgBigUrl;
        obj.urlRecipe = recipe.canonicalUrl;

        data.relatedRecipe.push(obj);
      });
      console.log('Data inside the promised >>>> ', data);
      return data;
    });
};
