import { checkLenght } from './utils.js';

const MAX_SYMBOLS = 20; // Максимальная длина одного хэш-тега
const MAX_HASHTAGS = 5; // Максимальное количество хэш-тегов
const MAX_STRING_LENGTH = 140; // Максимальная длина комментария
const formUpload = document.querySelector('.img-upload__form'); // Форма загрузки изображения
const submitButton = document.querySelector('.img-upload__submit'); // Кнопка отправки формы
const commentsField = formUpload.querySelector('.text__description'); // Поле для ввода комментариев

// Инициализация библиотеки Pristine для валидации формы
const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper', // Класс для обертки поля
  errorTextParent: 'img-upload__field-wrapper', // Родительский элемент для текста ошибки
  errorTextTag: 'p', // Тег для текста ошибки
  errorTextClass: 'img-upload__error' // Класс для текста ошибки
}, true);

// Функция для настройки состояния кнопки отправки в зависимости от валидности формы
const buttonAdjustment = () => {
  submitButton.disabled = !pristine.validate();
};

// Получаем поле для ввода хэштегов из DOM
const inputHashtag = document.querySelector('.text__hashtags');

let errorMessage = ''; // Переменная для хранения сообщения об ошибке

// Функция для получения текущего сообщения об ошибке
const getError = () => errorMessage;

// Обработчик валидации хэштегов
const hashtagsHandler = (value) => {
  errorMessage = ''; // Сбрасываем сообщение об ошибке

  const inputText = value.toLowerCase().trim(); // Приводим ввод к нижнему регистру и убираем пробелы

  if (!inputText) {
    return true; // Если поле пустое, валидируем как корректное
  }

  const inputArray = inputText.split(/\s+/); // Разбиваем строку на массив хэштегов

  if (inputArray.length === 0) {
    return true; // Если массив пуст, валидируем как корректное
  }

  const rules = [ // Определяем правила валидации хэштегов
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1), // Проверяем, что хэштеги разделяются пробелами
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'), // Проверяем, что каждый хэштег начинается с #
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)), // Проверяем на дублирование хэштегов
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS), // Проверяем максимальную длину хэштега
      error: `Максимальная длина одного хэш-тега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS, // Проверяем максимальное количество хэштегов
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[A-Za-zА-Яа-яЁё0-9]{0,19}$/.test(item)), // Проверяем на допустимые символы в хэштеге
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => { // Проверяем все правила валидации
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error; // Устанавливаем сообщение об ошибке при нарушении правила
    }
    return !isInvalid; // Возвращаем true, если правило выполнено (нет ошибок)
  });
};

// Обработчик валидации комментариев
const commentHandler = (string) => {
  errorMessage = ''; // Сбрасываем сообщение об ошибке

  const inputText = string.trim(); // Убираем пробелы вокруг текста

  if (!inputText) {
    return true; // Если поле пустое, валидируем как корректное
  }

  const rule = {
    check: !checkLenght(inputText, MAX_STRING_LENGTH), // Проверяем длину комментария с помощью функции из utils.js
    error: `Максимальная длина комментария ${MAX_STRING_LENGTH} символов`,
  };

  const isInvalid = rule.check;
  if (isInvalid) {
    errorMessage = rule.error; // Устанавливаем сообщение об ошибке при превышении длины комментария
  }

  return !isInvalid; // Возвращаем true, если комментарий валиден (нет ошибок)
};

// Добавляем валидаторы к полям ввода с помощью Pristine
pristine.addValidator(inputHashtag, hashtagsHandler, getError, 2, false);
pristine.addValidator(commentsField, commentHandler, getError, 2, false);

// Обработчики событий для отслеживания ввода в поля
const onHashtagInput = () => buttonAdjustment(); // Настройка кнопки отправки при вводе хэштегов
const onCommentInput = () => buttonAdjustment(); // Настройка кнопки отправки при вводе комментариев

// Добавляем обработчики событий на поля ввода
inputHashtag.addEventListener('input', onHashtagInput);
commentsField.addEventListener('input', onCommentInput);

// Обработчик события отправки формы
formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

export { inputHashtag, buttonAdjustment };
