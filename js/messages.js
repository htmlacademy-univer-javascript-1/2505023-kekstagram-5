import { isEscapeKeyPressed } from './utils.js';

const documentBody = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Функция для скрытия сообщения
const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error'); // Находим текущее сообщение
  const closeButton = document.querySelector('.success__button') || document.querySelector('.error__button'); // Находим кнопку закрытия

  document.removeEventListener('keydown', handleCloseByEscape); // Убираем обработчик нажатия клавиш
  documentBody.removeEventListener('click', handleCloseByBodyClick); // Убираем обработчик клика по телу
  closeButton.removeEventListener('click', hideMessage); // Убираем обработчик клика по кнопке закрытия
  messageElement.remove(); // Удаляем сообщение из DOM
};

// Обработчик нажатия клавиши Escape для закрытия сообщения
function handleCloseByEscape(evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault(); // Предотвращаем стандартное действие
    hideMessage(); // Скрываем сообщение
  }
}

// Обработчик клика по телу документа для закрытия сообщения
function handleCloseByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    hideMessage(); // Скрываем сообщение, если кликнули вне его области
  }
}

// Функция для отображения сообщения
const displayMessage = (messageElement, closeButtonSelector) => {
  documentBody.append(messageElement);
  document.addEventListener('keydown', handleCloseByEscape);
  documentBody.addEventListener('click', handleCloseByBodyClick);
  documentBody.querySelector(closeButtonSelector).addEventListener('click', hideMessage);
};

// Функция для отображения сообщения об успехе
const showSuccessNotification = () => displayMessage(successTemplate.cloneNode(true), '.success__button');

// Функция для отображения сообщения об ошибке
const showErrorNotification = () => displayMessage(errorTemplate.cloneNode(true), '.error__button');

export { showSuccessNotification, showErrorNotification };
