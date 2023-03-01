import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('flat compare', () => {
  const file1 = 'file1.json';
  const filepath1 = getFixturePath(file1);

  const file2 = 'file2.json';
  const filepath2 = getFixturePath(file2);

  const examFile = 'examFile.txt';
  const dataExam = readFile(examFile);

  const compare = genDiff(filepath1, filepath2);

  expect(compare).toBe(dataExam);
});
