/**
 * 按照指定长度，对数组内容进行截取，换行
 * @param {*} array 初始数组
 * @param {*} size 长度
 * @returns 二维数组
 */
const splitArray = (array, size) => {
  let start = 0;
  let end = 0;
  const result = [];
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    start = i * size;
    end = start + size;
    result.push(array.slice(start, end));
  }
  return result;
};

/**
 * 根据断言内容，把数组拆分为两份
 * @param {*} array 初始数组
 * @param {*} predicate 断言函数
 */
const group = (array, predicate) => {
  return array.reduce(([left, right], item) => {
    return predicate(item)
      ? [[...left, item], right]
      : [left, [...right, item]];
  }, [[], []]);
};

/**
 * 最原始的数组对象排序
 * @param {*} array 初始数组
 * @param {*} key 排序字段
 */
const sortBykey = (array, key) => {
  array.sort((a, b) => {
    const nameA = a[key].toUpperCase();
    const nameB = b[key].toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

/**
 * 过滤数组
 * @param {*} array 初始数组
 * @param {*} keys 关键字集合
 * @returns 过滤后的结果
 */
const filterKeys = (array, keys = ['title', 'image']) => {
  return array.map(item => {
    const result = {};
    keys.forEach(key => {
      result[key] = item[key];
    });
    return result;
  });
};

export {
  splitArray,
  group,
  sortBykey,
  filterKeys
};
