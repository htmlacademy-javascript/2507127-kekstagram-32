import { fetchedData } from '../api.js';
import { renderComments, getCurrentThumbnailData } from './functions-big-picture.js';

let currentThumbnailData;

let sliceCommentsStartNumber = 0;
let sliceCommentsEndNumber = 5;

const bigPicture = document.querySelector('.big-picture');
//Дочерние элементы bigPicture
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');


//Помещаем данные в модальное окно
function putDataIntoBigPicture(data){
  const modalImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const modalLikes = bigPicture.querySelector('.likes-count');
  const modalDescription = bigPicture.querySelector('.social__caption');

  modalImage.src = data.url;
  modalLikes.textContent = data.likes;
  commentsShownCount.textContent = data.comments.length < sliceCommentsEndNumber ? data.comments.length : sliceCommentsEndNumber;
  commentsTotalCount.textContent = data.comments.length;
  modalDescription.textContent = data.description;
}

//Проверка на полную загрузку комментариев
function isCommentsFullLoaded(){
  if (currentThumbnailData.comments.length <= sliceCommentsEndNumber) {
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    commentsLoader.classList.add('hidden');
  }
}

//Рендер комментариев при нажатии на "Загрузить еще"
function onCommentsLoaderClick(){
  if (currentThumbnailData.comments.length === sliceCommentsEndNumber) {
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    return;
  }

  if (currentThumbnailData.comments.length >= sliceCommentsEndNumber + 5) {
    sliceCommentsStartNumber += 5;
    sliceCommentsEndNumber += 5;
  } else {
    sliceCommentsStartNumber = currentThumbnailData.comments.length - (currentThumbnailData.comments.length - sliceCommentsEndNumber);
    sliceCommentsEndNumber = currentThumbnailData.comments.length;
  }

  renderComments(currentThumbnailData, sliceCommentsStartNumber, sliceCommentsEndNumber, commentsContainer);
  commentsShownCount.textContent = sliceCommentsEndNumber;

  isCommentsFullLoaded();
}

function renderBigPicture(currentThumbnail){
  sliceCommentsStartNumber = 0;
  sliceCommentsEndNumber = 5;

  currentThumbnailData = getCurrentThumbnailData(fetchedData, currentThumbnail);

  putDataIntoBigPicture(currentThumbnailData);

  commentsContainer.innerHTML = '';
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  renderComments(currentThumbnailData, sliceCommentsStartNumber, sliceCommentsEndNumber, commentsContainer);

  commentsLoader.classList.remove('hidden');
  isCommentsFullLoaded();
}


export {bigPicture, renderBigPicture};
