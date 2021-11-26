import {
  getTable,
  insertTable,
  updateTable,
  updateTextTable,
  getDataByColumn,
  STORY_TABLE,
  SPECIAL_TABLE,
  SERIES_TABLE
} from '../db/index.js';
import {emptySucess, sucess, error} from './ajax.js';
import {
  UPDATE_TEXT_FAIL,
  CREATE_REPEAT_TITLE
} from '../config/constant.js';

const COMMON_ID = 'meme_common';
const COMMON_TEXT = '常用';
const COMMON_TYPE = 'COMMON';
const SPECIAL_TYPE = 'SPECIAL';
const SERIES_TYPE = 'SERIES';

const TabMap = {
  [COMMON_TYPE]: STORY_TABLE,
  [SPECIAL_TABLE]: SPECIAL_TYPE,
  [SERIES_TABLE]: SERIES_TYPE
};

const _getFeature = (tabName = SERIES_TABLE, target = []) => {
  const list = getTable(tabName, false);
  if (list.length) {
    const map = new Map();
    list.forEach(({mid, title, feature}) => {
      let value = [{
        mid,
        title
      }];
      if (map.has(feature)) {
        value = [...map.get(feature), ...value];
      }
      map.set(feature, value);
    });

    map.forEach((value, key) => {
      target.push({
        id: key,
        text: key,
        type: TabMap[tabName],
        children: value
      });
    });
  }
};

const getCatalog = () => {
  const result = [];
  const list = getTable(STORY_TABLE, false);
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

  _getFeature(SERIES_TABLE, result);
  _getFeature(SPECIAL_TABLE, result);

  return result;
};

const open = (mid, type) => {
  const tabName = TabMap[type];
  const data = getDataByColumn(mid, 'mid', tabName);
  const {title, feature, image, x, y, max, font, color, align, direction} = data;

  return {mid, title, feature, image, x, y, max, font, color, align, direction};
};

const create = (options) => {
  const result = getDataByColumn(options.title, 'title', STORY_TABLE);
  if (result.mid) {
    return error({
      title: options.title
    }, CREATE_REPEAT_TITLE);
  }

  const data = insertTable(options);
  if (data.error) {
    return error(data.data, UPDATE_TEXT_FAIL);
  }

  return sucess({
    mid: data.data
  });
};

const update = (options) => {
  const data = updateTable(options);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  return emptySucess();
};

const updateText = (options) => {
  const data = updateTextTable(options);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  return emptySucess();
};

export {
  getCatalog,
  open,
  create,
  update,
  updateText
};
