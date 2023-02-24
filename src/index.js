import {renderPhoneBook, renderContacts} from './script/render';
import {hoverRow, modalControl, deleteControl,
  formControl} from './script/control';
import {getStorage} from './script/serviceStorage';

import './scss/index.scss';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage();
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  init('#app', 'Евгений');
}

