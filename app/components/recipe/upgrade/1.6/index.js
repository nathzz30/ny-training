'use strict';

module.exports = (ref, data) => {
  let unitMapping = {
    milligramme: 'mg',
    gramme: 'g',
    kilogramme: 'kg',
    millilitre: 'ml',
    litre: 'l',
    pound: 'lb',
    ounce: 'oz',
    cup: 'c',
    unit: 'unit'
  };
  data.ingredients = [];
  data.nutriFacts = [];

  if (data.ingredientsList && data.ingredientsList.length) {
    data.ingredientsList.forEach(element => {
      let [cantMeasure, unitMeasure, ingredient, instructions] = element.split(' ');

      data.ingredients.push({
        ingredient,
        unitMeasure: unitMapping[unitMeasure] || 'mg',
        cantMeasure,
        instructions
      });
    });
  }

  if (data.nutriFactsList && data.nutriFactsList.length) {
    data.nutriFactsList.forEach(element => {
      let [cantMeasure, unitMeasure, fact] = element.split(' ');

      data.nutriFacts.push({
        fact,
        unitMeasure: unitMapping[unitMeasure] || 'mg',
        cantMeasure
      });
    });
  }

  data.likesFormatting = data.likesFormatting ? data.likesFormatting : '';
  data.reviewsFormatting = data.reviewsFormatting ? data.reviewsFormatting : '';
  data.photosFormatting = data.photosFormatting ? data.photosFormatting : '';

  data.likes = parseInt(data.likes);
  data.reviews = parseInt(data.reviews);
  data.photos = parseInt(data.photos);

  return data;
};
