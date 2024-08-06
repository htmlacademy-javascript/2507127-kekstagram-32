import './big-picture/modal-big-picture.js';
import { onCloseImageClick } from './form/modal-form.js';
import './api.js';
import { setUserFormSubmit } from './form/validation-form.js';
import { renderFilteredThumbnails } from './filters.js';

renderFilteredThumbnails();
setUserFormSubmit(onCloseImageClick);
