
//Находим нужный объект в массиве сгенерированных данных
function getCurrentThumbnailData(dataArray, currentThumbnail){
  for(let i = 0; i < dataArray.length; i++) {
    const obj = dataArray[i];
    const currentThumbnailImgUrl = currentThumbnail.querySelector('.picture__img').src;
    if (currentThumbnailImgUrl.includes(obj.url)) {
      return obj;
    }
  }
}

//Рендер комментариев
function renderComments(data, container){
  const comments = data.comments;

  comments.forEach(({avatar, message, name}) => {
    const commentTemplate = `
        <li class="social__comment">
          <img
            class="social__picture"
            src=${avatar}
            alt=${name}
            width="35" height="35">
          <p class="social__text">${message}</p>
        </li>
      `;
    container.insertAdjacentHTML('beforeend', commentTemplate);
  });


}


export {renderComments, getCurrentThumbnailData};
