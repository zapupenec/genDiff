import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) {
    return _.isString(value) ? `'${value}'` : String(value);
  }
  return '[complex value]';
};

const plain = (data) => {
  const iner = (currentValue, nodePath) => currentValue.flatMap((node) => {
    const currentNodePath = [...nodePath, node.name];
    const displayValue = stringify(node.value);
    const displayValue1 = stringify(node.value1);
    const displayValue2 = stringify(node.value2);

    const { status } = node;
    switch (status) {
      case 'hasChildren':
        return iner(node.children, currentNodePath);
      case 'added':
        return `Property '${currentNodePath.join('.')}' was ${status} with value: ${displayValue}`;
      case 'removed':
        return `Property '${currentNodePath.join('.')}' was ${status}`;
      case 'updated':
        return `Property '${currentNodePath.join('.')}' was ${status}. From ${displayValue1} to ${displayValue2}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown key status: '${status}'!`);
    }
  });

  return iner(data, []).join('\n');
};

export default plain;
