import yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (data, parseFormat) => {
  if (!Object.hasOwn(mapping, parseFormat)) {
    throw new Error(`Unknown format: '${parseFormat}'!`);
  }
  return mapping[parseFormat](data);
};

export default parse;
