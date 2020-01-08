'use strict';

module.exports = (ref, data) => {
  let unitMapping = {
    milligramme: 'mg',
    gramme: 'g',
    cup: 'c',
    unit: 'unit'
  };
  data.ingredients = [];

  console.log('data.ingredient1: ', data.ingredient1);

  if (data.ingredient1) {
    let [count, unitMeasure, ingredient] = data.ingredient1.split(' ');

    data.ingredients.push({
      count,
      ingredient,
      unitMeasure: unitMapping[unitMeasure] || 'mg'
    });
  }

  return data;
};
