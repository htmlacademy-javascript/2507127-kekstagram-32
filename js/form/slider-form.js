import { imagePreview } from './resize-image-form.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderEffectInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');


let currentFilter;
let currentMeasure;

function resetEffectValues() {
  currentFilter = '';
  currentMeasure = '';
  imagePreview.style.filter = '';
}

const isEffectNone = (value) => value === 'none' ? sliderContainer.classList.add('hidden') : sliderContainer.classList.remove('hidden');

function createSlider(){
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function(value){
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function(value) {
        return parseFloat(value);
      }
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    sliderEffectInput.value = sliderValue;

    if (currentFilter) {
      imagePreview.style.filter = `${currentFilter}(${sliderValue}${currentMeasure})`;
    }
  });

  effectsList.addEventListener('click', addPictureFilter);
  sliderContainer.classList.add('hidden');
}

function changePictureFilter(input) {
  const sliderValue = sliderElement.noUiSlider.get();
  switch (input.value) {
    case 'chrome':
      currentFilter = 'grayscale';
      currentMeasure = '';
      imagePreview.style.filter = `${currentFilter}(${sliderValue}${currentMeasure})`;

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      break;

    case 'sepia':
      currentFilter = 'sepia';
      currentMeasure = '';
      imagePreview.style.filter = `${currentFilter}(${sliderValue}${currentMeasure})`;

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      break;

    case 'marvin':
      currentFilter = 'invert';
      currentMeasure = '%';
      imagePreview.style.filter = `${currentFilter}(${sliderValue}${currentMeasure})`;

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1
      });
      break;

    case 'phobos':
      currentFilter = 'blur';
      currentMeasure = 'px';
      imagePreview.style.filter = `${currentFilter}(${sliderValue}${currentMeasure})`;

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      break;

    case 'heat':
      currentFilter = 'brightness';
      currentMeasure = '';
      imagePreview.style.filter = `${currentFilter}(${sliderValue}${currentMeasure})`;

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      break;

    default:
      resetEffectValues();
      break;
  }
}

function addPictureFilter(evt) {
  const itemInput = evt.target.closest('input[type="radio"]');

  if (itemInput){
    isEffectNone(itemInput.value);
    changePictureFilter(itemInput);
  }
}

function destroySlider(){
  sliderElement.noUiSlider.destroy();

  effectsList.removeEventListener('click', addPictureFilter);
  resetEffectValues();
}

export { createSlider, destroySlider };
