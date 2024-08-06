
//Проверка на нажатую клавишу ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

//Создание массива элементов из значения инпута
function getArrayFromStingValue (inputField) {
  const values = inputField.value.toLowerCase().trim().split(' ');

  //Фильтрация на случай, если между элементами будет больше 1 пробела
  const filteredValues = values.filter((item) => item !== '');

  return filteredValues;
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
  const onDocumentKeydown = (evt) =>{
    evt.preventDefault();
    if(isEscapeKey(evt)) {
      clonedTemplate.remove();
      removeListeners();
    }
  };
  document.addEventListener('keydown', onDocumentKeydown);

  //Закрытие по клику на произвольную область
  const onDocumentClick = (evt) => {
    if (evt.target !== clonedTemplateModal) {
      clonedTemplate.remove();
      removeListeners();
    }
  };
  document.addEventListener('click', onDocumentClick);

  //Удаление обработчиков
  function removeListeners () {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

}

//Получение случайных данных из массива в указанном кол-ве
function getRandomElements(elements, number){
  const randomElements = [];

  for(let i = 0; i <= number - 1; i++){
    let randomElement;

    do {
      randomElement = elements[Math.floor(Math.random() * elements.length)];
    } while (randomElements.includes(randomElement));

    randomElements.push(randomElement);
  }

  return randomElements;
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
