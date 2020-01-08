'use strict';

module.exports = (ref, data) => {
  data.recommendedRecipe = [];

  if (data.list.length) {
    data.list.forEach(recipe => {
      let [title, urlRecipe, likes, urlImg, author] = recipe.split('*');

      data.recommendedRecipe.push({
        title,
        urlRecipe,
        likes,
        urlImg,
        author
      });
    });
  }

  return data;
};
