import { isEscapeKeyPressed } from './utils.js';

const COMMENTS_STEP = 5;
let displayedCommentsCount = COMMENTS_STEP;
let allComments = [];
const bigPictureElement = document.querySelector('.big-picture');
const commentCounter = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const loadMoreButton = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCounter = bigPictureElement.querySelector('.likes-count');
const pictureCaptionElement = bigPictureElement.querySelector('.social__caption');
const footerTextElement = bigPictureElement.querySelector('.social__footer-text');
const commentFragment = document.createDocumentFragment();

const createCommentElement = (comment) => {
  const commentItem = document.createElement('li');
  const commentImage = document.createElement('img');
  const commentText = document.createElement('p');

  commentItem.classList.add('social__comment');
  commentImage.classList.add('social__picture');
  commentText.classList.add('social__text');

  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentText.textContent = comment.message;

  commentItem.appendChild(commentImage);
  commentItem.appendChild(commentText);
  commentFragment.appendChild(commentItem);
};

const renderComments = () => {
  commentListElement.innerHTML = '';
  commentCounter.innerHTML = '';
  displayedCommentsCount = Math.min(displayedCommentsCount, allComments.length);

  if (allComments.length <= COMMENTS_STEP || displayedCommentsCount >= allComments.length) {
    loadMoreButton.classList.add('hidden'); // Скрываем кнопку загрузки, если больше нет комментариев
  } else {
    loadMoreButton.classList.remove('hidden'); // Показываем кнопку загрузки
  }

  commentCounter.innerHTML = `${displayedCommentsCount} из <span class="comments-count">${allComments.length}</span> комментариев`;
  allComments.slice(0, displayedCommentsCount).forEach(createCommentElement); // Создаем элементы комментариев
  commentListElement.appendChild(commentFragment); // Добавляем фрагмент в список комментариев
};

const onLoadMoreCommentsClick = () => {
  displayedCommentsCount += COMMENTS_STEP; // Увеличиваем количество отображаемых комментариев
  renderComments(); // Перерисовываем комментарии
};

const hideBigPictureModal = () => {
  bigPictureElement.classList.add('hidden'); // Скрываем модальное окно
  bodyElement.classList.remove('modal-open'); // Убираем класс открытия модального окна
  displayedCommentsCount = COMMENTS_STEP; // Сбрасываем счетчик комментариев
  allComments = []; // Очищаем массив комментариев
  footerTextElement.value = ''; // Очищаем текстовое поле
  document.removeEventListener('keydown', onDocumentKeydown); // Убираем обработчик нажатия клавиш
};

function onDocumentKeydown(evt) {
  if (isEscapeKeyPressed(evt)) { // Проверяем, была ли нажата клавиша Escape
    evt.preventDefault(); // Предотвращаем действие по умолчанию
    hideBigPictureModal(); // Скрываем модальное окно
  }
}

const onCancelButtonClick = () => {
  hideBigPictureModal(); // Скрываем модальное окно при нажатии кнопки отмены
};

const openBigPictureModal = (data) => {
  const { url, comments, likes, description } = data; // Деструктурируем данные

  bigPictureElement.classList.remove('hidden'); // Показываем модальное окно
  bodyElement.classList.add('modal-open'); // Добавляем класс открытия модального окна

  bigPictureImageElement.src = url; // Устанавливаем изображение в модальном окне
  likesCounter.textContent = likes; // Устанавливаем количество лайков
  pictureCaptionElement.textContent = description; // Устанавливаем описание

  allComments = comments.slice(); // Копируем массив комментариев для дальнейшей работы
  renderComments(); // Отображаем комментарии

  loadMoreButton.addEventListener('click', onLoadMoreCommentsClick); // Добавляем обработчик нажатия на кнопку загрузки еще комментариев
  document.addEventListener('keydown', onDocumentKeydown); // Добавляем обработчик нажатия клавиш для закрытия модального окна
};

cancelButton.addEventListener('click', onCancelButtonClick); // Добавляем обработчик нажатия на кнопку отмены

export { openBigPictureModal };

