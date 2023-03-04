import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const absPath = path.resolve(filepath);
  const data = fs.readFileSync(absPath, 'utf8');
  const format = path.extname(absPath);
  if (format === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
