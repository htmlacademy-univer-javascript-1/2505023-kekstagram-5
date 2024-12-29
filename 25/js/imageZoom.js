const MIN_ZOOM = 25; // Минимальное значение зума
const ZOOM_INCREMENT = 25; // Шаг зума
const DEFAULT_ZOOM = 100; // Значение зума по умолчанию
const MAX_ZOOM = 100; // Максимальное значение зума

const zoomContainer = document.querySelector('.img-upload__scale'); // Контейнер для управления зумом
const decreaseZoomButton = zoomContainer.querySelector('.scale__control--smaller'); // Кнопка уменьшения зума
const increaseZoomButton = zoomContainer.querySelector('.scale__control--bigger'); // Кнопка увеличения зума
const zoomLevelInput = zoomContainer.querySelector('.scale__control--value'); // Поле для отображения уровня зума
const previewImage = document.querySelector('.img-upload__preview img'); // Изображение для предпросмотра

// Функция для применения уровня зума к изображению
const applyZoom = (value) => {
  previewImage.style.transform = `scale(${value / 100})`; // Применяем трансформацию к изображению
  zoomLevelInput.value = `${value}%`; // Обновляем отображаемое значение зума
};

// Обработчик клика по кнопке увеличения зума
const onIncreaseZoomClick = () => {
  const newZoomValue = parseInt(zoomLevelInput.value, 10) + ZOOM_INCREMENT; // Увеличиваем текущее значение зума
  applyZoom(Math.min(newZoomValue, MAX_ZOOM)); // Применяем новое значение, не превышая максимальное
};

// Обработчик клика по кнопке уменьшения зума
const onDecreaseZoomClick = () => {
  const newZoomValue = parseInt(zoomLevelInput.value, 10) - ZOOM_INCREMENT; // Уменьшаем текущее значение зума
  applyZoom(Math.max(newZoomValue, MIN_ZOOM)); // Применяем новое значение, не опускаясь ниже минимального
};

// Функция для сброса значения зума до значения по умолчанию
const resetZoom = () => applyZoom(DEFAULT_ZOOM);

// Добавляем обработчики событий на кнопки управления зумом
increaseZoomButton.addEventListener('click', onIncreaseZoomClick);
decreaseZoomButton.addEventListener('click', onDecreaseZoomClick);

export { resetZoom };
