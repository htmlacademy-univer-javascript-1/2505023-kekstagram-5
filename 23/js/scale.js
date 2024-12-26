const SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const RADIX = 10;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / SCALE.DEFAULT})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => scaleImage(Math.max(parseInt(scaleInput.value, RADIX) - SCALE.STEP, SCALE.MIN));

const onBiggerButtonClick = () => scaleImage(Math.min(parseInt(scaleInput.value, RADIX) + SCALE.STEP, SCALE.MAX));

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);
