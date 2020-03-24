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

  if (data.ingredient1) {
    let [cantMeasure, unitMeasure, ingredient, instructions] = data.ingredient1.split(' ');

    data.ingredients.push({
      ingredient,
      unitMeasure: unitMapping[unitMeasure] || 'mg',
      cantMeasure,
      instructions
    });

    delete data.ingredient1;
  }

  if (data.ingredient2) {
    let [cantMeasure, unitMeasure, ingredient, instructions] = data.ingredient2.split(' ');

    data.ingredients.push({
      ingredient,
      unitMeasure: unitMapping[unitMeasure] || 'mg',
      cantMeasure,
      instructions
    });

    delete data.ingredient2;
  }

  if (data.ingredient3) {
    let [cantMeasure, unitMeasure, ingredient, instructions] = data.ingredient3.split(' ');

    data.ingredients.push({
      ingredient,
      unitMeasure: unitMapping[unitMeasure] || 'mg',
      cantMeasure,
      instructions
    });

    delete data.ingredient3;
  }

  if (data.ingredient4) {
    let [cantMeasure, unitMeasure, ingredient, instructions] = data.ingredient4.split(' ');

    data.ingredients.push({
      ingredient,
      unitMeasure: unitMapping[unitMeasure] || 'mg',
      cantMeasure,
      instructions
    });

    delete data.ingredient4;
  }

  if (data.ingredient5) {
    let [cantMeasure, unitMeasure, ingredient, instructions] = data.ingredient5.split(' ');

    data.ingredients.push({
      ingredient,
      unitMeasure: unitMapping[unitMeasure] || 'mg',
      cantMeasure,
      instructions
    });

    delete data.ingredient5;
  }

  return data;
};
