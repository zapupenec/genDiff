import stylish from './stylish.js';
import plain from './plain.js';

const formater = (data, type) => {
  if (type === 'plain') {
    return plain(data);
  }
  return stylish(data, ' ', 4);
};

export default formater;
