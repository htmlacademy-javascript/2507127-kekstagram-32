import { getArrayFromStingValue } from '../util.js';
import './resize-image-form.js';
import {sendData} from '../api.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const tagsField = document.querySelector('.text__hashtags');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'

});


//Получение массива из значения инпута. Объявил функцию, так как переменная будет содержать неактуальное значение
const getTagsArray = () => getArrayFromStingValue(tagsField);

//Проверка на кол-во хэштегов
function validateTagsAmount(){
  const tagsArrayLength = tagsField.value ? getTagsArray().length : 0;

  return tagsArrayLength <= MAX_HASHTAG_COUNT;
}

//Проверка на повторяющиеся хэштэги
function checkForTagsDuplicates() {
  const duplicates = getTagsArray().filter((el, i, arr) => arr.indexOf(el) !== i);

  return !(duplicates.length > 0);
}

//Проверка самих хэштегов
function validateTags() {
  return tagsField.value.length > 0 ? getTagsArray().every((hashtag) => VALID_SYMBOLS.test(hashtag)) : true;
}

pristine.addValidator(tagsField, validateTagsAmount, 'Не больше 5 хэштегов');
pristine.addValidator(tagsField, checkForTagsDuplicates, 'Хэштеги не должны повторяться');
pristine.addValidator(tagsField, validateTags, 'Правила для хэштегов: не могут состоять лишь из символа "#", должны содержать только буквы и числа, не более 20 символов');


function blockSubmitButton(){
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
}
function unblockSubmitButton(){
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
}

function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      try{
        blockSubmitButton();

        const data = await sendData(new FormData(evt.target));

        if (data) {
          onSuccess();
          form.reset();
        }
      }catch(err){
        throw new Error();
      } finally{
        unblockSubmitButton();
      }
    }
  });
}

export { setUserFormSubmit, form };
