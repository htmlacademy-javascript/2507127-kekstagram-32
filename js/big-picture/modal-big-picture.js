import {bigPicture, renderBigPicture} from './big-picture.js';
import { isEscapeKey } from '../util.js';

const thumbnailsList = document.querySelector('.pictures');
const closeModalButton = document.querySelector('.big-picture__cancel');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalClose();
  }
}

function onModalOpen(element){
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderBigPicture(element);

  closeModalButton.addEventListener('click', onModalClose);
  document.addEventListener('keydown', onDocumentKeydown);
}

function onModalClose(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeModalButton.removeEventListener('click', onModalClose);
  document.removeEventListener('keydown', onDocumentKeydown);
}

thumbnailsList.addEventListener('click', (evt) =>{
  const currentThumbnail = evt.target.closest('a[class="picture"]');
  if (currentThumbnail){
    onModalOpen(currentThumbnail);
  }
});

