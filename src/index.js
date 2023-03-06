import { isCorrectExtension, genMessageIncorrectExtension } from './incorrectInput.js';
import parse from './parsers.js';
import formater from './formatters/index.js';
import compare from './compare.js';

export default (filepath1, filepath2, formatName) => {
  if (!isCorrectExtension(filepath1) || !isCorrectExtension(filepath2)) {
    return genMessageIncorrectExtension(filepath1, filepath2);
  }
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const comparison = compare(data1, data2);
  return formater(comparison, formatName);
};
