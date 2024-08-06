import { imagePreview } from './resize-image-form.js';
import { SLIDER_SETTINGS } from './slider-settings-form.js';

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

  effectsList.addEventListener('click', onImageFiltersClick);
  sliderContainer.classList.add('hidden');
}

function changeOptions(settings) {
  const sliderValue = sliderElement.noUiSlider.get();

  currentFilter = settings.filter;
  currentMeasure = settings.measure;
  imagePreview.style.filter = `${currentFilter}(${sliderValue}${currentMeasure})`;
  sliderElement.noUiSlider.updateOptions(settings.options);
}

function changePictureFilter(input) {
  switch (input.value) {
    case 'chrome':
      changeOptions(SLIDER_SETTINGS.chrome);
      break;

    case 'sepia':
      changeOptions(SLIDER_SETTINGS.sepia);
      break;

    case 'marvin':
      changeOptions(SLIDER_SETTINGS.marvin);
      break;

    case 'phobos':
      changeOptions(SLIDER_SETTINGS.phobos);
      break;

    case 'heat':
      changeOptions(SLIDER_SETTINGS.heat);
      break;

    default:
      resetEffectValues();
      break;
  }
}

function onImageFiltersClick(evt) {
  const itemInput = evt.target.closest('input[type="radio"]');

  if (itemInput){
    isEffectNone(itemInput.value);
    changePictureFilter(itemInput);
  }
}

function destroySlider(){
  sliderElement.noUiSlider.destroy();

  effectsList.removeEventListener('click', onImageFiltersClick);
  resetEffectValues();
}

export { createSlider, destroySlider };
