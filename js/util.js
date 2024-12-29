const ERROR_DISPLAY_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ERROR_DISPLAY_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomInt = (val1, val2) => {
  const lower = Math.ceil(Math.min(val1, val2));
  const upper = Math.floor(Math.max(val1, val2));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElements = (arr, count) => {
  const randomIndexList = [];
  const max = Math.min(count, arr.length);

  while (randomIndexList.length < max) {
    const id = getRandomInt(0, arr.length - 1);
    if (!randomIndexList.includes(id)) {
      randomIndexList.push(id);
    }
  }

  return randomIndexList.map((id) => arr[id]);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInt, getRandomElements, isEscapeKey, showAlert, debounce };
