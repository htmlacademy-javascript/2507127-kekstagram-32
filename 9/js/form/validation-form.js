import { getArrayFromStingValue } from '../util.js';
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const hashtagsField = form.querySelector('.text__hashtags');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'

});


//Получение массива из значения инпута. Объявил функцию, так как переменная будет содержать неактуальное значение
const getHashstagsArray = () => getArrayFromStingValue(hashtagsField);


//Проверка на кол-во хэштегов
function validateHashtagsAmount(){
  const hashtagsArrayLength = hashtagsField.value ? getHashstagsArray().length : 0;

  return hashtagsArrayLength <= MAX_HASHTAG_COUNT;
}

//Проверка на повторяющиеся хэштэги
function checkForHashtagsDuplicates() {
  const duplicates = getHashstagsArray().filter((el, i, arr) => arr.indexOf(el) !== i);

  return !(duplicates.length > 0);
}

//Проверка самих хэштегов
function validateHashtags() {
  return hashtagsField.value.length > 0 ? getHashstagsArray().every((hashtag) => VALID_SYMBOLS.test(hashtag)) : true;
}

pristine.addValidator(hashtagsField, validateHashtagsAmount, 'Не больше 5 хэштегов');
pristine.addValidator(hashtagsField, checkForHashtagsDuplicates, 'Хэштеги не должны повторяться');
pristine.addValidator(hashtagsField, validateHashtags, 'Правила для хэштегов: не могут состоять лишь из символа "#", должны содержать только буквы и числа, не более 20 символов');


form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }

});

