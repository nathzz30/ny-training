'use strict';

const publishing = require('../../services/server/publish-url'),
  mainComponentRefs = ['article', 'main-recipe', 'recipe'];

module.exports.routes = [
  { path: '/' },
  { path: '/:year/:month/:name' },
  { path: '/article/:name' },
  { path: '/recipe/:title' }
];

// Resolve the url to publish to
module.exports.resolvePublishUrl = [
  // Simple url format
  (uri, data, locals) => publishing.getSlugUrlRecipe(data, locals, mainComponentRefs),
  (uri, data, locals) => publishing.getSlugUrl(data, locals, mainComponentRefs)
];
