//Получение случайного числа в определенном диапазоне
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//Проверка на нажатую клавишу ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

//Проверка длины строки
function stringCheck(string, maxLength){
  return string.length <= maxLength;
}

//Является ли строка палиндромом
function isPalindrome(string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    reversedString += normalString.at(i);
  }
  return normalString === reversedString;
}

//Извлечение числа
function getNumbers(string){
  //На случай, если вместо строки пришло число
  const convertedString = string.toString();
  let result = '';
  for (let i = 0; i < convertedString.length; i++) {
    const char = parseInt(convertedString.at(i), 10);
    result += Number.isNaN(char) ? '' : char;
  }
  return result;
}

//Создание массива элементов из значения инпута
function getArrayFromStingValue (inputField) {
  const arr = inputField.value.toLowerCase().trim().split(' ');

  //Фильтрация на случай, если между элементами будет больше 1 пробела
  const filteredArr = arr.filter((item) => item !== '');

  return filteredArr;
}

//Показ сообщения при ошибке загрузке данных
function showErrorMessage(message = 'Возникла ошибка') {
  const template = document.querySelector('#data-error').content;
  const clonedTemplate = template.querySelector('.data-error').cloneNode(true);
  clonedTemplate.querySelector('h2').textContent = message;

  document.body.append(clonedTemplate);

  setTimeout(() => {
    clonedTemplate.remove();
  }, 5000);
}

//Показ сообщения при успешной отправке данных
function showFetchMessage(message = 'Изображение успешно загружено', selector = 'success'){
  const template = document.querySelector(`#${selector}`).content;
  const clonedTemplate = template.querySelector(`.${selector}`).cloneNode(true);
  const clonedTemplateModal = clonedTemplate.querySelector('div');
  const closeButton = clonedTemplate.querySelector(`.${selector}__button`);
  clonedTemplate.querySelector('h2').textContent = message;

  document.body.append(clonedTemplate);


  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clonedTemplate.remove();
  });


  //Закрытие при нажатии на ESC
  const onkeydownDocument = (evt) =>{
    evt.preventDefault();
    if(isEscapeKey(evt)) {
      clonedTemplate.remove();
      removeListeners();
    }
  };
  document.addEventListener('keydown', onkeydownDocument);

  //Закрытие по клику на произвольную область
  const onClickDocument = (evt) => {
    if (evt.target !== clonedTemplateModal) {
      clonedTemplate.remove();
      removeListeners();
    }
  };
  document.addEventListener('click', onClickDocument);

  //Удаление обработчиков
  function removeListeners () {
    document.removeEventListener('keydown', onkeydownDocument);
    document.removeEventListener('click', onClickDocument);
  }

}

export {getRandomInteger, stringCheck, isPalindrome, getNumbers, isEscapeKey, getArrayFromStingValue, showErrorMessage, showFetchMessage};
