const AVATAR_MAX_NUMBER = 6;
const MAX_COMMENTS_AMOUNT = 30;
const MAX_DATA_ARRAY_LENGTH = 25;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Эмир',
  'Тимофей',
  'Андрей',
  'Макар',
  'Тимур',
  'Артур',
  'Александр',
  'Марк',
  'Артём',
  'Даниил',
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


function getRandomCommentsArray(min, max) {
  const commentsArray = [];
  const randomCommentsAmount = getRandomInteger(min, max);
  for (let i = 1; i <= randomCommentsAmount; i ++){
    const avatarId = getRandomInteger(1, AVATAR_MAX_NUMBER);
    const randomMessage = messages[getRandomInteger(0, messages.length - 1)];
    const randomName = names[getRandomInteger(0, names.length - 1)];
    const newObject = {
      id: i,
      avatar: `img/avatar-${avatarId}.svg`,
      message: randomMessage,
      name: randomName,
    };
    commentsArray.push(newObject);
  }
  return commentsArray;
}

function createDataArray(arrayLength) {
  const dataArray = [];
  for(let i = 1; i <= arrayLength; i++) {
    const randomCommentsAmount = getRandomCommentsArray(0, MAX_COMMENTS_AMOUNT);
    const randomLikesNumber = getRandomInteger(15, 200);
    const newObject = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание № ${i}`,
      likes: randomLikesNumber,
      comments: randomCommentsAmount
    };
    dataArray.push(newObject);
  }
  return dataArray;
}

createDataArray(MAX_DATA_ARRAY_LENGTH);
