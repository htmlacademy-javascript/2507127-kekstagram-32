
//Проверка на нажатую клавишу ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

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

//Получение случайных данных из массива в указанном кол-ве
function getRandomElements(array, number){
  const randomArr = [];

  for(let i = 0; i <= number - 1; i++){
    let randomElement;

    do {
      randomElement = array[Math.floor(Math.random() * array.length)];
    } while (randomArr.includes(randomElement));

    randomArr.push(randomElement);
  }

  return randomArr;
}

//Устранение дребезга
function debounce (callback, timeoutDelay = 500) {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, getArrayFromStingValue, showErrorMessage, showFetchMessage, getRandomElements, debounce};
