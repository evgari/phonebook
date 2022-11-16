'use strict';

const getStorage = () => JSON.parse(localStorage.getItem('phonebook')) || [];

const setStorage = data =>
  localStorage.setItem('phonebook', JSON.stringify(data));

const addStorage = contact => {
  const data = getStorage('phonebook');
  data.push(contact);
  setStorage(data);
};

const removeStorage = phone => {
  const data = getStorage('phonebook');
  const newData = data.filter(item => item.phone !== phone);
  setStorage(newData);
};

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const headerContainer = createContainer();
  header.append(headerContainer);

  header.headerContainer = headerContainer;

  return header;
};

const createLogo = title => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Телефонный справочник. ${title}`;

  return h1;
};

const createMain = () => {
  const main = document.createElement('main');

  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

const createBtnsGroup = params => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
    const btn = document.createElement('button');
    btn.type = type;
    btn.textContent = text;
    btn.className = className;
    return btn;
  });

  btnWrapper.append(...btns);

  return {
    btnWrapper,
    btns,
  };
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="delete">Удалить</th>
      <th class="name">Имя</th>
      <th class="surname">Фамилия</th>
      <th>Телефон</th>
      <th class="edit">Редактировать</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;

  return table;
};

const createForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');

  const form = document.createElement('form');
  form.classList.add('form');
  form.insertAdjacentHTML('beforeend', `
    <button class="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>
    <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input id="name" class="form-input"
        name="name" type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input id="surname" class="form-input"
        name="surname" type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input id="phone" class="form-input"
        name="phone" type="number" required>
    </div>
  `);

  const btnsGroup = createBtnsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
  ]);

  form.append(...btnsGroup.btns);

  overlay.append(form);

  return {
    overlay,
    form,
  };
};

const createFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const footerContainer = createContainer();
  footer.append(footerContainer);

  footer.footerContainer = footerContainer;

  return footer;
};

const createCopy = title => {
  const copy = document.createElement('div');
  copy.textContent = `Все права защищены @${title}`;

  return copy;
};

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

const createRow = ({name: firstName, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');

  const btnDel = document.createElement('button');
  btnDel.classList.add('del-icon');
  btnDel.dataset.phone = phone;
  tdDel.append(btnDel);

  const tdName = document.createElement('td');
  tdName.classList.add('name');
  tdName.textContent = firstName;

  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname;

  const tdPhone = document.createElement('td');
  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;
  tr.phoneLink = phoneLink;

  tdPhone.append(phoneLink);

  const tdEdit = document.createElement('td');
  tdEdit.classList.add('edit');
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('edit-icon');
  tdEdit.append(btnEdit);

  tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

  return tr;
};

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });

    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;

    if (target === formOverlay ||
      target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
      removeStorage(target.dataset.phone);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    addStorage(newContact);
    form.reset();
    closeModal();
  });
};

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

  // Функционал
  const allRow = renderContacts(list, data);
  const {closeModal} = modalControl(btnAdd, formOverlay);

  hoverRow(allRow, logo);
  deleteControl(btnDel, list);
  formControl(form, list, closeModal);
};

window.phoneBookInit = init;

