import { isEscapeKey } from './util.js';
import { resetZoomValue } from './zoom.js';
import { sendData } from './api.js';
import { onChangeEffect, removeFilter} from './effects.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

const MAX_TAGS = 5;
const MAX_DESC = 140;
const TAGS_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessages = {
  INVALID_COUNT_TAGS: `Максимум ${MAX_TAGS} хэштегов`,
  NOT_ORIGINAL_TAG: 'Теги не должны повторяться',
  INVALID_TAG: 'Тег не валиден',
  INVALID_COUNT_DESC: `Максимум ${MAX_DESC} символов!`
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fieldForHashTages = document.querySelector('.text__hashtags');
const fieldForDescription = document.querySelector('.text__description');
const cancelButton = form.querySelector('.img-upload__cancel');
const inputButton = form.querySelector('.img-upload__input');
const effectsList = document.querySelector('.effects__list');
const effectsPreview = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const closeForm = () => {
  form.reset();
  pristine.reset();
  resetZoomValue();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  effectsList.removeEventListener('click', onChangeEffect);
  removeFilter();
};

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    await sendData(new FormData(form))
      .then(() => {
        showSuccessMessage();
        removeFilter();
        resetZoomValue();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        closeForm();
      });
  }
});

const openForm = (evt) =>{
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  effectsList.addEventListener('click', onChangeEffect);
  overlay.querySelector('img').src = URL.createObjectURL(evt.target.files[0]);
  const imageURL = overlay.querySelector('img').src;
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = `url('${imageURL}')`;
  });
};

const convertTagsList = (string) => string.trim().split(' ').filter((tag) => Boolean(tag.length));
const isOnFocus = () => document.activeElement === fieldForHashTages || document.activeElement === fieldForDescription;
const compareTagsNumber = (string) => convertTagsList(string).length <= MAX_TAGS;
const compareDescSymbolsNumber = (string) => string.length <= MAX_DESC;
const compareOriginalTag = (string) => {
  const lowerString = convertTagsList(string).map((currentTag) => currentTag.toUpperCase());
  return lowerString.length === new Set(convertTagsList(string)).size;
};
const compareValidTag = (string) => convertTagsList(string).every((tag) => TAGS_PATTERN.test(tag));

function onDocumentKeyDown(evt){
  if(isEscapeKey && !isOnFocus()){
    evt.preventDefault();
    closeForm();
  }
}

const onCancelClick = () => closeForm();
const onInputOverlayClick = (evt) => openForm(evt);

pristine.addValidator(
  fieldForHashTages,
  compareTagsNumber,
  ErrorMessages.INVALID_COUNT_TAGS,
  1,
  true
);

pristine.addValidator(
  fieldForHashTages,
  compareOriginalTag,
  ErrorMessages.NOT_ORIGINAL_TAG,
  2,
  true
);

pristine.addValidator(
  fieldForHashTages,
  compareValidTag,
  ErrorMessages.INVALID_TAG,
  3,
  true
);

pristine.addValidator(
  fieldForDescription,
  compareDescSymbolsNumber,
  ErrorMessages.INVALID_COUNT_DESC,
  4,
  true
);

inputButton.addEventListener('change', onInputOverlayClick);
cancelButton.addEventListener('click', onCancelClick);
