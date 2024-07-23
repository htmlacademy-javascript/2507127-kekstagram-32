import {bigPicture, renderBigPicture} from './big-picture.js';
import { isEscapeKey } from '../util.js';

const thumbnailsList = document.querySelector('.pictures');
const closeModalButton = document.querySelector('.big-picture__cancel');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseModal();
  }
}

function onOpenModal(element){
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderBigPicture(element);

  closeModalButton.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onDocumentKeydown);
}

function onCloseModal(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeModalButton.removeEventListener('click', onCloseModal);
  document.removeEventListener('keydown', onDocumentKeydown);
}

thumbnailsList.addEventListener('click', (evt) =>{
  const currentThumbnail = evt.target.closest('a[class="picture"]');
  if (currentThumbnail){
    onOpenModal(currentThumbnail);
  }
});

