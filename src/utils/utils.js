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
const filterKeys = (array, keys = ['name', 'image']) => {
  return array.map(item => {
    const result = {};
    keys.forEach(key => {
      result[key] = item[key];
    });
    return result;
  });
};

/**
 * 将数组转换为对象，统计每个元素的出现次数
 * @param {Array} arr - 输入数组
 * @returns {Object} - 返回对象，key为数组元素，value为出现次数
 */
const arrayToCountObject = arr => {
  if (!Array.isArray(arr)) {
    return {};
  }
  
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
};

/**
 * 格式化日期为 YYYY-MM-DD
 * @param {*} date 日期对象，默认为当前日期
 * @returns {string} 格式化后的日期字符串
 */
const getDatePath = (date = new Date()) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

export {
  splitArray,
  group,
  sortBykey,
  filterKeys,
  getDatePath,
  arrayToCountObject
};
