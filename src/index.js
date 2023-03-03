import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const isCorrectExtension = (filepath) => {
  const extname = path.extname(filepath);
  if (extname === '.json' || extname === '.yml' || extname === '.yaml') {
    return true;
  }
  return false;
};

const genMessageIncorrectExtension = (filepath1, filepath2) => {
  let preposition = 'or';
  if (!isCorrectExtension(filepath1) && !isCorrectExtension(filepath1)) {
    preposition = 'and';
  }

  const filename1 = path.basename(filepath1);
  const filename2 = path.basename(filepath2);

  const message = `The file '${filename1}' ${preposition} '${filename2}' with incorrect extension. Use .json or .yml(.yaml) file.`;
  return message;
};

const parse = (filepath) => {
  const absFilepath = path.resolve(filepath);
  const result = fs.readFileSync(absFilepath, 'utf8');
  return JSON.parse(result);
};

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

export { genMessageIncorrectExtension, genDiff };
