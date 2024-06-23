
//1)Проверка длины строки
//Eslint ругался на такое: string.length <= maxLength ? true : false
const stringCheck = (string, maxLength) => string.length <= maxLength;
console.log(stringCheck('onetwothree', 12));
console.log(stringCheck('onetwothree', 10));

//2)Является ли строка палиндромом
const isPalindrome = (string) => {
  const normalString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    reversedString += normalString.at(i);
  }
  return normalString === reversedString;
}
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome(' Лёша на полке клопа нашёл '));

//3)Извлечение числа
const getNumbers = (string) => {
  //На случай, если вместо строки пришло число
  let convertedString = string.toString();
  let result = '';
  for (let i = 0; i < convertedString.length; i++) {
    let char = parseInt(convertedString.at(i));
    result += Number.isNaN(char) ? '' : char;
  }
  return result;
};
console.log(getNumbers('2023 год'));
console.log(getNumbers('1 кефир, 0.5 батона'));
console.log(getNumbers('а я томат'));
console.log(getNumbers(123));
