const ALERT_DISPLAY_DURATION = 5000; // Время отображения сообщения об ошибке

// Функция для отображения сообщения об ошибке
const displayAlert = (message) => {
  const alertBox = document.createElement('div');
  alertBox.style.zIndex = '100';
  alertBox.style.position = 'absolute';
  alertBox.style.left = '0';
  alertBox.style.top = '0';
  alertBox.style.right = '0';
  alertBox.style.padding = '10px 3px';
  alertBox.style.fontSize = '30px';
  alertBox.style.textAlign = 'center';
  alertBox.style.backgroundColor = 'red';
  alertBox.textContent = message;
  document.body.append(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, ALERT_DISPLAY_DURATION);
};

// Функция для дебаунса
const debounceFunction = (callback, delay = 500) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId); // Очищаем предыдущий таймер
    timeoutId = setTimeout(() => callback.apply(this, args), delay); // Устанавливаем новый таймер
  };
};

// Функция для получения случайного целого числа
const getRandomInteger = (min, max) => {
  const lowerBound = Math.ceil(Math.min(min, max)); // Находим нижнюю границу
  const upperBound = Math.floor(Math.max(min, max)); // Находим верхнюю границу
  const randomValue = Math.random() * (upperBound - lowerBound + 1) + lowerBound; // Генерируем случайное число
  return Math.floor(randomValue); // Возвращаем округленное значение
};

// Функция для получения случайных элементов из массива
const getRandomItems = (array, count) => {
  const selectedIndices = [];
  const limit = Math.min(count, array.length); // Ограничиваем количество выбираемых элементов

  while (selectedIndices.length < limit) {
    const index = getRandomInteger(0, array.length - 1); // Получаем случайный индекс
    if (!selectedIndices.includes(index)) {
      selectedIndices.push(index);
    }
  }

  return selectedIndices.map((index) => array[index]);
};

// Функция для проверки нажатия клавиши Escape
const isEscapeKeyPressed = (event) => event.key === 'Escape';

export { getRandomInteger, getRandomItems, isEscapeKeyPressed, displayAlert, debounceFunction };
