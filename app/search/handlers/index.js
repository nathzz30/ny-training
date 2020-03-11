const amphoraSearch = require('amphora-search'),
  highland = require('highland'),
  { getComponentName } = require('clayutils');

const elasticIndex = 'local_recipes_index';

amphoraSearch.subscribe('save').through(handlerSave);

function handlerSave(stream) {
  return stream
    .map(opstream => {
      return opstream
        .filter(op => getComponentName(op.key) === 'recipe' && op.key.includes('@published'))
        .collect()
        .compact();
    })
    .parallel(1)
    .flatten()
    .map(element => {
      const {
        recipeTitle,
        canonicalUrl,
        descriptionRecipe,
        carouselUrls,
        date,
        likes,
        normalizedTags,
        author
      } = JSON.parse(element.value);
      return {
        _ref: element.key,
        recipeTitle,
        canonicalUrl,
        date,
        descriptionRecipe,
        carouselUrls,
        likes,
        normalizedTags,
        author
      };
    })
    .flatMap(op => {
      return highland(amphoraSearch.elastic.put(elasticIndex, op._ref, op).then(() => op._ref));
    })
    .done();
}
