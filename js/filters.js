import {getPictures} from './pictures.js';
import {getRandomElementsArray, debounce} from './utils.js';

const MAX_RANDOM_PICTURES_COUNT = 10;

const ACTIVE_CLASS = 'img-filters__button--active';

const filterSection = document.querySelector('.img-filters');
const defaultfFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const getRandomPhotos = (photos, count) => getRandomElementsArray(photos, count);

const sortByComments = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;
const getDiscussedPhotos = (photos) => photos.slice().sort(sortByComments);

const removePhotos = () => document.querySelectorAll('.picture').forEach((photo) => photo.remove());

const changePhotos = (photos, filter) => {
  removePhotos();
  const activeFilter = document.querySelector(`.${ACTIVE_CLASS}`);
  activeFilter.classList.remove(ACTIVE_CLASS);
  getPictures(photos);
  filter.classList.add(ACTIVE_CLASS);
};

const showFilteredPhotos = (photos) => {
  getPictures(photos);
  filterSection.classList.remove('img-filters--inactive');
  defaultfFilter.addEventListener('click', debounce(() => {
    changePhotos(photos, defaultfFilter);
  }));
  randomFilter.addEventListener('click', debounce(() => {
    changePhotos(getRandomPhotos(photos, MAX_RANDOM_PICTURES_COUNT), randomFilter);
  }));
  discussedFilter.addEventListener('click', debounce(() => {
    changePhotos(getDiscussedPhotos(photos), discussedFilter);
  }));
};

export {showFilteredPhotos};
