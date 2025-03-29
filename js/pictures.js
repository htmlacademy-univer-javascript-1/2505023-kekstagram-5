import {openBigPicture} from './big-picture.js';

const pattern = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPicture = (data) => {
  const { likes, url, description, comments } = data;
  const picture = pattern.cloneNode(true);
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picture.addEventListener('click', () => {
    openBigPicture(data);
  });

  return picture;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(createPicture(picture));
  });
  container.append(fragment);
};

export { renderPictures };
