import crypto from 'crypto';
import {getMid} from '../utils/keys.js';
import {writeImg} from '../convert/write.js';

import {
  STORY_TABLE,
  TEXT_TABLE,
  IMAGE_TABLE,
  ADDITIONAL_TABLE,
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
  updateName,
  getTable,
  getDataByColumn,
  getDataListByColumn
} from '../db/index.js';
import {emptySucess, sucess, error} from './ajax.js';
import {getBase64Img} from '../convert/write.js';
import {convert} from '../convert/base64.js';
import {group} from '../utils/utils.js';
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
  CREATE_REPEAT_NAME
} from '../config/constant.js';

const normalMenu = ctx => {
  const list = getTable(STORY_TABLE, ctx).map(({mid, name, md5, type}) => ({mid, name, md5, type}));
  const textList = getNamedColumnFromTable(TEXT_TABLE, ['mid'], ctx);
  const countMap = arrayToCountObject(textList);
  const [normal, senior] = group(list, item => countMap[item.mid] === 1);
  return {
    normal,
    senior
  };
};

const gifMenu = ctx => {
  const list = getDataByColumn(STORY_TYPE.GIF, 'type', STORY_TABLE, ctx);
  return list.map(item => item.name);
};

// 此接口已可以正常工作，新建接口完毕 ✅
const getCatalog = ctx => {
  let result = [];

  const list = getTable(STORY_TABLE, ctx);
  if (list.length) {
    result = list.map(({mid, name, type}) => ({mid, name, type}));
  }

  return result;
};

// 此接口已可以正常工作，新建接口完毕 ✅
const open = (mid, ctx) => {
  const {name, md5, type} = getDataByColumn(mid, 'mid', STORY_TABLE, ctx);
  const image = getBase64Img(type, md5);
  const children = getDataListByColumn(mid, 'mid', TEXT_TABLE, ctx);

  let more = '';
  if (type === STORY_TYPE.IMAGE) {
    const imageData = getDataByColumn(mid, 'mid', IMAGE_TABLE, ctx);
    const {x, y, width, height, ipath} = imageData;
    more = {x, y, width, height, ipath};
  } else if (type === STORY_TYPE.ADDITIONAL) {
    const additionalData = getDataByColumn(mid, 'mid', ADDITIONAL_TABLE, ctx);
    const {text} = additionalData;
    more = {text};
  }

  return {
    mid,
    name,
    type,
    image,
    children,
    more
  };
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

// 此接口已可以正常工作，更新接口处理完毕 ✅
const updateStoryName = (options, ctx) => {
  const data = updateName(options, ctx);
  if (data) {
    return error(data, UPDATE_NAME_FAIL);
  }
  return emptySucess();
};

// 待优化，为【上号】类的需求，提供物理文件的信息
const getBase64 = (type, name, ctx) => {
  let imageBase64 = '';
  // const filePath = getRandomPath();
  // imageBase64 = convert(filePath);

  // const filePath = testFile(type.toLowerCase(), name);
  // if (filePath) {
  //   imageBase64 = convert(filePath);
  // }

  return imageBase64;
};

// 已优化 ✅
const checkRepeat = (name, ctx) => {
  const story = getDataByColumn(name, 'name', STORY_TABLE, ctx);

  if (story.mid) {
    return error({ name }, CREATE_REPEAT_NAME);
  }
  return false;
};

// 命令使用，获取最近的更新，已处理 ✅
const getLatestMid = (time, ctx) => {
  const result = [];

  const storyList = getTable(STORY_TABLE, ctx);
  storyList.forEach(({mid, name}) => {
    if (mid.replace('meme_', '') >= time) {
      result.push(name);
    }
  });

  return Array.from(new Set(result));
};

export {
  normalMenu,
  gifMenu,
  getCatalog,
  open,
  create,
  update,
  updateStoryName,
  getBase64,
  getLatestMid
};
