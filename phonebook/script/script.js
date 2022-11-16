import {renderApp, renderData} from './modules/render.js';
import controls from './modules/control.js';
import {data as getStorage} from './modules/serviceStorage.js';

const {hoverRow, modalControl, deleteControl, formControl} = controls;

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
    } = renderApp(app, title);

    // Функционал
    const allRow = renderData(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}

