import { fetchedData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { getRandomElements, debounce } from './util.js';

const RANDOM_DATA_NUMBER = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('form .img-filters__button');

const activeClass = 'img-filters__button--active';

function sortDataByComments(array){
  return array.slice().sort((a, b) => b.comments.length - a.comments.length);
}

//Добавление активного класса для нажатой кнопки / удаление у остальных кнопок
function changeActiveButton(evt) {

  filterButtons.forEach((button) => {
    button.classList.remove(activeClass);
  });

  evt.target.classList.add(activeClass);
}


//Смена фильтра
function changeFilter(button){
  const choosenFilterId = button.id;
  switch(choosenFilterId) {
    case Filters.RANDOM:
      renderThumbnails(getRandomElements(fetchedData, RANDOM_DATA_NUMBER));
      break;
    case Filters.DISCUSSED:
      renderThumbnails(sortDataByComments(fetchedData));
      break;
    default:
      renderThumbnails(fetchedData);
      break;
  }
}

function renderFilteredThumbnails() {
  if (fetchedData) {
    renderThumbnails(fetchedData);

    filtersContainer.classList.remove('img-filters--inactive');

    filtersContainer.addEventListener('click', (evt) => {
      //Условие, чтобы обработчик не сработал при нажатии на активную кнопку
      const isTargetButton = evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button').classList.contains(activeClass);
      if (isTargetButton) {
        const targetButton = evt.target;
        changeActiveButton(evt);

        debounce(() => changeFilter(targetButton));
      }
    });

  }
}

export { renderFilteredThumbnails };
