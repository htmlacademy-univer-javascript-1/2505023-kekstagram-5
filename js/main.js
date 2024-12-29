import { displayFilteredPictures } from './filters.js';
import { loadData } from './dataApi.js';
import { displayAlert } from './utils.js';
import './forms.js';

// Асинхронная функция для получения изображений
const loadPictures = async () => {
  try {
    const pictures = await loadData(); // Получаем данные о изображениях
    displayFilteredPictures(pictures); // Отображаем отфильтрованные изображения
  } catch (error) {
    displayAlert(error); // Отображаем сообщение об ошибке
  }
};

loadPictures();
