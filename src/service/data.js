import {
  getTable,
  TABLE_NAME,
  SPECIAL_TABLE
} from '../db/index.js';

const COMMON_ID = 'meme_common';
const COMMON_TEXT = '常用';

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
      type: 'COMMON',
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
        type: 'SPECIAL',
        children: value
      });
    });
  }
  return result;
};

export {
  getCatalog
};
