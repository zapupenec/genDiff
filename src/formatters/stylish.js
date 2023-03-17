import _ from 'lodash';

const stringify = (startDepth, value, space) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const inerSpace = space.repeat(depth);
    const bracketSpace = space.repeat(depth - 1);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${inerSpace}${key}: ${iter(val, depth + 1)}`)
      .join('\n');
    return `{\n${lines}\n${bracketSpace}}`;
  };
  return iter(value, startDepth);
};

const stylish = (value) => {
  const replacer = ' ';
  const spacesCount = 4;
  const space = replacer.repeat(spacesCount);

  const iter = (currentValue, depth) => {
    const currentSpace = replacer.repeat(spacesCount * depth);
    const changedSpace = replacer.repeat(spacesCount * depth - 2);
    const bracketSpace = replacer.repeat(spacesCount * depth - spacesCount);

    const lines = currentValue
      .map((node) => {
        switch (node.status) {
          case 'hasChildren':
            return `${currentSpace}${node.name}: ${iter(node.children, depth + 1)}`;
          case 'added':
            return `${changedSpace}+ ${node.name}: ${stringify(depth + 1, node.value, space)}`;
          case 'removed':
            return `${changedSpace}- ${node.name}: ${stringify(depth + 1, node.value, space)}`;
          case 'updated':
            return [
              `${changedSpace}- ${node.name}: ${stringify(depth + 1, node.value1, space)}`,
              `${changedSpace}+ ${node.name}: ${stringify(depth + 1, node.value2, space)}`,
            ].join('\n');
          case 'unchanged':
            return `${currentSpace}${node.name}: ${stringify(depth + 1, node.value, space)}`;
          default:
            throw new Error(`Unknown key status: '${node.status}'!`);
        }
      }).join('\n');
    return `{\n${lines}\n${bracketSpace}}`;
  };

  return iter(value, 1);
};

export default stylish;
