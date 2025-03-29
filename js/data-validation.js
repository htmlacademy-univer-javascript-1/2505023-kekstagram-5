import { isElementRepeat } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_LENGTH_COMMENT = 140;

const form = document.querySelector('.img-upload__form');
const hashtags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const validateHashtags = (value) => {
  if (!value) {
    return { isValid: true };
  }

  const hashtagsArray = value.split(' ').filter(Boolean).map((tag) => tag.toLowerCase());

  if (hashtagsArray.length > MAX_HASHTAG_COUNT) {
    return { isValid: false, message: `Максимальное количество хэштегов - ${MAX_HASHTAG_COUNT}` };
  }

  for (const tag of hashtagsArray) {
    if (isElementRepeat(tag, hashtagsArray)) {
      return { isValid: false, message: 'Хэштеги не могут повторяться' };
    }
    if (!tag.startsWith('#')) {
      return { isValid: false, message: 'Хэштег должен начинаться с символа #' };
    }
    if (tag.length < MIN_HASHTAG_LENGTH) {
      return { isValid: false, message: 'Хэштег не может состоять только из #' };
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      return { isValid: false, message: `Хэштег не может превышать ${MAX_HASHTAG_LENGTH} символов` };
    }
    if (!/^\w+$/.test(tag.slice(1)) || tag.includes('_')) {
      return { isValid: false, message: 'Символы в хэштеге могут быть только буквами и цифрами' };
    }
  }

  return { isValid: true };
};

const validateComments = (value) => {
  if (value.length > MAX_LENGTH_COMMENT) {
    return false;
  }
  return true;
};

pristine.addValidator(hashtags, (value) => validateHashtags(value).isValid, (value) => validateHashtags(value).message);
pristine.addValidator(comment, validateComments, 'Длина комментария не может быть больше 140 символов');

export { pristine };
