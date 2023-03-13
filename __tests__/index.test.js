import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trimEnd();

test.each([
  ['json', 'stylish'],
  ['yml', 'plain'],
])('outputs stylish and plain', (extension, typeOutput) => {
  const examData = readFile(`result_${typeOutput}.txt`);
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  const data = genDiff(filepath1, filepath2, typeOutput);
  expect(data).toEqual(examData);
});

test('output json', () => {
  const extension = 'yaml';
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  const data = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
