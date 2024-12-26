import {openPicture} from './fullsizePicture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPicture({url, description, likes, comments});
  });
  return pictureElement;
};

const getPictures = (pictures) => {
  const pictureFragments = document.createDocumentFragment();
  pictures.forEach((picture) => {
    pictureFragments.append(createPicture(picture));
  });
  picturesContainer.append(pictureFragments);
};

export {getPictures};
