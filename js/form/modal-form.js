import { isEscapeKey } from '../util.js';
import { addEditImageListeners, removeEditImageListeners } from './resize-image-form.js';
import { createSlider, destroySlider } from './slider-form.js';
import { form } from './validation-form.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const errorModal = document.querySelector('#error');


function onDocumentKeydown(evt) {
  //Отмена события, если поле ввода в фокусе
  const inputFocus = evt.target.matches('input.text__hashtags') || evt.target.matches('textarea') || evt.target === errorModal;

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
  form.reset();
}

uploadInput.addEventListener('change', showImageForm);

export {closeImageForm };
