import { isEscapeKey } from './utils.js';
import { onFilterButtonChange, effectList, sliderWrapper } from './actions.js';
import { buttonAdjustment } from './hashtag.js';

const body = document.querySelector('body'); // Элемент body документа
const formUpload = body.querySelector('.img-upload__form'); // Форма загрузки изображения
const overlay = formUpload.querySelector('.img-upload__overlay'); // Оверлей формы загрузки
const fileUpload = formUpload.querySelector('#upload-file'); // Поле для загрузки файла
const formUploadClose = formUpload.querySelector('#upload-cancel'); // Кнопка закрытия формы
const minusButton = formUpload.querySelector('.scale__control--smaller'); // Кнопка уменьшения зума
const plusButton = formUpload.querySelector('.scale__control--bigger'); // Кнопка увеличения зума
const scaleControlValue = formUpload.querySelector('.scale__control--value'); // Поле для отображения значения зума
const imagePreview = formUpload.querySelector('.img-upload__preview img'); // Изображение предпросмотра
const commentsField = formUpload.querySelector('.text__description'); // Поле для ввода комментариев

const Zoom = {
  MIN: 25, // Минимальное значение зума
  MAX: 100, // Максимальное значение зума
  STEP: 25, // Шаг изменения зума
};

// Функция для закрытия формы загрузки изображения
const closeForm = () => {
  overlay.classList.add('hidden'); // Скрываем оверлей формы
  body.classList.remove('modal-open'); // Убираем класс открытия модального окна
  effectList.removeEventListener('change', onFilterButtonChange); // Убираем обработчик изменения эффекта
  imagePreview.style.transform = ''; // Сбрасываем трансформацию изображения
  imagePreview.className = 'img-upload__preview'; // Сбрасываем классы у изображения предпросмотра
  imagePreview.style.filter = ''; // Сбрасываем фильтр изображения

  formUpload.reset(); // Сбрасываем форму загрузки
};

// Обработчик нажатия клавиши Escape для закрытия формы
const onCloseFormEscKeyDown = (evt) => {
  if (isEscapeKey(evt) &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')) {
    evt.preventDefault(); // Предотвращаем стандартное действие
    closeForm(); // Закрываем форму

    document.removeEventListener('keydown', onCloseFormEscKeyDown); // Убираем обработчик нажатия клавиш
  }
};

// Функция для добавления обработчиков событий фокуса и потери фокуса на поле ввода комментариев
const addFieldListener = (field) => {
  const onFocus = () => {
    document.removeEventListener('keydown', onCloseFormEscKeyDown); // Убираем обработчик при фокусе на поле ввода
  };

  const onBlur = () => {
    document.addEventListener('keydown', onCloseFormEscKeyDown); // Добавляем обработчик при потере фокуса
  };

  field.addEventListener('focus', onFocus); // Добавляем обработчик фокуса на поле ввода
  field.addEventListener('blur', onBlur); // Добавляем обработчик потери фокуса на поле ввода
};

// Функция для изменения изображения в предпросмотре при загрузке файла
const changeImages = () => {
  const file = fileUpload.files[0]; // Получаем загруженный файл
  const fileUrl = URL.createObjectURL(file); // Создаем URL для загруженного файла

  imagePreview.src = fileUrl; // Устанавливаем URL загруженного файла в изображение предпросмотра
};

// Обработчик изменения поля загрузки файла
const onFileUploadChange = () => {
  overlay.classList.remove('hidden'); // Показываем оверлей формы загрузки изображения
  body.classList.add('modal-open'); // Добавляем класс открытия модального окна
  changeImages(); // Изменяем изображение в предпросмотре при загрузке файла

  document.addEventListener('keydown', onCloseFormEscKeyDown); // Добавляем обработчик нажатия клавиш для закрытия формы

  sliderWrapper.classList.add('hidden'); // Скрываем слайдер эффектов при загрузке нового изображения

  effectList.addEventListener('change', onFilterButtonChange); // Добавляем обработчик изменения эффекта

  addFieldListener(commentsField); // Добавляем слушатели событий на поле ввода комментариев

  buttonAdjustment(); // Настраиваем кнопки хэштегов (если это необходимо)
};

// Добавляем обработчик события изменения файла
fileUpload.addEventListener('change', onFileUploadChange);

// Обработчик клика по кнопке закрытия формы
formUploadClose.addEventListener('click', () => {
  closeForm();
});

// Функция для изменения уровня зума изображения
const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (Zoom.STEP * factor);

  if (size < Zoom.MIN) { // Проверяем минимальное значение зума
    size = Zoom.MIN;
  }

  if (size > Zoom.MAX) { // Проверяем максимальное значение зума
    size = Zoom.MAX;
  }

  scaleControlValue.value = `${size}%`; // Обновляем отображаемое значение зума
  imagePreview.style.transform = `scale(${size / 100})`; // Применяем трансформацию к изображению предпросмотра
};

// Обработчик клика по кнопке уменьшения зума
const onMinusButtonClick = () => {
  changeZoom(-1);
};

// Обработчик клика по кнопке увеличения зума
const onPlusButtonClick = () => {
  changeZoom();
};

// Добавляем обработчики событий на кнопки управления зумом
minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

export { closeForm, formUpload, imagePreview };
