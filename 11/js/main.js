import { renderThumbnails } from './thumbnails.js';
import './big-picture/modal-big-picture.js';
import { closeImageForm } from './form/modal-form.js';
import './api.js';
import { setUserFormSubmit } from './form/validation-form.js';


renderThumbnails();
setUserFormSubmit(closeImageForm);
