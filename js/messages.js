import { closeForm } from './form.js';
import { isEscapeKey } from './utils.js';
import { uploadData } from './fetch.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error'); // Шаблон сообщения об ошибке
const successMessage = document.querySelector('#success').content.querySelector('.success'); // Шаблон сообщения об успехе
const formUpload = document.querySelector('.img-upload__form'); // Форма загрузки изображения

// Функция для закрытия всплывающего сообщения (ошибки или успеха)
const closePopup = () => {
  const popup = document.querySelector('.error') || document.querySelector('.success');
  popup.remove();
};

// Обработчик нажатия клавиши Escape для закрытия всплывающего сообщения
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePopup();
  }
};

// Обработчик клика по всплывающему сообщению для его закрытия
const onPopupClick = (evt) => {
  if (!evt.target.classList.contains('succes__inner') && !evt.target.classList.contains('error__inner')) {
    evt.preventDefault(); // Предотвращаем стандартное действие
    closePopup(); // Закрываем всплывающее сообщение
    document.removeEventListener('keydown', onEscKeydown); // Убираем обработчик нажатия клавиш
  }
};

// Функция для отображения сообщения (ошибки или успеха)
const showMessage = (message) => {
  message.addEventListener('click', onPopupClick); // Добавляем обработчик клика по сообщению
  document.body.appendChild(message); // Добавляем сообщение в тело документа
  document.addEventListener('keydown', onEscKeydown, { once: true }); // Добавляем обработчик нажатия клавиш, который сработает один раз
};

// Функция для отображения сообщения об ошибке
const showErrorMessage = () => {
  const messageFragment = errorMessage.cloneNode(true);
  showMessage(messageFragment);
};

// Функция для отображения сообщения об успехе
const showSuccesMessage = () => {
  const messageFragment = successMessage.cloneNode(true);
  showMessage(messageFragment);
};

// Функция обработки успешной загрузки данных
const onSuccess = () => {
  closeForm();
  showSuccesMessage();
};

// Функция обработки ошибки загрузки данных
const onFail = () => {
  showErrorMessage();
};

// Обработчик события отправки формы загрузки изображения
const onFormUploadSubmit = (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)
  uploadData(onSuccess, onFail, 'POST', new FormData(evt.target)); // Отправляем данные формы на сервер с помощью функции uploadData
};

// Добавляем обработчик события отправки формы
formUpload.addEventListener('submit', onFormUploadSubmit);
