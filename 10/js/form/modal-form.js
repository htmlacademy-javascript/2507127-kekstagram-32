import { isEscapeKey } from '../util.js';
import './validation-form.js';
import { addEditImageListeners, removeEditImageListeners } from './resize-image-form.js';
import { createSlider, destroySlider } from './slider-form.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');


function onDocumentKeydown(evt) {
  //Отмена события, если поле ввода в фокусе
  const inputFocus = evt.target.matches('input.text__hashtags') || evt.target.matches('textarea');

  if (isEscapeKey(evt) && !inputFocus) {
    evt.preventDefault();
    closeImageForm();
  }
}

function showImageForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancel.addEventListener('click', closeImageForm);

  addEditImageListeners();
  createSlider();
}

function closeImageForm(){
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancel.removeEventListener('click', closeImageForm);

  uploadInput.value = '';

  removeEditImageListeners();
  destroySlider();
}

uploadInput.addEventListener('change', showImageForm);
