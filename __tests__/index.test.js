import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trimEnd();

test.each([
  ['json', ''],
  ['yml', 'stylish'],
  ['yaml', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['yaml', 'plain'],
])('outputs', (extension, typeOutput) => {
  const typeExam = typeOutput === '' ? 'stylish' : typeOutput;
  const examData = readFile(`result_${typeExam}.txt`);

  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);

  const data1 = genDiff(filepath1, filepath2, typeOutput);
  expect(data1).toEqual(examData);

  const data2 = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(data2)).not.toThrow();

  expect(() => genDiff(filepath1, filepath2, 'another')).toThrow();
});
