import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formater from './formatters/index.js';
import compare from './compare.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const fileFormat1 = getFileFormat(filepath1);

  const data2 = readFile(filepath2);
  const fileFormat2 = getFileFormat(filepath2);

  const dataParse1 = parse(data1, fileFormat1);
  const dataParse2 = parse(data2, fileFormat2);

  const comparison = compare(dataParse1, dataParse2);
  return formater(comparison, formatName);
};

export default genDiff;
