
//1)Проверка длины строки
//Eslint ругался на такое: string.length <= maxLength ? true : false
const stringCheck = (string, maxLength) => string.length <= maxLength;
stringCheck('onetwothree', 12);
stringCheck('onetwothree', 10);

//2)Является ли строка палиндромом
const isPalindrome = (string) => {
  const normalString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    reversedString += normalString.at(i);
  }
  return normalString === reversedString;
};
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome(' Лёша на полке клопа нашёл ');

//3)Извлечение числа
const getNumbers = (string) => {
  //На случай, если вместо строки пришло число
  const convertedString = string.toString();
  let result = '';
  for (let i = 0; i < convertedString.length; i++) {
    const char = parseInt(convertedString.at(i), 10);
    result += Number.isNaN(char) ? '' : char;
  }
  return result;
};
getNumbers('2023 год');
getNumbers('1 кефир, 0.5 батона');
getNumbers('а я томат');
getNumbers(123);

