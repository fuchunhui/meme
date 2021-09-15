import {
  getTable,
  updateTable,
  updateTextTable,
  getDataByColumn,
  TABLE_NAME,
  SPECIAL_TABLE
} from '../db/index.js';

const COMMON_ID = 'meme_common';
const COMMON_TEXT = '常用';
const COMMON_TYPE = 'COMMON';
const SPECIAL_TYPE = 'SPECIAL';

const TabMap = {
  [COMMON_TYPE]: TABLE_NAME,
  [SPECIAL_TABLE]: SPECIAL_TYPE
};

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
  const tabName = TabMap[type];
  const data = getDataByColumn(mid, 'mid', tabName);
  const {title, feature, image, x, y, max, font, color, align} = data;

  return {mid, title, feature, image, x, y, max, font, color, align};
};

const update = (options) => { // TODO 尚未区分title image，目前一个接口，需做拆分
  const {type, ...rest} = options;
  const tabName = TabMap[type];

  return updateTable(rest, tabName);
};

const updateText = (options) => {
  const data = updateTextTable(options);
  console.log('updateText----------->'); // TODO 0916 返回值未处理
  return data;
};

export {
  getCatalog,
  open,
  update,
  updateText
};
