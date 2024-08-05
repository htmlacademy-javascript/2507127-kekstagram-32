
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

function scaleImageSmaller() {
  const imageValue = parseInt(scaleControlInput.value, 10);

  if (imageValue > 25) {
    scaleControlInput.value = `${imageValue - 25 }%`;

    imagePreview.style.transform = `scale(0.${imageValue - 25})`;
  }
}

function scaleImageBigger() {
  const imageValue = parseInt(scaleControlInput.value, 10);

  if (imageValue < 100) {
    scaleControlInput.value = `${imageValue + 25 }%`;

    imagePreview.style.transform = imageValue < 75 ? `scale(0.${imageValue + 25})` : 'scale(1)';
  }
}

function resetImageScale() {
  scaleControlInput.value = '100%';
  imagePreview.style.transform = 'scale(1)';
}

function addEditImageListeners(){
  scaleControlSmaller.addEventListener('click', scaleImageSmaller);
  scaleControlBigger.addEventListener('click', scaleImageBigger);
}

function removeEditImageListeners(){
  scaleControlSmaller.removeEventListener('click', scaleImageSmaller);
  scaleControlBigger.removeEventListener('click', scaleImageBigger);

  resetImageScale();
}

export { addEditImageListeners, removeEditImageListeners, imagePreview };
