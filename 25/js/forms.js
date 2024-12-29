import { isEscapeKeyPressed } from './utils.js';
import { resetZoom } from './imageZoom.js';
import { submitData } from './dataApi.js';
import { onEffectChange, resetFilter } from './effect.js';
import { showSuccessNotification, showErrorNotification } from './messages.js';

const MAX_TAGS_COUNT = 5; // Максимальное количество хэштегов
const MAX_DESCRIPTION_LENGTH = 140; // Максимальная длина описания
const TAGS_REGEX = /^#[a-zа-яё0-9]{1,19}$/i; // Регулярное выражение для проверки хэштегов

const ErrorMessages = {
  INVALID_TAG_COUNT: `Возможно максимум ${MAX_TAGS_COUNT} хэштегов`,
  DUPLICATE_TAG: 'Теги не должны дублироваться',
  INVALID_TAG_FORMAT: 'Тег введен в неверном формате',
  INVALID_DESCRIPTION_LENGTH: `Возможно максимум ${MAX_DESCRIPTION_LENGTH} символов`
};

const bodyElement = document.querySelector('body'); // Элемент body
const uploadForm = document.querySelector('.img-upload__form'); // Форма загрузки изображения
const uploadOverlay = document.querySelector('.img-upload__overlay'); // Оверлей загрузки изображения
const hashtagsField = document.querySelector('.text__hashtags'); // Поле для ввода хэштегов
const descriptionField = document.querySelector('.text__description'); // Поле для ввода описания
const cancelButton = uploadForm.querySelector('.img-upload__cancel'); // Кнопка отмены
const fileInputButton = uploadForm.querySelector('.img-upload__input'); // Кнопка выбора файла
const effectsListContainer = document.querySelector('.effects__list'); // Список эффектов
const effectPreviews = document.querySelectorAll('.effects__preview'); // Превью эффектов

// Инициализация библиотеки Pristine для валидации формы
const pristineValidator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// Функция для закрытия формы загрузки изображения
const closeUploadForm = () => {
  uploadForm.reset(); // Сбрасываем форму
  pristineValidator.reset(); // Сбрасываем валидацию формы
  resetZoom(); // Сбрасываем зум изображения
  uploadOverlay.classList.add('hidden'); // Скрываем оверлей загрузки изображения
  bodyElement.classList.remove('modal-open'); // Убираем класс открытия модального окна
  document.removeEventListener('keydown', onDocumentKeyDown); // Убираем обработчик нажатия клавиш
  effectsListContainer.removeEventListener('click', onEffectChange); // Убираем обработчик изменения эффекта
  resetFilter(); // Убираем фильтр из изображения
};

// Обработчик события отправки формы
uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault(); // Предотвращаем стандартное поведение формы
  if (pristineValidator.validate()) { // Если форма валидна
    await submitData(new FormData(uploadForm))
      .then(() => {
        showSuccessNotification(); // Показываем сообщение об успешной отправке
        resetFilter(); // Убираем фильтр из изображения
        resetZoom(); // Сбрасываем зум изображения
      })
      .catch(() => {
        showErrorNotification(); // Показываем сообщение об ошибке при отправке данных
      })
      .finally(() => {
        closeUploadForm(); // Закрываем форму после завершения процесса отправки данных
      });
  }
});

// Функция для открытия формы загрузки изображения
const openUploadForm = (evt) => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown); // Добавляем обработчик нажатия клавиш для закрытия формы

  effectsListContainer.addEventListener('click', onEffectChange); // Добавляем обработчик изменения эффекта

  const imageFile = evt.target.files[0];
  const imageURL = URL.createObjectURL(imageFile);
  uploadOverlay.querySelector('img').src = imageURL;

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url('${imageURL}')`;
  });
};

// Функция для преобразования строки тегов в массив тегов
const parseTags = (string) => string.trim().split(' ').filter((tag) => Boolean(tag.length));

// Проверяем, находится ли фокус на полях ввода
const isFieldFocused = () => document.activeElement === hashtagsField || document.activeElement === descriptionField;

// Проверяем количество введенных тегов
const isTagCountValid = (string) => parseTags(string).length <= MAX_TAGS_COUNT;

// Проверяем длину описания
const isDescriptionLengthValid = (string) => string.length <= MAX_DESCRIPTION_LENGTH;

// Проверяем уникальность тегов
const areTagsUnique = (string) => {
  const lowerCaseTags = parseTags(string).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Проверяем валидность каждого тега
const areTagsValid = (string) => parseTags(string).every((tag) => TAGS_REGEX.test(tag));

// Обработчик нажатия клавиш на документе
function onDocumentKeyDown(evt) {
  if (isEscapeKeyPressed(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
}

// Обработчик нажатия кнопки отмены
const onCancelButtonClick = () => closeUploadForm();

// Обработчик изменения поля ввода файла
fileInputButton.addEventListener('change', openUploadForm);
cancelButton.addEventListener('click', onCancelButtonClick);

// Добавляем валидаторы к полям ввода
pristineValidator.addValidator(
  hashtagsField,
  isTagCountValid,
  ErrorMessages.INVALID_TAG_COUNT,
  1,
  true
);

pristineValidator.addValidator(
  hashtagsField,
  areTagsUnique,
  ErrorMessages.DUPLICATE_TAG,
  2,
  true
);

pristineValidator.addValidator(
  hashtagsField,
  areTagsValid,
  ErrorMessages.INVALID_TAG_FORMAT,
  3,
  true
);

pristineValidator.addValidator(
  descriptionField,
  isDescriptionLengthValid,
  ErrorMessages.INVALID_DESCRIPTION_LENGTH,
  4,
  true
);

export { openUploadForm };
