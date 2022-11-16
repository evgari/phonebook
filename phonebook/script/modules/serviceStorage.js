const getStorage = () => JSON.parse(localStorage.getItem('phonebook')) || [];

const setStorage = contact => {
  const data = getStorage('phonebook');
  data.push(contact);
  localStorage.setItem('phonebook', JSON.stringify(data));
};

const removeStorage = phone => {
  const data = getStorage('phonebook');
  const newData = data.filter(item => item.phone !== phone);
  localStorage.setItem('phonebook', JSON.stringify(newData));
};

export default {
  setStorage,
  removeStorage,
};

export const data = getStorage;
