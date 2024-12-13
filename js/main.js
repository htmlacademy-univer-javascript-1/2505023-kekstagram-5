import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import './form.js';

getData((loadedPictures) => {
  const pictures = [...loadedPictures];
  renderPictures([...pictures]);
});
