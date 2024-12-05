import { getRandomInteger, createUniqueRandomNumberList, getUniqueNumber } from './util.js';

const OBJECT_COUNT = 25;

const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Иван', 'Настя', 'Андрей', 'Сергей', 'Лена', 'Михаил'];

const descriptions = ['Хорошее место',
  'Райское наслаждение',
  'Незабываемые эмоции',
  'Просто чудо',
  'Это фантастика',
  'Просто невероятно'];

const COMMENT_COUNT = getRandomInteger(0, 30);

const usedObjectId = [];
const usedCommentId = [];
const usedUrl = [];
const objectIdList = createUniqueRandomNumberList(1, OBJECT_COUNT, OBJECT_COUNT);
const commentIdList = createUniqueRandomNumberList(1, 999, COMMENT_COUNT);
const objectUrlList = createUniqueRandomNumberList(1, OBJECT_COUNT, OBJECT_COUNT);

const createComment = () => ({
  id: getUniqueNumber(commentIdList, usedCommentId),
  avatar: `img/avatar-${ String(getRandomInteger(1, 6)) }.svg`,
  message: messages[getRandomInteger(0, 5)],
  name: names[getRandomInteger(0, 5)],
});

const createObject = () => ({
  id: getUniqueNumber(objectIdList, usedObjectId),
  url: `photos/${ String(getUniqueNumber(objectUrlList, usedUrl)) }.jpg`,
  description: descriptions[getRandomInteger(0, 5)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, createComment),
});

const objects = Array.from({length: OBJECT_COUNT}, createObject);

export {objects};

