'use strict';

module.exports = el => {
  let images = document.getElementsByClassName('image');
  let activeImage = document.getElementsByClassName('active');
  activeImage[0].src = images[0].src;

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', e => {
      activeImage[0].src = e.target.src;
    });
  }
};
