import { debounce, shuffleArray } from './utils.js';
import { photos } from './main.js';
import { renderPictures, removePictures } from './pictures.js';

const COUNT_OF_FILTERS = 10; // Количество фотографий для фильтра "Случайные"
const ACTIVE_CLASS = 'img-filters__button--active'; // CSS-класс для активной кнопки фильтра
const imgFiltersForm = document.querySelector('.img-filters__form'); // Получаем элемент формы фильтров изображений из DOM

// Объект, содержащий функции для фильтрации фотографий
const availableFilters = {
  'filter-default': () => photos.slice(), // Возвращает копию массива фотографий без изменений
  'filter-random': () => shuffleArray(photos.slice()).slice(0, COUNT_OF_FILTERS), // Возвращает 10 случайных фотографий
  'filter-discussed': () => photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length), // Возвращает фотографии, отсортированные по убыванию количества комментариев
};

// Функция для проверки, является ли кликнутый элемент кнопкой
const isButton = (evt) => evt.target.tagName === 'BUTTON';

// Функция-обработчик клика по форме фильтров изображений с дебаунсом
const onImgFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {
    removePictures(); // Удаляем отрисованные ранее фотографии
    renderPictures(availableFilters[evt.target.id]()); // Отрисовываем отфильтрованные фотографии
  }
});

// Функция-обработчик клика по форме фильтров изображений для переключения активного класса кнопки
const onButtonClick = (evt) => {
  if (isButton(evt)) {
    const selectedButton = imgFiltersForm.querySelector(`.${ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }
    evt.target.classList.add(ACTIVE_CLASS);
  }
};

imgFiltersForm.addEventListener('click', onImgFiltersFormClick);

imgFiltersForm.addEventListener('click', onButtonClick);
