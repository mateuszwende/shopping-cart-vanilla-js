const STORAGE_KEY = 'cart';

let listener = null;
export const listen = (cb) => {
  listener = cb;
};

export const list = (key) =>
  JSON.parse(localStorage.getItem(key || STORAGE_KEY)) || [];

export const save = (data, key) => {
  localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));
  if (listener) listener(list(key || STORAGE_KEY));
};

export const clear = (key) => {
  localStorage.removeItem(key || STORAGE_KEY);
  if (listener) listener(list(key || STORAGE_KEY));
};
