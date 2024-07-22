import { randomDataArray } from '../thumbnails.js';
import { renderComments, getCurrentThumbnailData } from './functions-big-picture.js';

let currentThumbnailData;

const bigPicture = document.querySelector('.big-picture');
//Дочерние элементы bigPicture

const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


//Помещаем данные в модальное окно
function putDataIntoBigPicture(data){
  const modalImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const modalLikes = bigPicture.querySelector('.likes-count');
  const modalDescription = bigPicture.querySelector('.social__caption');

  modalImage.src = data.url;
  modalLikes.textContent = data.likes;
  modalDescription.textContent = data.description;
}

function renderBigPicture(currentThumbnail){
  currentThumbnailData = getCurrentThumbnailData(randomDataArray, currentThumbnail);

  putDataIntoBigPicture(currentThumbnailData);

  commentsContainer.innerHTML = '';
  renderComments(currentThumbnailData, commentsContainer);

}

//Сокрытие счетчика комментариев и кнопки "загрузить еще"
commentsCount.classList.add('hidden');
commentsLoader.classList.add('hidden');


export {bigPicture, renderBigPicture};
