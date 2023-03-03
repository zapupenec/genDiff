import path from 'path';

const isCorrectExtension = (filepath) => {
  const extname = path.extname(filepath);
  if (extname === '.json' || extname === '.yml' || extname === '.yaml') {
    return true;
  }
  return false;
};

const genMessageIncorrectExtension = (filepath1, filepath2) => {
  let preposition = 'or';
  if (!isCorrectExtension(filepath1) && !isCorrectExtension(filepath1)) {
    preposition = 'and';
  }

  const filename1 = path.basename(filepath1);
  const filename2 = path.basename(filepath2);

  const message = `The file '${filename1}' ${preposition} '${filename2}' with incorrect extension. Use .json or .yml(.yaml) file.`;
  return message;
};

export { isCorrectExtension, genMessageIncorrectExtension };
