'use strict';

module.exports = (ref, data) => {
  data.recommendedRecipe = [];

  if (data.list && data.list.length) {
    data.list.forEach(recipe => {
      let [title, urlRecipe, likes, urlImg, author, likesFormatting] = recipe.split('*');

      data.recommendedRecipe.push({
        title,
        urlRecipe,
        likes,
        urlImg,
        author,
        likesFormatting
      });
    });
  }

  return data;
};
