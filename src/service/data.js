import {
  getTable,
  insertTable,
  updateTable,
  updateTextTable,
  getDataByColumn,
  getDataListByColumn,
  getSingleTable,
  updateFeatureTable,
  STORY_TABLE,
  SPECIAL_TABLE,
  SERIES_TABLE,
  FEATURE_TABLE,
  FEATURE_TYPE,
  TEXT_TABLE,
  FEATURE_IMAGE_TYPE
} from '../db/index.js';
import {emptySucess, sucess, error} from './ajax.js';
import { testFile } from '../convert/write.js';
import { convert } from '../convert/base64.js';
import {
  UPDATE_TEXT_FAIL,
  CREATE_REPEAT_TITLE
} from '../config/constant.js';

const COMMAND_ID = {
  [STORY_TABLE]: 'meme_common',
  [FEATURE_TABLE]: 'meme_feature'
};

const COMMAND_TEXT = {
  [STORY_TABLE]: '常用',
  [FEATURE_TABLE]: '高级'
};

const COMMAND_TYPE = {
  [STORY_TABLE]: STORY_TABLE,
  [SPECIAL_TABLE]: SPECIAL_TABLE,
  [SERIES_TABLE]: SERIES_TABLE,
  [FEATURE_TABLE]: FEATURE_TABLE
};

const _getStory = (target = []) => {
  const list = getTable(STORY_TABLE, false);
  if (list.length) {
    const children = list.map(({mid, title}) => {
      return {
        mid,
        title
      };
    });
    target.push({
      id: COMMAND_ID[STORY_TABLE],
      text: COMMAND_TEXT[STORY_TABLE],
      type: COMMAND_TYPE[STORY_TABLE],
      children
    });
  }
};

const _getFeature = (target = []) => {
  const singleList = getSingleTable(FEATURE_TABLE);
  const children = [];
  singleList.length && singleList.forEach(({mid, feature, type}) => {
    if (type === FEATURE_TYPE.COMMAND) {
      return;
    }
    let cell = {
      mid,
      title: feature,
      type
    };
    children.push(cell);
  });

  target.push({
    id: COMMAND_ID[FEATURE_TABLE],
    text: COMMAND_TEXT[FEATURE_TABLE],
    type: COMMAND_TYPE[FEATURE_TABLE],
    children
  });
};

const _getSeries = (tabName = SERIES_TABLE, target = []) => {
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
        type: COMMAND_TYPE[tabName],
        children: value
      });
    });
  }
};

const getCatalog = () => {
  const result = [];

  _getStory(result);
  _getSeries(SERIES_TABLE, result);
  _getFeature(result);
  _getSeries(SPECIAL_TABLE, result);

  return result;
};

const open = (mid, type) => {
  const tabName = COMMAND_TYPE[type];
  const data = getDataByColumn(mid, 'mid', tabName);
  const {title, feature, image, x, y, max, font, color, align, direction} = data;

  return {mid, title, feature, image, x, y, max, font, color, align, direction};
};

const create = (options) => {
  const result = getDataByColumn(options.title, 'title', STORY_TABLE); // TODO 新建的去重判断，目前只处理了story表，还需要检测feature表内容
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

const openFeature = mid => {
  const featureList = getDataListByColumn(mid, 'mid', FEATURE_TABLE);
  const {feature, type, sid, sname, tid, x, y, width, height, ipath} = featureList[0];
  const story = open(sid, sname);
  let cell = {
    mid,
    feature,
    type,
    story
  };

  if (type === FEATURE_TYPE.TEXT) {
    const textStyles = getDataListByColumn(tid, 'mid', TEXT_TABLE);
    cell.et = textStyles.length ? textStyles[0] : null;
  } else if (type === FEATURE_TYPE.IMAGE) {
    cell.ei = {x, y, width, height, ipath};
  }

  return sucess(cell);
};

const updateFeature = (options) => {
  const data = updateFeatureTable(options);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  return emptySucess();
}

const getImagePaths = () => {
  return Object.values(FEATURE_IMAGE_TYPE);
};

const getBase64 = (type, title) => {
  let imageBase64 = '';
  if (type === FEATURE_IMAGE_TYPE.DB) {
    const materialData = getDataListByColumn(title, 'title', MATERIAL_TABLE);
    imageBase64 = materialData.image || '';
  } else {
    const filePath = testFile(type.toLowerCase(), title);
    if (filePath) {
      imageBase64 = convert(filePath);
    }
  }

  return imageBase64;
};

export {
  getCatalog,
  open,
  create,
  update,
  updateText,
  openFeature,
  updateFeature,
  getImagePaths,
  getBase64
};
