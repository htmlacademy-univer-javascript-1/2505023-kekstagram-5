const MIN_ZOOM_VALUE = 25;
const ZOOM_STEP = 25;
const DEFAULT_ZOOM_VALUE = 100;
const MAX_ZOOM_VALUE = 100;

const umploadZoom = document.querySelector('.img-upload__scale');
const zoomSmaller = umploadZoom.querySelector('.scale__control--smaller');
const zoomBigger = umploadZoom.querySelector('.scale__control--bigger');
const zoomValue = umploadZoom.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');

const zoomImage = (value) => {
  picture.style.transform = `scale(${value / 100})`;
  zoomValue.value = `${value}%`;
};

const onBiggerZoomClick = () => {
  const biggerValue = parseInt(zoomValue.value, 10) + ZOOM_STEP;
  zoomImage(Math.min(biggerValue, MAX_ZOOM_VALUE));
};

const onSmallerZoomClick = () => {
  const smallerValue = parseInt(zoomValue.value, 10) - ZOOM_STEP;
  zoomImage(Math.max(smallerValue, MIN_ZOOM_VALUE));
};

const resetZoomValue = () => zoomImage(DEFAULT_ZOOM_VALUE);

zoomBigger.addEventListener('click', onBiggerZoomClick);
zoomSmaller.addEventListener('click', onSmallerZoomClick);

export { resetZoomValue };
