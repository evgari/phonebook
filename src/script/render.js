import {
  createImageLogo,
  createHeader,
  createLogo,
  createMain,
  createBtnsGroup,
  createTable,
  createForm,
  createFooter,
  createCopy,
  createRow,
} from './createElements';

export const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const imageLogo = createImageLogo();
  const logo = createLogo(title);
  const main = createMain();
  const btnsGroup = createBtnsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter();
  const copy = createCopy(title);

  header.headerContainer.append(imageLogo, logo);
  main.mainContainer.append(btnsGroup.btnWrapper, table, overlay);
  footer.footerContainer.append(copy);
  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: btnsGroup.btns[0],
    btnDel: btnsGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

export const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};


