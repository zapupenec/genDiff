import _ from 'lodash';

const getDisplayValue = (value) => {
  if (!_.isObject(value)) {
    return _.isString(value) ? `'${value}'` : value;
  }
  return '[complex value]';
};

const plain = (data) => {
  const iner = (currentValue, nodePath) => currentValue.flatMap((node) => {
    const currentNodePath = [...nodePath, node.name];
    const displayValue = getDisplayValue(node.value);
    const { status } = node;

    if (Object.hasOwn(node, 'children')) {
      return iner(node.children, currentNodePath);
    }

    if (status === 'added') {
      return `Property '${currentNodePath.join('.')}' was ${status} with value: ${displayValue}`;
    }
    if (status === 'removed') {
      return `Property '${currentNodePath.join('.')}' was ${status}`;
    }
    if (status === 'updated') {
      const displayValue1 = getDisplayValue(node.value1);
      const displayValue2 = getDisplayValue(node.value2);
      return `Property '${currentNodePath.join('.')}' was ${status}. From ${displayValue1} to ${displayValue2}`;
    }
    return [];
  });

  return iner(data, []).join('\n');
};

export default plain;
