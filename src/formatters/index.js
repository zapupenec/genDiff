import stylish from './stylish.js';
import plain from './plain.js';

const formater = (data, type) => {
  switch (type) {
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      return stylish(data);
  }
};

export default formater;
