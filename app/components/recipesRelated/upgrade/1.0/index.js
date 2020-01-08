'use strict';

module.exports = (ref, data) => {
  data.relatedRecipe = [];

  if (data.data.length) {
    data.data.forEach(recipe => {
      let [title, urlRecipe, likes, urlImg] = recipe.split('*');

      data.relatedRecipe.push({
        title,
        urlRecipe,
        likes,
        urlImg
      });
    });
  }

  return data;
};
