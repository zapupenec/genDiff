import parse from './parsers.js';
import formater from './formatters/index.js';
import compare from './compare.js';

export default (filepath1, filepath2, formatName) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const comparison = compare(data1, data2);
  return formater(comparison, formatName);
};
