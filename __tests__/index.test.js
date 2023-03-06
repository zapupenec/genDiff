import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = 'file1.json';
const jsonFile2 = 'file2.json';
const ymlFile1 = 'file1.yml';
const yamlFile2 = 'file2.yaml';

const examFile = 'examFile.txt';
const examFilepath = getFixturePath(examFile);
const examData = readFile(examFile);

const examFilePlain = 'examFilePlain.txt';
const examFilePlainPath = getFixturePath(examFilePlain);
const examDataPlain = readFile(examFilePlain);

const pairsForCompare = [
  [jsonFile1, jsonFile2],
  [ymlFile1, yamlFile2],
  [ymlFile1, jsonFile2],
];

test('output default(stylish)', () => {
  pairsForCompare.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const compare = genDiff(filepath1, filepath2, 'stylish');
    expect(compare).toEqual(examData);
  });
});

test('output plain', () => {
  pairsForCompare.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const compare = genDiff(filepath1, filepath2, 'plain');
    expect(compare).toEqual(examDataPlain);
  });
});

test('File with incorrect extension', () => {
  const filepath1 = getFixturePath(jsonFile1);
  let message = `The file '${jsonFile1}' or '${examFile}' with incorrect extension. Use .json or .yml(.yaml) file.`;
  expect(genDiff(filepath1, examFilepath)).toBe(message);

  message = `The file '${examFilePlain}' and '${examFile}' with incorrect extension. Use .json or .yml(.yaml) file.`;
  expect(genDiff(examFilePlainPath, examFilepath)).toBe(message);
});
