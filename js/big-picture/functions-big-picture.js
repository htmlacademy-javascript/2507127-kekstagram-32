
//Находим нужный объект в массиве сгенерированных данных
function getCurrentThumbnailData(thumbnails, currentThumbnail){
  for(let i = 0; i < thumbnails.length; i++) {
    const obj = thumbnails[i];
    const currentThumbnaillId = Number(currentThumbnail.dataset.thumbnailId);
    if (currentThumbnaillId === obj.id) {
      return obj;
    }
  }
}

//Рендер комментариев
function renderComments(data, startNumber, endNumber, container){
  if (data.comments.length === 0) {
    return;
  }
  if (data.comments.length < 5) {
    endNumber = data.comments.length;
  }
  const slicedDataComments = data.comments.slice(startNumber, endNumber);

  slicedDataComments.forEach(({avatar, message, name}) => {
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
