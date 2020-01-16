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

  delete data.ingredientsList;

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

  delete data.nutriFactsList;

  return data;
};
