import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comment-count');

const POSSIBLE_COMMENTS_GROUP = 5;

let commentsShown = 0;
let comments = [];

const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const createComment = ({ name, avatar, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += POSSIBLE_COMMENTS_GROUP;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < commentsShown; index++) {
    fragment.append(createComment(comments[index]));
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  socialComments.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  commentsShown = 0;
}

commentsLoader.addEventListener('click', () => {
  renderComments();
});

const onCloseButtonClick = () => {
  closeBigPicture();
};

closeButton.addEventListener('click', onCloseButtonClick);

export { openBigPicture };
