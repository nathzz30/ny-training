'use strict';

module.exports = (ref, data) => {
  data.madeIt = data.madeIt || '7111111';
  data.reviews = data.reviews || '38';
  data.photos = data.photos || '2';

  return data;
};
