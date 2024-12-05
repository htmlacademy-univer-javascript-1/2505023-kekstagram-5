const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const createUniqueRandomNumberList = (min, max, length) => {
  const previousNumbers = [];
  while (previousNumbers.length < length) {
    let currentValue = getRandomInteger(min, max);
    while (previousNumbers.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousNumbers.push(currentValue);
  }
  return previousNumbers;
};
const getUniqueNumber = (list, usedNumbers) => {
  for (let i = 0; i < list.length; i++){
    if (usedNumbers.includes(list[i]) === false){
      usedNumbers.push(list[i]);
      return list[i];
    }
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  createUniqueRandomNumberList,
  getUniqueNumber,
  isEscapeKey
};
