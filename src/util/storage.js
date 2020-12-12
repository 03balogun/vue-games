export const get = (key) => {
  const result = localStorage.getItem(key);
  return result ? JSON.parse(result) : result;
};
export const store = (value, key = 'puzzle') => {
  return localStorage.setItem(key, JSON.stringify(value));
};
export const remove = (key = 'puzzle') => {
  return localStorage.removeItem(key);
};
