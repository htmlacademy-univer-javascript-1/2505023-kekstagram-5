const DELAY = 500; // Задержка для функции дебаунса в миллисекундах

// Функция для генерации случайного целого числа в заданном диапазоне
const randomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для проверки длины строки
const checkLenght = (inputString, maxLenght) => inputString.length <= maxLenght;

// Объект для хранения значений клавиш
const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc'
};

// Функция для проверки, была ли нажата клавиша Escape
const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

// Функция для закрытия по нажатию клавиши Escape с вызовом колбэка
const closeOnEscKeyDown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    cb();
  }
};

// Функция дебаунса для ограничения частоты вызова функции
const debounce = (cb) => {
  let lastTimeOut = null;

  return (...args) => {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(() => {
      cb(...args);
    }, DELAY);
  };
};

// Функция для перемешивания массива случайным образом
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Функция для отображения сообщения об ошибке или уведомления на экране
const showAlert = (message, alertShowTime) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#f5cc00';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => alertContainer.remove(), alertShowTime);
};

export { randomInteger, closeOnEscKeyDown, isEscapeKey, showAlert, checkLenght, debounce, shuffleArray };
