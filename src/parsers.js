import yaml from 'js-yaml';

const parse = (data, parseFormat) => {
  switch (parseFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format: '${parseFormat}'!`);
  }
};

export default parse;
