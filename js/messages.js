import {isEscapeKey} from './util.js';

const body = document.body;
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const onHideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', onCloseMessageByEscape);
  body.removeEventListener('click', onCloseMessageByBodyClick);
  messageCloseButton.removeEventListener('click', onHideMessage);
  message.remove();
};

function onCloseMessageByEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onHideMessage();
  }
}

function onCloseMessageByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    onHideMessage();
  }
}

const showMessage = (message, messageCloseButton) => {
  body.append(message);
  document.addEventListener('keydown', onCloseMessageByEscape);
  body.addEventListener('click', onCloseMessageByBodyClick);
  body.querySelector(messageCloseButton).addEventListener('click', onHideMessage);
};

const showSuccessMessage = () => showMessage(successMessage, '.success__button');

const showErrorMessage = () => showMessage(errorMessage, '.error__button');

export {showSuccessMessage, showErrorMessage};
