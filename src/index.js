import _ from 'lodash';
import { isCorrectExtension, genMessageIncorrectExtension } from './incorrectInput.js';
import parse from './parsers.js';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc[key] = 'added';
    } else if (!Object.hasOwn(data2, key)) {
      acc[key] = 'deleted';
    } else if (data1[key] !== data2[key]) {
      acc[key] = 'changed';
    } else {
      acc[key] = 'unchanged';
    }
    return acc;
  }, {});

  return result;
};

const genDiff = (filepath1, filepath2) => {
  if (!isCorrectExtension(filepath1) || !isCorrectExtension(filepath2)) {
    return genMessageIncorrectExtension(filepath1, filepath2);
  }

  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const diff = compare(data1, data2);
  const keys = Object.keys(diff);

  const lines = keys.reduce((acc, key) => {
    switch (diff[key]) {
      case 'added':
        acc.push(`  + ${key}: ${data2[key]}`);
        break;
      case 'deleted':
        acc.push(`  - ${key}: ${data1[key]}`);
        break;
      case 'changed':
        acc.push(`  - ${key}: ${data1[key]}`);
        acc.push(`  + ${key}: ${data2[key]}`);
        break;
      case 'unchanged':
        acc.push(`    ${key}: ${data1[key]}`);
        break;
      default:
    }
    return acc;
  }, []).join('\n');

  return `{\n${lines}\n}`;
};

export default genDiff;
