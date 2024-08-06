
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const ImageSizes = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

function onImageSizeDownClick() {
  const imageValue = parseInt(scaleControlInput.value, 10);

  if (imageValue > ImageSizes.MIN) {
    scaleControlInput.value = `${imageValue - ImageSizes.STEP }%`;

    imagePreview.style.transform = `scale(0.${imageValue - ImageSizes.STEP})`;
  }
}

function onImageSizeUpClick() {
  const imageValue = parseInt(scaleControlInput.value, 10);

  if (imageValue < ImageSizes.MAX) {
    scaleControlInput.value = `${imageValue + ImageSizes.STEP }%`;

    const borderValue = ImageSizes.MAX - ImageSizes.STEP;
    imagePreview.style.transform = imageValue < borderValue ? `scale(0.${imageValue + ImageSizes.STEP})` : 'scale(1)';
  }
}

function resetImageScale() {
  scaleControlInput.value = '100%';
  imagePreview.style.transform = 'scale(1)';
}

function addEditImageListeners(){
  scaleControlSmaller.addEventListener('click', onImageSizeDownClick);
  scaleControlBigger.addEventListener('click', onImageSizeUpClick);
}

function removeEditImageListeners(){
  scaleControlSmaller.removeEventListener('click', onImageSizeDownClick);
  scaleControlBigger.removeEventListener('click', onImageSizeUpClick);

  resetImageScale();
}

export { addEditImageListeners, removeEditImageListeners, imagePreview };
