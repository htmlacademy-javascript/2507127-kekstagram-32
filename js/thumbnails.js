import {createDataArray} from './data.js';

function renderThumbnails(){

  const randomDataArray = createDataArray();

  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesList = document.querySelector('.pictures');

  const picturesListFragment = document.createDocumentFragment();

  randomDataArray.forEach(({url,description,likes,comments}) =>{
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;

    picturesListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(picturesListFragment);
}

export {renderThumbnails};
