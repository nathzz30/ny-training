'use strict';

function getIndex(n, arrLength, current) {
  current += n;
  if (current < 0) {
    current = arrLength - 1;
  }
  if (current == arrLength) {
    current = 0;
  }
  return current;
}

module.exports = () => {
  let slideshow = document.querySelector('.slideshow');
  let carousel = document.querySelector('.carousel');
  let slideshowCarousel = document.querySelector('.slideshowCarousel');
  let images = document.getElementsByClassName('image');
  let activeImage = document.getElementsByClassName('active');
  let arrows = document.querySelector('.arrows');
  let current = 0;
  if (activeImage && images) {
    activeImage[0].src = images[0].src;
    images[0].classList.add('selected');
  }

  if (slideshow) {
    arrows.classList.add('hidden');

    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', e => {
        const selected = document.querySelector('.selected');

        selected && selected.classList.remove('selected');
        activeImage[0].src = e.target.src;
        images[i].classList.add('selected');
      });
    }
  }

  if (carousel) {
    let divImages = document.querySelector('.images');
    divImages.classList.add('hidden');
    document.querySelector('.prev').addEventListener('click', e => {
      current = getIndex(-1, images.length, current);
      activeImage[0].src = images[current].src;
    });

    document.querySelector('.next').addEventListener('click', e => {
      current = getIndex(1, images.length, current);
      activeImage[0].src = images[current].src;
    });
  }

  if (slideshowCarousel) {
    if (images.length > 5) {
      images.length = 5;
    }

    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', e => {
        const selected = document.querySelector('.selected');

        selected && selected.classList.remove('selected');
        activeImage[0].src = e.target.src;
        images[i].classList.add('selected');
      });
    }

    document.querySelector('.prev').addEventListener('click', e => {
      current = getIndex(-1, images.length, current);
      activeImage[0].src = images[current].src;
    });

    document.querySelector('.next').addEventListener('click', e => {
      current = getIndex(1, images.length, current);
      activeImage[0].src = images[current].src;
    });
  }
};
