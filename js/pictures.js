import { showBigPicture } from './bigPicture.js';

const pictures = document.querySelector('.pictures'); // Получаем контейнер для отображения изображений

// Получаем шаблон элемента изображения из HTML
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция для удаления всех изображений из контейнера
const removePictures = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};

// Функция для рендеринга одного изображения
const renderPicture = (photo) => {
  const { url, description, comments, likes } = photo; // Деструктурируем свойства объекта photo

  const pictureElement = pictureTemplate.cloneNode(true); // Клонируем шаблон изображения

  pictureElement.querySelector('.picture__img').src = url; // Устанавливаем источник изображения
  pictureElement.querySelector('.picture__img').alt = description; // Устанавливаем альтернативный текст
  pictureElement.querySelector('.picture__comments').textContent = comments.length; // Устанавливаем количество комментариев
  pictureElement.querySelector('.picture__likes').textContent = likes; // Устанавливаем количество лайков

  // Обработчик клика по элементу изображения
  const onPictureElementClick = (evt) => {
    evt.preventDefault();
    showBigPicture(photo);
  };

  pictureElement.addEventListener('click', onPictureElementClick); // Добавляем обработчик события клика

  return pictureElement;
};

// Создаем фрагмент документа для оптимизации добавления элементов
const fragment = document.createDocumentFragment();

// Функция для рендеринга массива изображений
const renderPictures = (photos) => {
  photos.forEach((photo) => {
    fragment.appendChild(renderPicture(photo));
  });

  pictures.appendChild(fragment);
};

export { renderPictures, removePictures };
