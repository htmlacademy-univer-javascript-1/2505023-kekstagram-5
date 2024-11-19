import { getRandomInt, getRandomArrayElement, createIdGen } from './util.js';

const AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Иван', 'Мария', 'Алексей', 'Ольга', 'Дмитрий', 'Екатерина', 'Сергей', 'Анна', 'Максим', 'Наталья'];

const DESCRIPTIONS = [
  'Отличная фотка! Особенно круто получилось с освещением.',
  'Классный ракурс!',
  'Какие яркие цвета!',
  'Какая атмосфера на фото!',
  'Просто супер!',
  'Замечательно!',
  'Вау, как красиво!',
  'Красивый кадр!',
  'Очень атмосферно! ',
  'Потрясающая фотография!'
];

const generateCommentId = createIdGen();

const generateMessage = () => Array.from(
  { length: getRandomInt(1,2) },
  () => getRandomArrayElement (MESSAGES),
).join(' ');

const generateComment = () => ({
  id: generateCommentId(),
  avatar: AVATARS[getRandomInt(0, AVATARS.length - 1)],
  message: generateMessage(),
  name: NAMES[getRandomInt(0, NAMES.length - 1)]
});

const generatePhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({ length: getRandomInt(0, 30) }, generateComment,),
});

const getPhoto = () => Array.from(
  { length: 25 },
  (_, photoIndex) => generatePhoto(photoIndex + 1),
);

export { getPhoto };

