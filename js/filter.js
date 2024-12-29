import { renderPictures } from './gallery.js';
import { debounce, getRandomElements } from './util.js';

const filterSection = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const MAX_RANDOM_PICTURES_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const getRandomPictures = (pictures, count) => getRandomElements(pictures, count);

const sortByComments = (a, b) => b.comments.length - a.comments.length;
const getDiscussedPhotos = (pictures) => [...pictures].sort(sortByComments);

const clearPictures = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

const applyFilter = (pictures, filterButton) => {
  clearPictures();
  const currentActiveButton = document.querySelector(`.${ACTIVE_CLASS}`);
  if (currentActiveButton) {
    currentActiveButton.classList.remove(ACTIVE_CLASS);
  }
  renderPictures(pictures);
  filterButton.classList.add(ACTIVE_CLASS);
};

const showFilteredPictures = (pictures) => {
  renderPictures(pictures);
  filterSection.classList.remove('img-filters--inactive');

  randomFilter.addEventListener('click', debounce(() => {
    applyFilter(getRandomPictures(pictures, MAX_RANDOM_PICTURES_COUNT), randomFilter);
  }));

  discussedFilter.addEventListener('click', debounce(() => {
    applyFilter(getDiscussedPhotos(pictures), discussedFilter);
  }));

  defaultFilter.addEventListener('click', debounce(() => {
    applyFilter(pictures, defaultFilter);
  }));
};

export { showFilteredPictures };
