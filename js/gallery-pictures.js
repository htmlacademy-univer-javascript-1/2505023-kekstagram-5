import { openBigPictureModal } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures'); // Контейнер для списка изображений
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture'); // Шаблон изображения

// Функция для создания элемента изображения на основе данных
const createPictureElement = (data) => {
  const pictureElement = pictureTemplateElement.cloneNode(true); // Клонируем шаблон изображения
  pictureElement.querySelector('.picture__img').src = data.url; // Устанавливаем URL изображения
  pictureElement.querySelector('.picture__img').alt = data.description; // Устанавливаем описание изображения
  pictureElement.querySelector('.picture__likes').textContent = data.likes; // Устанавливаем количество лайков
  pictureElement.querySelector('.picture__comments').textContent = data.comments.length; // Устанавливаем количество комментариев

  // Добавляем обработчик клика для открытия большого изображения
  pictureElement.addEventListener('click', () => {
    openBigPictureModal(data); // Открываем большое изображение при клике
  });
  return pictureElement; // Возвращаем созданный элемент изображения
};

// Функция для создания фрагмента с изображениями
const createPicturesFragment = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((data) => {
    const pictureElement = createPictureElement(data);
    fragment.appendChild(pictureElement);
  });
  return fragment;
};

// Функция для рендеринга изображений в контейнере
const renderPictures = (pictures) => {
  const picturesFragment = createPicturesFragment(pictures);
  picturesContainer.appendChild(picturesFragment);
};

export { renderPictures };
