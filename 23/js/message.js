import {isEscapeKey} from './utils.js';

const body = document.body;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', closeMessageByEscape);
  body.removeEventListener('click', closeMessageByBodyClick);
  messageCloseButton.removeEventListener('click', hideMessage);
  message.remove();
};

function closeMessageByEscape(evt) {//всплытие
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function closeMessageByBodyClick(evt) {//всплытие
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    hideMessage();
  }
}

const showMessage = (message, messageCloseButton) => {
  body.append(message.cloneNode(true));
  document.addEventListener('keydown', closeMessageByEscape);
  body.addEventListener('click', closeMessageByBodyClick);
  body.querySelector(messageCloseButton).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => showMessage(successMessage, '.success__button');

const showErrorMessage = () => showMessage(errorMessage, '.error__button');

export {showSuccessMessage, showErrorMessage};
