import stylish from './stylish.js';
import plain from './plain.js';

const formater = (data, type) => {
  if (type === 'plain') {
    return plain(data);
  }
  if (type === 'json') {
    return JSON.stringify(data);
  }
  return stylish(data, ' ', 4);
};

export default formater;
