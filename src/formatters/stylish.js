import _ from 'lodash';

const stylish = (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    const space = replacer.repeat(spacesCount * depth);
    const changedSpace = replacer.repeat(spacesCount * depth - 2);
    const bracketSpace = replacer.repeat(spacesCount * depth - spacesCount);

    if (!_.isArray(currentValue)) {
      if (!_.isObject(currentValue)) {
        return `${currentValue}`;
      }
      const lines = Object
        .entries(currentValue)
        .map(([key, val]) => `${space}${key}: ${iter(val, depth + 1)}`)
        .join('\n');
      return `{\n${lines}\n${bracketSpace}}`;
    }

    const lines = currentValue
      .map((node) => {
        if (node.status === 'added') {
          return `${changedSpace}+ ${node.name}: ${iter(node.value, depth + 1)}`;
        }
        if (node.status === 'deleted') {
          return `${changedSpace}- ${node.name}: ${iter(node.value, depth + 1)}`;
        }
        if (node.status === 'changed') {
          if (node.children === undefined) {
            return [
              `${changedSpace}- ${node.name}: ${iter(node.value1, depth + 1)}`,
              `${changedSpace}+ ${node.name}: ${iter(node.value2, depth + 1)}`,
            ].join('\n');
          }
          return `${space}${node.name}: ${iter(node.children, depth + 1)}`;
        }
        return `${space}${node.name}: ${node.value}`;
      }).join('\n');
    return `{\n${lines}\n${bracketSpace}}`;
  };

  return iter(value, 1);
};

export default stylish;
