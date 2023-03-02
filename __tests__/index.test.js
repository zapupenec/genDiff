import url from 'url';
import path from 'path';
import fs from 'fs';
import { genMessageIncorrectExtension, genDiff } from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filename1 = 'file1.json';
const filepath1 = getFixturePath(filename1);

const filename2 = 'file2.json';
const filepath2 = getFixturePath(filename2);

const examFile = 'examFile.txt';
const examFilename = path.basename(examFile);
const examFilepath = getFixturePath(examFile);
const examData = readFile(examFile);

test('flat compare', () => {
  const compare = genDiff(filepath1, filepath2);
  expect(compare).toBe(examData);
});

test('File with incorrect extension', () => {
  const message = genMessageIncorrectExtension(filename1, examFilename);
  expect(genDiff(filepath1, examFilepath)).toBe(message);
});
