import stylish from './stylish.js';
import plain from './plain.js';

const formater = (data, type) => {
  switch (type) {
    case '':
      return stylish(data);
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown type output format: '${type}'!`);
  }
};

export default formater;
