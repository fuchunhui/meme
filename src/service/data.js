import {
  getTable,
  getDataByColumn,
  getSpecialDataListByColumn,
  TABLE_NAME,
  SPECIAL_TABLE
} from '../db/index.js';

const COMMON_ID = 'meme_common';
const COMMON_TEXT = '常用';
const COMMON_TYPE = 'COMMON';
const SPECIAL_TYPE = 'SPECIAL';

const getCatalog = () => {
  const result = [];
  const list = getTable(TABLE_NAME, false);
  if (list.length) {
    const children = list.map(({mid, title}) => {
      return {
        mid,
        title
      };
    });
    result.push({
      id: COMMON_ID,
      text: COMMON_TEXT,
      type: COMMON_TYPE,
      children
    });
  }

  const specialList = getTable(SPECIAL_TABLE, false);
  if (specialList.length) {
    const specialMap = new Map();
    specialList.forEach(({mid, title, feature}) => {
      let value = [{
        mid,
        title
      }];
      if (specialMap.has(feature)) {
        value = [...specialMap.get(feature), ...value];
      }
      specialMap.set(feature, value);
    });

    specialMap.forEach((value, key) => {
      result.push({
        id: key,
        text: key,
        type: SPECIAL_TYPE,
        children: value
      });
    });
  }
  return result;
};

const open = (mid, type) => {
  let data = {};
  if (type === COMMON_TYPE) {
    data = getDataByColumn(mid, 'mid');
  } else if (type === SPECIAL_TYPE) {
    data = getSpecialDataListByColumn(mid, 'mid');
  }

  const {mid, title, feature, image, x, y, max, font, color, align} = data;
  return {mid, title, feature, image, x, y, max, font, color, align};
};

export {
  getCatalog,
  open
};
