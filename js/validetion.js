const MAX_SYMBOLS_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const ErrorText = {
  INVALID_LENGTH:`Длина комментария не должна превышать ${MAX_SYMBOLS_COMMENT_LENGTH} символов`,
  INVALID_COUNT: `Допустимо не более ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  NOT_INIQUE: 'Хэш-теги должны быть уникальными',
  INVALID_PATTERN: 'Некорректный хэш-тег',
};

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const commentField = form.querySelector('.text__description');
const hashtagsField = form.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const normalizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const validateComment = (value) => value.length <= MAX_SYMBOLS_COMMENT_LENGTH;

const validateHashtagsCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS_COUNT;

const validateHashtags = (value) => normalizeHashtags(value).every((hashtag) => hashtagRegExp.test(hashtag));

const validateHashtagsUniqueness = (value) => {
  const lowerCaseTags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(commentField, validateComment, ErrorText.INVALID_LENGTH);
pristine.addValidator(hashtagsField, validateHashtagsCount, ErrorText.INVALID_COUNT);
pristine.addValidator(hashtagsField, validateHashtags, ErrorText.INVALID_PATTERN);
pristine.addValidator(hashtagsField, validateHashtagsUniqueness, ErrorText.NOT_INIQUE);

export {pristine};
