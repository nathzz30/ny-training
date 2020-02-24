'use strict';

module.exports = (ref, data) => {
  delete data.images;
  delete data.imgBigUrl;
  delete data.img1;
  delete data.img2;
  delete data.img3;
  delete data.img4;
  return data;
};
