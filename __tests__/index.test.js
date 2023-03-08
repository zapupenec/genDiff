import url from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename).trimEnd();
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trimEnd();

const result = {
  stylish: 'result_stylish.txt',
  plain: 'result_plain.txt',
  json: 'result_json.txt',
};

const pairsForCompare = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.yml', 'file2.json'],
];

test('output default(stylish)', () => {
  const examData = readFile(result.stylish);
  pairsForCompare.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const compare = genDiff(filepath1, filepath2, 'stylish');
    expect(compare).toEqual(examData);
  });
});

test('output plain', () => {
  const examData = readFile(result.plain);
  pairsForCompare.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const compare = genDiff(filepath1, filepath2, 'plain');
    expect(compare).toEqual(examData);
  });
});

test('output json', () => {
  const examData = readFile(result.json);
  pairsForCompare.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const compare = genDiff(filepath1, filepath2, 'json');
    expect(compare).toEqual(examData);
  });
});

test('File with incorrect extension', () => {
  const inputsFiles = [
    ['file1.json', 'result_plain.txt', 'or'],
    ['result_plain.txt', 'result_json.txt', 'and'],
  ];
  inputsFiles.forEach(([file1, file2, preposition]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const message = `The file '${file1}' ${preposition} '${file2}' with incorrect extension. Use .json or .yml(.yaml) file.`;
    expect(genDiff(filepath1, filepath2)).toBe(message);
  });
});
