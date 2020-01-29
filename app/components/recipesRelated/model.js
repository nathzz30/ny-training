'use strict';

module.exports.render = function(uri, data, locals) {
  // console.log("-------------------------------------------------------------------------------");
  // console.log("data in the model >>>>> ", data);
  // console.log("-------------------------------------------------------------------------------");
  data.recipeNormalizedTagsValue = data.recipeNormalizedTagsValue || [];
  return data;
};
