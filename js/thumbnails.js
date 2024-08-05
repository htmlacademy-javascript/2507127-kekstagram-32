
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

function createThumbnail({url,description,likes,comments}) {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
}

function removeThumbnails() {
  const pictures = container.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
}

function renderThumbnails(data){
  removeThumbnails();

  const fragment = document.createDocumentFragment();

  data.forEach((picture) =>{
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.appendChild(fragment);
}

export {renderThumbnails};
