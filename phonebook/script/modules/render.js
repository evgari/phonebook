import * as createElement from './createElements.js';

const createHeader = createElement.header;
const createLogo = createElement.logo;
const createMain = createElement.main;
const createBtnsGroup = createElement.btnsGroup;
const createTable = createElement.table;
const createForm = createElement.form;
const createFooter = createElement.footer;
const createCopy = createElement.copy;
const createRow = createElement.row;

const renderPhoneBook = (app, title) => {
  const header = createHeader();
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

  header.headerContainer.append(logo);
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

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};

export const renderApp = renderPhoneBook;
export const renderData = renderContacts;

