import { closeOnEscKeyDown } from './utils.js'; // Импортируем функцию для закрытия по нажатию клавиши Escape

const COMMENTS_STEP = 5; // Количество комментариев, загружаемых за один раз
const bigPicture = document.querySelector('.big-picture'); // Элемент большого изображения
const bigPictureImage = bigPicture.querySelector('.big-picture__img img'); // Изображение в большом окне
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия большого изображения
const likesCount = bigPicture.querySelector('.likes-count'); // Элемент для отображения количества лайков
const pictureCaption = bigPicture.querySelector('.social__caption'); // Элемент для отображения описания изображения
const socialComments = bigPicture.querySelector('.social__comments'); // Список комментариев
const socialCommentsCount = bigPicture.querySelector('.social__comment-count'); // Элемент для отображения количества комментариев
const loadComments = bigPicture.querySelector('.comments-loader'); // Кнопка загрузки дополнительных комментариев
const socialFooterText = bigPicture.querySelector('.social__footer-text'); // Поле для ввода текста в нижней части

let commentsCount = COMMENTS_STEP; // Текущая величина загружаемых комментариев
let currentComments = []; // Массив текущих комментариев

// Функция для рендеринга комментариев
const renderComments = () => {
  socialComments.innerHTML = ''; // Очищаем список комментариев

  // Устанавливаем количество загружаемых комментариев
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount); // Выбираем нужные комментарии для отображения

  // Проверяем, нужно ли скрывать кнопку загрузки дополнительных комментариев
  if (currentComments.length <= COMMENTS_STEP || commentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${commentsCount} из ${currentComments.length} комментариев`; // Обновляем счетчик комментариев

  const commentFragment = document.createDocumentFragment(); // Создаем фрагмент для оптимизации добавления элементов

  commentsSelected.forEach((comment) => {
    const newComment = document.createElement('li'); // Создаем новый элемент списка комментариев
    const imgComment = document.createElement('img'); // Создаем элемент изображения для комментария
    const textComment = document.createElement('p'); // Создаем элемент текста для комментария

    newComment.classList.add('social__comment'); // Добавляем класс к новому комментарию
    imgComment.classList.add('social__picture'); // Добавляем класс к изображению комментария
    textComment.classList.add('social__text'); // Добавляем класс к тексту комментария

    imgComment.src = comment.avatar; // Устанавливаем аватар пользователя
    imgComment.alt = comment.name; // Устанавливаем альтернативный текст для изображения
    textComment.textContent = comment.message; // Устанавливаем текст сообщения

    newComment.appendChild(imgComment); // Добавляем изображение в новый элемент списка
    newComment.appendChild(textComment); // Добавляем текст в новый элемент списка

    commentFragment.appendChild(newComment); // Добавляем новый комментарий во фрагмент
  });

  socialComments.appendChild(commentFragment); // Добавляем фрагмент с комментариями в список
};

// Обработчик клика по кнопке загрузки дополнительных комментариев
const onLoadCommentsButtonClick = () => {
  commentsCount += COMMENTS_STEP; // Увеличиваем количество загружаемых комментариев
  renderComments(); // Перерисовываем список комментариев с новым количеством
};

// Функция для закрытия большого изображения и сброса состояния
const closeBigPicture = () => {
  bigPicture.classList.add('hidden'); // Скрываем большое изображение
  document.body.classList.remove('modal-open'); // Убираем класс открытия модального окна

  commentsCount = COMMENTS_STEP; // Сбрасываем количество загружаемых комментариев
  currentComments = []; // Очищаем массив текущих комментариев
  socialFooterText.value = ''; // Очищаем текстовое поле внизу
};

// Обработчик нажатия клавиши Escape для закрытия большого изображения
const onBigPictureEscKeyDown = (evt) => {
  closeOnEscKeyDown(evt, () => {
    closeBigPicture();

    document.removeEventListener('keydown', onBigPictureEscKeyDown);
    loadComments.removeEventListener('click', onLoadCommentsButtonClick);
  });
};

// Обработчик клика по кнопке закрытия большого изображения
const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscKeyDown);
  pictureCloseButton.removeEventListener('click', onCloseBigPictureClick);
};

// Функция для отображения большого изображения и его данных
const showBigPicture = (picture) => {
  const { url, description, comments, likes } = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  pictureCaption.textContent = description;
  likesCount.textContent = likes;

  currentComments = comments.slice();

  renderComments();

  loadComments.addEventListener('click', onLoadCommentsButtonClick);

  document.addEventListener('keydown', onBigPictureEscKeyDown);
  pictureCloseButton.addEventListener('click', onCloseBigPictureClick);
};

export { showBigPicture };
