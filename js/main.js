import { loadData } from './fetch.js';
import { showAlert } from './utils.js';
import { renderPictures } from './pictures.js';
import './form.js';
import './hashtag.js';
import { initEffects } from './actions.js';
import './filters.js';
import './photos.js';
import './messages.js';

const SHOW_TIME = 5000; // Время отображения сообщения об ошибке (в миллисекундах)

// Инициализация эффектов при загрузке страницы
initEffects();

let photos = []; // Массив для хранения загруженных фотографий

// Функция обработки успешной загрузки данных
const onSuccess = (data) => {
  photos = data.slice(); // Копируем данные в массив photos
  renderPictures(photos); // Отображаем фотографии на странице
  document.querySelector('.img-filters').classList.remove('img-filters--inactive'); // Активируем фильтры изображений
};

// Функция обработки ошибки загрузки данных
const onFail = () => {
  showAlert('Ошибка загрузки', SHOW_TIME);
};

// Загружаем данные с сервера, передавая функции обработки успеха и ошибки
loadData(onSuccess, onFail);

export { photos };
