import _ from 'lodash';

const stringify = (startDepth, value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const space = replacer.repeat(spacesCount * depth);
    const bracketSpace = replacer.repeat(spacesCount * depth - spacesCount);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${space}${key}: ${iter(val, depth + 1)}`)
      .join('\n');
    return `{\n${lines}\n${bracketSpace}}`;
  };
  return iter(value, startDepth);
};

const stylish = (value) => {
  const replacer = ' ';
  const spacesCount = 4;

  const iter = (currentValue, depth) => {
    const space = replacer.repeat(spacesCount * depth);
    const changedSpace = replacer.repeat(spacesCount * depth - 2);
    const bracketSpace = replacer.repeat(spacesCount * depth - spacesCount);

    const lines = currentValue
      .map((node) => {
        switch (node.status) {
          case 'haveChildren':
            return `${space}${node.name}: ${iter(node.children, depth + 1)}`;
          case 'added':
            return `${changedSpace}+ ${node.name}: ${stringify(depth + 1, node.value, replacer, spacesCount)}`;
          case 'removed':
            return `${changedSpace}- ${node.name}: ${stringify(depth + 1, node.value, replacer, spacesCount)}`;
          case 'updated':
            return [
              `${changedSpace}- ${node.name}: ${stringify(depth + 1, node.value1, replacer, spacesCount)}`,
              `${changedSpace}+ ${node.name}: ${stringify(depth + 1, node.value2, replacer, spacesCount)}`,
            ].join('\n');
          default:
            return `${space}${node.name}: ${stringify(depth + 1, node.value, replacer, spacesCount)}`;
        }
      }).join('\n');
    return `{\n${lines}\n${bracketSpace}}`;
  };

  return iter(value, 1);
};

export default stylish;
