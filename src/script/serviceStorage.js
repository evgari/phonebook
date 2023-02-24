export const getStorage = () =>
  JSON.parse(localStorage.getItem('phonebook')) || [];

export const setStorage = contact => {
  const data = getStorage('phonebook');
  data.push(contact);
  localStorage.setItem('phonebook', JSON.stringify(data));
};

export const removeStorage = phone => {
  const data = getStorage('phonebook');
  const newData = data.filter(item => item.phone !== phone);
  localStorage.setItem('phonebook', JSON.stringify(newData));
};

