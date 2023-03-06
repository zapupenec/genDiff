import _ from 'lodash';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    const node = { name: key };
    if (!Object.hasOwn(data1, key)) {
      node.status = 'added';
      node.value = data2[key];
    } else if (!Object.hasOwn(data2, key)) {
      node.status = 'deleted';
      node.value = data1[key];
    } else if (data1[key] !== data2[key]) {
      node.status = 'changed';
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        node.children = compare(data1[key], data2[key]);
      } else {
        node.value1 = data1[key];
        node.value2 = data2[key];
      }
    } else {
      node.status = 'unchanged';
      node.value = data1[key];
    }
    return node;
  });

  return result;
};

export default compare;
