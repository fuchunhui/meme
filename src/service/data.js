import crypto from 'crypto';
import {getMid} from '../utils/keys.js';
import {writeImg} from '../convert/write.js';

import {
  STORY_TABLE,
  TEXT_TABLE,
  GIF_TABLE,
  STORY_TYPE,
  IMAGE_TYPE,
  insertStoryTable,
  insertTextTable,
  insertGifTable,
  insertImageTable,
  insertAdditionalTable,
  updateTextTable,
  updateImageTable,
  updateAdditionalTable,


  getTable,
  updateTable,
  getDataByColumn,
  getDataListByColumn,
  getColumnByTable,
  getSingleTable,
  updateFeatureTable,
  getNamedColumnFromTable,
  updateGifTable
} from '../db/index.js';
import {emptySucess, sucess, error} from './ajax.js';
import {testFile, getFileName, getRandomPath} from '../convert/write.js';
import {convert} from '../convert/base64.js';
import {group, sortBykey, filterKeys} from '../utils/utils.js';
import {
  CREATE_STORY_FAIL,
  CREATE_TEXT_FAIL,
  CREATE_GIF_FAIL,
  CREATE_IMAGE_FAIL,
  CREATE_ADDITIONAL_FAIL,

  UPDATE_TEXT_FAIL,
  UPDATE_IMAGE_FAIL,
  UPDATE_ADDITIONAL_FAIL,
  UPDATE_NAME_FAIL,

  UPDATE_STORY_FAIL,
  CREATE_REPEAT_TITLE,
  GET_FEATURE_FAIL,
} from '../config/constant.js';

const COMMAND_ID = {
  [STORY_TABLE]: 'meme_common',
  // [FEATURE_TABLE]: 'meme_feature',
  [GIF_TABLE]: 'meme_gif'
};

const COMMAND_TEXT = {
  [STORY_TABLE]: '常用',
  // [FEATURE_TABLE]: '高级',
  [GIF_TABLE]: '动图'
};

const COMMAND_TYPE = {
  [STORY_TABLE]: STORY_TABLE,
  // [SPECIAL_TABLE]: SPECIAL_TABLE,
  // [SERIES_TABLE]: SERIES_TABLE,
  // [FEATURE_TABLE]: FEATURE_TABLE,
  [GIF_TABLE]: GIF_TABLE
};

const normalMenu = ctx => {
  const list = getTable(STORY_TABLE, false, ctx);
  return list.filter(item => item.senior === 0 || item.senior === 2).map(item => item.title);
};

const seniorMenu = ctx => {
  const list = getSingleTable(FEATURE_TABLE, ctx);
  return list.filter(item => item.type !== FEATURE_TYPE.COMMAND).map(item => item.feature);
};

const seriesMenu = ctx => {
  const list = getTable(SERIES_TABLE, false, ctx);
  const map = new Map();
  if (list.length) {
    list.forEach(({title, feature}) => {
      let value = [title];
      if (map.has(feature)) {
        value = [...map.get(feature), ...value];
      }
      map.set(feature, value);
    });
  }
  return map;
};

const imageMenu = ctx => {
  const list = getTable(STORY_TABLE, false, ctx);
  const [normal, senior] = group(list, story => story.senior === 0 || story.senior === 2);

  const series = getTable(SERIES_TABLE, false, ctx);
  series.forEach(item => item.title = `${item.feature} ${item.title}`);
  sortBykey(series, 'title');

  return {
    normal: filterKeys(normal),
    senior: filterKeys(senior),
    series: filterKeys(series)
  };
};

const gifMenu = ctx => {
  const list = getTable(GIF_TABLE, false, ctx);
  return list.map(item => item.title);
};

const _getStory = (target = [], ctx) => {
  const list = getTable(STORY_TABLE, false, ctx);
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

const _getGif = (target = [], ctx) => {
  const list = getSingleTable(GIF_TABLE, ctx);
  if (list.length) {
    const children = list.map(({mid, title}) => {
      return {
        mid,
        title
      };
    });
    target.push({
      id: COMMAND_ID[GIF_TABLE],
      text: COMMAND_TEXT[GIF_TABLE],
      type: COMMAND_TYPE[GIF_TABLE],
      children
    });
  }
};

const _getFeature = (target = [], ctx) => {
  const singleList = getSingleTable(FEATURE_TABLE, ctx);
  if (singleList.length) {
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
  }
};

const _getSeries = (tabName = SERIES_TABLE, target = [], ctx) => {
  const list = getTable(tabName, false, ctx);
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

const getCatalog = ctx => {
  const result = [];

  _getGif(result, ctx);
  _getStory(result, ctx);
  _getFeature(result, ctx);
  _getSeries(SERIES_TABLE, result, ctx);
  _getSeries(SPECIAL_TABLE, result, ctx);

  return result;
};

const open = (mid, type, ctx) => {
  const tabName = COMMAND_TYPE[type];
  const data = getDataByColumn(mid, 'mid', tabName, ctx);
  const {title, feature, image, senior, x, y, max, font, color, align, direction, blur, degree, stroke, swidth} = data;

  return {mid, title, feature, image, senior, x, y, max, font, color, align, direction, blur, degree, stroke, swidth};
};

// 此接口已可以正常工作，新建接口完毕 ✅
const create = (options, ctx) => {
  const result = checkRepeat(options.name, ctx);
  if (result) {
    return result;
  }

  const {name, type, image} = options;
  const mid = getMid();
  const md5 = crypto.createHash('md5').update(name).digest('hex');

  const data = insertStoryTable({
    mid,
    name,
    md5,
    type
  }, ctx);
  if (data.error) {
    return error(data.data, CREATE_STORY_FAIL);
  }

  writeImg(md5, image);

  const textData = { // 初始化 text 表
    mid,
    x: 0,
    y: 0,
    max: 100,
    size: 32,
    font: 'sans-serif',
    color: '#000000',
    stroke: 'transparent',
    swidth: 1,
    align: 'start',
    direction: 'down',
    blur: 0,
    degree: 0,
    senior: 1
  };
  const textResult = insertTextTable(textData, ctx);
  if (textResult) {
    return error(textResult, CREATE_TEXT_FAIL);
  }

  if (type === STORY_TYPE.GIF) { // 初始化 GIF 表
    const gifResult = insertGifTable({
      mid,
      frame: 'NORMAL'
    }, ctx);
    if (gifResult) {
      return error(gifResult, CREATE_GIF_FAIL);
    }
  } else if (type === STORY_TYPE.IMAGE) { // 初始化 IMAGE 表
    const imageData = {
      mid,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      ipath: IMAGE_TYPE.SVG // 默认使用 SVG
    };
    const imageResult = insertImageTable(imageData, ctx);
    if (imageResult) {
      return error(imageResult, CREATE_IMAGE_FAIL);
    }
  } else if (type === STORY_TYPE.ADDITIONAL) { // 初始化 ADDITIONAL 表
    const additionalData = {
      mid,
      text: ''
    };
    const data = insertAdditionalTable(additionalData, ctx);
    if (data) {
      return error(data, CREATE_ADDITIONAL_FAIL);
    }
  }

  return sucess({
    mid: data.data
  });
};

// 此接口已可以正常工作，更新接口处理完毕 ✅
const update = (params, ctx) => {
  const {mid, options, more, type} = params;

  const data = updateTextTable({mid, ...options}, ctx);
  if (data) {
    return error(data, UPDATE_TEXT_FAIL);
  }
  if (type === STORY_TYPE.IMAGE) {
    const imageData = updateImageTable({mid, ...more}, ctx);
    if (imageData) {
      return error(imageData, UPDATE_IMAGE_FAIL);
    }
  } else if (type === STORY_TYPE.ADDITIONAL) {
    const additionalData = updateAdditionalTable({mid, ...more}, ctx);
    if (additionalData) {
      return error(additionalData, UPDATE_ADDITIONAL_FAIL);
    }
  }
  return emptySucess();
};


const updateTitle = (options, ctx) => {
  const data = updateTextTable(options, ctx);
  if (data) {
    return error(data, UPDATE_NAME_FAIL);
  }
  return emptySucess();
};

// 待删除，代码供参考
const openFeature = (mid, ctx) => {
  const featureList = getDataListByColumn(mid, 'mid', FEATURE_TABLE, ctx);
  if (!featureList.length) {
    return error({
      mid
    }, GET_FEATURE_FAIL);
  }
  const {feature, type, sid, sname, tid, x, y, width, height, ipath} = featureList[0];
  const story = open(sid, sname, ctx);
  let cell = {
    mid,
    feature,
    type,
    story
  };

  if ([FEATURE_TYPE.TEXT, FEATURE_TYPE.REPEAT].includes(type)) {
    const textStyles = getDataListByColumn(tid, 'mid', TEXT_TABLE, ctx);
    cell.et = textStyles.length ? textStyles[0] : null;
  } else if (type === FEATURE_TYPE.IMAGE) {
    cell.ei = {x, y, width, height, ipath};
  }

  return sucess(cell);
};

const getImagePaths = () => {
  return Object.values(FEATURE_IMAGE_TYPE);
};

// 待优化，初步判断可删除
const getBase64 = (type, title, ctx) => {
  let imageBase64 = '';
  if (type === FEATURE_IMAGE_TYPE.DB) {
    const materialData = getDataListByColumn(title, 'title', MATERIAL_TABLE, ctx);
    imageBase64 = materialData.image || '';
  } else if (type === FEATURE_IMAGE_TYPE.RANDOM) {
    const filePath = getRandomPath();
    imageBase64 = convert(filePath);
  } else {
    const filePath = testFile(type.toLowerCase(), title);
    if (filePath) {
      imageBase64 = convert(filePath);
    }
  }

  return imageBase64;
};

// const openAdditional = (mid, ctx) => {
//   const additionalList = getDataListByColumn(mid, 'mid', ADDITIONAL_TABLE, ctx);
//   const {text} = additionalList[0];
//   let cell = {
//     mid,
//     text
//   };

//   return sucess(cell);
// };

// const openGif = (mid, ctx) => {
//   const gifList = getDataListByColumn(mid, 'mid', GIF_TABLE, ctx);
//   const {title, image, x, y, max, font, color, stroke, swidth, align, direction, frame} = gifList[0];
//   const cell = {
//     mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame
//   };
//   return sucess(cell);
// };

// 已优化 ✅
const checkRepeat = (name, ctx) => {
  const story = getDataByColumn(name, 'name', STORY_TABLE, ctx);

  if (story.mid) {
    return error({ name }, CREATE_REPEAT_TITLE);
  }
  return false;
};

// 命令使用，获取最近的更新，已处理 ✅
const getLatestMid = (time, ctx) => {
  const result = [];

  const storyList = getTable(STORY_TABLE, false, ctx);
  storyList.forEach(({mid, name}) => {
    if (mid.replace('meme_', '') >= time) {
      result.push(name);
    }
  });

  return Array.from(new Set(result));
};

export {
  normalMenu,
  seniorMenu,
  seriesMenu,
  imageMenu,
  getCatalog,
  open,
  create,
  update,
  updateTitle,
  openFeature,
  getImagePaths,
  getBase64,
  // openAdditional,
  // openGif,
  gifMenu,
  getLatestMid
};
