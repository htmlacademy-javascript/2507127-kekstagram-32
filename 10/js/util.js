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

export {getRandomInteger, stringCheck, isPalindrome, getNumbers, isEscapeKey, getArrayFromStingValue};
