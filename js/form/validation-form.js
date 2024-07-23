import { getArrayFromStingValue } from '../util.js';

const form = document.querySelector('.img-upload__form');
const hashtagsField = document.querySelector('.text__hashtags');


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

  return hashtagsArrayLength <= 5;
}

//Проверка на повторяющиеся хэштэги
function checkForHashtagsDuplicates() {
  const duplicates = getHashstagsArray().filter((el, i, arr) => arr.indexOf(el) !== i);

  return !(duplicates.length > 0);
}

//Проверка самих хэштегов
function validateHashtags() {
  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

  return hashtagsField.value.length > 0 ? getHashstagsArray().every((hashtag) => regexp.test(hashtag)) : true;
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

