import { showFilteredPictures } from './filter.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import './form.js';

const fetchPictures = async () => {
  try {
    showFilteredPictures(await getData());
  } catch (error){
    showAlert(error);
  }
};

fetchPictures();
