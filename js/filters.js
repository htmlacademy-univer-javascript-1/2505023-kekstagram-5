import { renderPictures } from './gallery-pictures.js';
import { debounceFunction, getRandomItems } from './utils.js';

const MAX_RANDOM_COUNT = 10; // Максимальное количество случайных изображений
const ACTIVE_CLASS_NAME = 'img-filters__button--active'; // Класс для активной кнопки фильтра
const filterContainer = document.querySelector('.img-filters'); // Контейнер для фильтров
const defaultFilterButton = document.querySelector('#filter-default'); // Кнопка "по умолчанию"
const randomFilterButton = document.querySelector('#filter-random'); // Кнопка "случайные"
const discussedFilterButton = document.querySelector('#filter-discussed'); // Кнопка "обсуждаемые"

// Функция для получения случайных изображений
const getRandomPictures = (pictures, count) => getRandomItems(pictures, count);

// Функция для сортировки по количеству комментариев
const sortByCommentsCount = (a, b) => b.comments.length - a.comments.length;

// Функция для получения обсуждаемых фотографий
const getDiscussedPhotos = (pictures) => [...pictures].sort(sortByCommentsCount);

// Функция для очистки изображений на странице
const clearPictures = () => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

// Функция для применения выбранного фильтра
const applyFilter = (pictures, activeButton) => {
  clearPictures(); // Очищаем текущие изображения
  const currentActiveButton = document.querySelector(`.${ACTIVE_CLASS_NAME}`);
  if (currentActiveButton) {
    currentActiveButton.classList.remove(ACTIVE_CLASS_NAME); // Убираем активный класс у текущей кнопки
  }
  renderPictures(pictures); // Отображаем отфильтрованные изображения
  activeButton.classList.add(ACTIVE_CLASS_NAME); // Добавляем активный класс к выбранной кнопке
};

// Функция для отображения отфильтрованных фотографий
const displayFilteredPictures = (pictures) => {
  renderPictures(pictures);
  filterContainer.classList.remove('img-filters--inactive'); // Убираем класс неактивности у контейнера фильтров

  randomFilterButton.addEventListener('click', debounceFunction(() => {
    applyFilter(getRandomPictures(pictures, MAX_RANDOM_COUNT), randomFilterButton); // Применяем случайный фильтр
  }));

  discussedFilterButton.addEventListener('click', debounceFunction(() => {
    applyFilter(getDiscussedPhotos(pictures), discussedFilterButton); // Применяем фильтр обсуждаемых фотографий
  }));

  defaultFilterButton.addEventListener('click', debounceFunction(() => {
    applyFilter(pictures, defaultFilterButton); // Применяем фильтр по умолчанию
  }));
};

export { displayFilteredPictures };
