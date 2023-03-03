import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import { genMessageIncorrectExtension } from '../src/incorrectInput.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = 'file1.json';
const jsonFile2 = 'file2.json';

const ymlFile1 = 'file1.yml';
const ymlFile2 = 'file2.yml';

const yamlFile1 = 'file1.yaml';
const yamlFile2 = 'file2.yaml';

const examFile = 'examFile.txt';
const examFilename = path.basename(examFile);
const examFilepath = getFixturePath(examFile);
const examData = readFile(examFile);

test('flat compare', () => {
  let filepath1 = getFixturePath(jsonFile1);
  let filepath2 = getFixturePath(jsonFile2);
  let compare = genDiff(filepath1, filepath2);
  expect(compare).toBe(examData);

  filepath1 = getFixturePath(ymlFile1);
  filepath2 = getFixturePath(ymlFile2);
  compare = genDiff(filepath1, filepath2);
  expect(compare).toBe(examData);

  filepath1 = getFixturePath(yamlFile1);
  filepath2 = getFixturePath(yamlFile2);
  compare = genDiff(filepath1, filepath2);
  expect(compare).toBe(examData);

  filepath1 = getFixturePath(jsonFile1);
  filepath2 = getFixturePath(ymlFile2);
  compare = genDiff(filepath1, filepath2);
  expect(compare).toBe(examData);

  filepath1 = getFixturePath(jsonFile1);
  filepath2 = getFixturePath(yamlFile2);
  compare = genDiff(filepath1, filepath2);
  expect(compare).toBe(examData);

  filepath1 = getFixturePath(ymlFile1);
  filepath2 = getFixturePath(yamlFile2);
  compare = genDiff(filepath1, filepath2);
  expect(compare).toBe(examData);
});

test('File with incorrect extension', () => {
  const filepath1 = getFixturePath(jsonFile1);
  let message = genMessageIncorrectExtension(jsonFile1, examFilename);
  expect(genDiff(filepath1, examFilepath)).toBe(message);

  message = genMessageIncorrectExtension(examFilename, examFilename);
  expect(genDiff(examFilepath, examFilepath)).toBe(message);
});
