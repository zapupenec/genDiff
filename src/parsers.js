import yaml from 'js-yaml';

const parse = (data, extname) => {
  if (extname === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parse;
