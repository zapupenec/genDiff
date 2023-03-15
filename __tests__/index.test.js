import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trimEnd();

test.each([
  'json',
  'yml',
  'yaml',
])('outputs', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);

  const examDataStylish = readFile('result_stylish.txt');
  const data1 = genDiff(filepath1, filepath2, 'stylish');
  expect(data1).toEqual(examDataStylish);

  const data2 = genDiff(filepath1, filepath2);
  expect(data2).toEqual(examDataStylish);

  const examDataPlain = readFile('result_plain.txt');
  const data3 = genDiff(filepath1, filepath2, 'plain');
  expect(data3).toEqual(examDataPlain);

  const data4 = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(data4)).not.toThrow();

  expect(() => genDiff(filepath1, filepath2, 'another')).toThrow();
});
