import { onEscKeydown } from './form.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');
const blockSendError = document.querySelector('#error').content.querySelector('.error');
const errorMessage = blockSendError.cloneNode(true);
const errorMessageCloseElement = errorMessage.querySelector('.error__button');

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const createUniqueRandomNumberList = (min, max, length) => {
  const previousNumbers = [];
  while (previousNumbers.length < length) {
    let currentValue = getRandomInteger(min, max);
    while (previousNumbers.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousNumbers.push(currentValue);
  }
  return previousNumbers;
};

const getUniqueNumber = (list, usedNumbers) => {
  for (let i = 0; i < list.length; i++){
    if (usedNumbers.includes(list[i]) === false){
      usedNumbers.push(list[i]);
      return list[i];
    }
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessButtonCLick = () => {
  document.querySelector('.success').remove();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('.success').remove();
  }
};

const onSuccessClickEmpty = (evt) => {
  if (!(evt.target.closest('.success__inner'))) {
    document.querySelector('.success').remove();
  }
};

const successMessage = () => {
  const fragment = document.createDocumentFragment();
  fragment.append(successTemplate);
  document.body.append(fragment);
  successButton.addEventListener('click', onSuccessButtonCLick);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessClickEmpty);
};

errorMessage.classList.add('hidden');
document.body.appendChild(errorMessage);

const onPopupErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendDataErrorMessage();
  }
};

const onPopupErrorClickClose = () => {
  closeSendDataErrorMessage();
};

const onPopupErrorClickEmpty = (evt) => {
  if (!(evt.target.closest('.error__inner'))) {
    closeSendDataErrorMessage();
  }
};

const openSendDataErrorMessage = () => {
  errorMessage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupErrorEscKeydown);
  errorMessageCloseElement.addEventListener('click', onPopupErrorClickClose);
  document.addEventListener('click', onPopupErrorClickEmpty);
  document.removeEventListener('keydown', onEscKeydown);
};

function closeSendDataErrorMessage() {
  errorMessage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupErrorEscKeydown);
  errorMessageCloseElement.removeEventListener('click', onPopupErrorClickClose);
  document.removeEventListener('click', onPopupErrorClickEmpty);
  document.addEventListener('keydown', onEscKeydown);
}

const isElementRepeat = (element, array) => {
  if (array.length > 1 && array.indexOf(element, array.indexOf(element) + 1) > 0) {
    return true;
  }
  return false;
};

export {
  getRandomInteger,
  createUniqueRandomNumberList,
  getUniqueNumber,
  isEscapeKey,
  successMessage,
  openSendDataErrorMessage,
  showAlert,
  isElementRepeat
};
