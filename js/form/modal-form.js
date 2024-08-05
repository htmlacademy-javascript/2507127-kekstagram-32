import { isEscapeKey } from '../util.js';
import { addEditImageListeners, removeEditImageListeners } from './resize-image-form.js';
import { createSlider, destroySlider } from './slider-form.js';
import { form } from './validation-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];


const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');
const photoPreview = document.querySelector('.img-upload__preview img');


function onDocumentKeydown(evt) {
  //Ищем элемент во время выполнеия функции, так как до ее вызова элемент может отсутстовать в DOM
  const errorModal = document.querySelector('section.error');

  //Отмена события, если поле ввода в фокусе
  const inputFocus = evt.target.matches('input.text__hashtags') || evt.target.matches('textarea') || errorModal;

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

function isValidType(file) {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
}

function onUploadInputChange() {
  const file = uploadInput.files[0];

  if(file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
  }

  showImageForm();
}

uploadInput.addEventListener('change', onUploadInputChange);

export {closeImageForm };
