import stylish from './stylish.js';
import plain from './plain.js';

const mapping = {
  stylish,
  plain,
  json: JSON.stringify,
};

const formater = (data, type) => {
  if (!Object.hasOwn(mapping, type)) {
    throw new Error(`Unknown type output format: '${type}'!`);
  }
  return mapping[type](data);
};

export default formater;
