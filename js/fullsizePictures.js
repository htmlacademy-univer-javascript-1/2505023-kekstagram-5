import {isEscapeKey} from './utils.js';
import {fillComments, openComments} from './comments.js';

const body = document.body;
const fullsizePicture = document.querySelector('.big-picture');
const closeButton = fullsizePicture.querySelector('#picture-cancel');
const loaderButton = fullsizePicture.querySelector('.comments-loader');
const currentComments = fullsizePicture.querySelector('.current-comments');

const closePicture = () => {
  body.classList.remove('modal-open');
  fullsizePicture.classList.add('hidden');
  document.removeEventListener('keydown', closePictureByEscape);
  closeButton.removeEventListener('click', closePicture);
  loaderButton.removeEventListener('click', openComments);
};

function closePictureByEscape(evt) {//всплытие
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
}

const getFullsizePicture = ({url, description, likes, comments}) => {
  fullsizePicture.classList.remove('hidden');
  fullsizePicture.querySelector('.big-picture__img img').src = url;
  fullsizePicture.querySelector('.likes-count').textContent = likes;
  fullsizePicture.querySelector('.comments-count').textContent = comments.length;
  fullsizePicture.querySelector('.social__caption').textContent = description;
};

const openPicture = (picture) => {
  body.classList.add('modal-open');
  getFullsizePicture(picture);
  fillComments(picture.comments);
  currentComments.textContent = 0;
  loaderButton.classList.remove('hidden');
  openComments();
  loaderButton.addEventListener('click', openComments);
  closeButton.addEventListener('click', closePicture);
  document.addEventListener('keydown', closePictureByEscape);
};

export {openPicture};
