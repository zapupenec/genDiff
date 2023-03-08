import _ from 'lodash';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return {
        name: key,
        status: 'added',
        value: data2[key],
      };
    }

    if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        status: 'removed',
        value: data1[key],
      };
    }

    if (data1[key] !== data2[key]) {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return {
          name: key,
          status: 'updated',
          children: compare(data1[key], data2[key]),
        };
      }
      return {
        name: key,
        status: 'updated',
        value1: data1[key],
        value2: data2[key],
      };
    }

    return {
      name: key,
      status: 'unchanged',
      value: data1[key],
    };
  });

  return result;
};

export default compare;
